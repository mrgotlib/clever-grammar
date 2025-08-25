"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, History, Sparkles, User, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

type Tone =
  | "formal"
  | "casual"
  | "friendly"
  | "persuasive"
  | "academic"
  | "creative"
  | "professional"
  | "empathetic"
  | "seo-optimized"
  | "hook-generator"
  | "complete-rewrite" // Added complete-rewrite tone type

interface Correction {
  id: string
  original_text: string
  corrected_text: string
  tone: Tone
  created_at: string
}

export default function AppPage() {
  const [originalText, setOriginalText] = useState("")
  const [correctedText, setCorrectedText] = useState("")
  const [selectedTone, setSelectedTone] = useState<Tone>("formal")
  const [isLoading, setIsLoading] = useState(false)
  const [corrections, setCorrections] = useState<Correction[]>([])
  const [dailyUsage, setDailyUsage] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isDemoMode, setIsDemoMode] = useState(true) // Default to demo mode
  const [demoUsage, setDemoUsage] = useState(0)
  const [supabaseAvailable, setSupabaseAvailable] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const checkSupabaseAndGetUser = async () => {
      try {
        if (
          typeof window !== "undefined" &&
          process.env.NEXT_PUBLIC_SUPABASE_URL &&
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ) {
          const supabase = createClient()
          setSupabaseAvailable(true)

          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (user) {
            setUser(user)
            setIsDemoMode(false)
            await loadUserData(user.id)
          } else {
            setIsDemoMode(true)
          }

          const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_OUT") {
              router.push("/auth/login")
            } else if (session?.user) {
              setUser(session.user)
              setIsDemoMode(false)
              await loadUserData(session.user.id)
            }
          })

          return () => subscription.unsubscribe()
        } else {
          setSupabaseAvailable(false)
          setIsDemoMode(true)
        }
      } catch (error) {
        console.log("[v0] Supabase not available, using demo mode")
        setSupabaseAvailable(false)
        setIsDemoMode(true)
      }

      const savedDemoUsage = localStorage.getItem("demoUsage")
      if (savedDemoUsage) {
        setDemoUsage(Number.parseInt(savedDemoUsage))
      }
    }

    checkSupabaseAndGetUser()
  }, [router])

  const loadUserData = async (userId: string) => {
    try {
      const supabase = createClient()

      const today = new Date().toISOString().split("T")[0]
      const { data: usageData } = await supabase
        .from("daily_usage")
        .select("usage_count")
        .eq("user_id", userId)
        .eq("date", today)
        .single()

      setDailyUsage(usageData?.usage_count || 0)

      const { data: correctionsData } = await supabase
        .from("grammar_corrections")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10)

      if (correctionsData) {
        setCorrections(correctionsData)
      }
    } catch (error) {
      console.log("[v0] Error loading user data:", error)
    }
  }

  const handleSignOut = async () => {
    if (isDemoMode || !supabaseAvailable) {
      router.push("/")
      return
    }

    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      router.push("/")
    }
  }

  const handlePolishText = async () => {
    if (!originalText.trim()) {
      toast({
        title: "Please enter some text",
        description: "Add the text you want to polish before clicking the button.",
        variant: "destructive",
      })
      return
    }

    if (originalText.length > 5000) {
      toast({
        title: "Text too long",
        description: "Please limit your text to 5000 characters or less.",
        variant: "destructive",
      })
      return
    }

    if (isDemoMode) {
      if (demoUsage >= 3) {
        toast({
          title: "Demo limit reached",
          description: "You've used all 3 demo corrections. Sign up for unlimited access!",
          variant: "destructive",
        })
        return
      }
    } else {
      if (dailyUsage >= 30) {
        toast({
          title: "Daily limit reached",
          description: "You've reached your daily limit of 30 corrections. Try again tomorrow.",
          variant: "destructive",
        })
        return
      }
    }

    setIsLoading(true)
    try {
      const chunks = []
      if (originalText.length > 1000) {
        const sentences = originalText.split(/(?<=[.!?])\s+/)
        let currentChunk = ""

        for (const sentence of sentences) {
          if ((currentChunk + sentence).length <= 1000) {
            currentChunk += (currentChunk ? " " : "") + sentence
          } else {
            if (currentChunk) chunks.push(currentChunk)
            currentChunk = sentence
          }
        }
        if (currentChunk) chunks.push(currentChunk)
      } else {
        chunks.push(originalText)
      }

      const correctedChunks = []
      for (const chunk of chunks) {
        const response = await fetch("/api/polish-text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: chunk,
            tone: selectedTone,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to polish text")
        }

        const data = await response.json()
        correctedChunks.push(data.correctedText)
      }

      const finalCorrectedText = correctedChunks.join(" ")
      setCorrectedText(finalCorrectedText)

      if (isDemoMode) {
        const newDemoUsage = demoUsage + chunks.length
        setDemoUsage(newDemoUsage)
        localStorage.setItem("demoUsage", newDemoUsage.toString())
      } else {
        const supabase = createClient()
        const newCorrection = {
          user_id: user.id,
          original_text: originalText,
          corrected_text: finalCorrectedText,
          tone: selectedTone,
        }

        const { data, error } = await supabase.from("grammar_corrections").insert([newCorrection]).select().single()

        if (!error && data) {
          setCorrections((prev) => [data, ...prev])
        }

        const today = new Date().toISOString().split("T")[0]
        const { error: usageError } = await supabase.rpc("increment_daily_usage", {
          p_user_id: user.id,
          p_date: today,
          p_increment: chunks.length,
        })

        if (!usageError) {
          setDailyUsage((prev) => prev + chunks.length)
        }
      }

      toast({
        title: "Text polished successfully!",
        description: isDemoMode
          ? "Demo correction complete! Sign up for unlimited access."
          : "Your grammar has been corrected and tone adjusted.",
      })
    } catch (error) {
      toast({
        title: "Error polishing text",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard",
        description: "The corrected text has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      })
    }
  }

  const resetDemoUsage = () => {
    setDemoUsage(0)
    localStorage.removeItem("demoUsage")
    setCorrections([])
    toast({
      title: "Demo reset successfully!",
      description: "You now have 3 fresh demo corrections to try.",
    })
  }

  const getToneDescription = (tone: Tone) => {
    const descriptions = {
      formal: "Professional and business-appropriate",
      casual: "Relaxed and conversational",
      friendly: "Warm and approachable",
      persuasive: "Compelling and convincing",
      academic: "Scholarly and research-focused",
      creative: "Engaging and imaginative",
      professional: "Corporate and executive-level",
      empathetic: "Understanding and supportive",
      "seo-optimized": "Keyword-rich and search engine friendly",
      "hook-generator": "Transforms text into powerful, attention-grabbing hooks",
      "complete-rewrite": "Completely rewrites text for maximum clarity and impact", // Added complete-rewrite description
    }
    return descriptions[tone]
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CG</span>
            </div>
            <span className="font-semibold text-lg">Clever Grammar</span>
            {isDemoMode && (
              <Badge variant="outline" className="ml-2">
                Demo Mode
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
            {isDemoMode ? (
              <>
                <Badge variant="secondary">{3 - demoUsage} demo corrections left</Badge>
                <Button variant="default" size="sm" onClick={() => router.push("/auth/signup")}>
                  Sign Up for Full Access
                </Button>
                <Button variant="outline" size="sm" onClick={() => router.push("/auth/login")}>
                  Login
                </Button>
              </>
            ) : (
              <>
                <Badge variant="secondary">{30 - dailyUsage} corrections left today</Badge>
                <Button variant="outline" size="sm" onClick={() => setShowHistory(!showHistory)}>
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {user?.email?.split("@")[0] || "Profile"}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {isDemoMode && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-amber-800">🚀 You're in Demo Mode</h3>
              <p className="text-sm text-amber-700 mt-1">
                Try Clever Grammar with 3 free corrections. Sign up for unlimited access!
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetDemoUsage}>
                🔄 Reset Demo
              </Button>
              <Button onClick={() => router.push("/auth/signup")} size="sm">
                Get Full Access - $197
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Polish Your Text</h1>
              <p className="text-muted-foreground">
                Paste your text below, choose a tone, and get professional grammar corrections instantly.
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Text</label>
                  <Textarea
                    placeholder="Paste your text here... (max 5000 characters)"
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    className="min-h-32 resize-none"
                    maxLength={5000}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">{originalText.length}/5000 characters</span>
                    {originalText.length > 1000 && (
                      <span className="text-xs text-amber-600">
                        Will be processed in {Math.ceil(originalText.length / 1000)} parts
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tone</label>
                  <Select value={selectedTone} onValueChange={(value: Tone) => setSelectedTone(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">
                        <div>
                          <div className="font-medium">Formal</div>
                          <div className="text-xs text-muted-foreground">Professional and business-appropriate</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="casual">
                        <div>
                          <div className="font-medium">Casual</div>
                          <div className="text-xs text-muted-foreground">Relaxed and conversational</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="friendly">
                        <div>
                          <div className="font-medium">Friendly</div>
                          <div className="text-xs text-muted-foreground">Warm and approachable</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="persuasive">
                        <div>
                          <div className="font-medium">Persuasive</div>
                          <div className="text-xs text-muted-foreground">Compelling and convincing</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="academic">
                        <div>
                          <div className="font-medium">Academic</div>
                          <div className="text-xs text-muted-foreground">Scholarly and research-focused</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="creative">
                        <div>
                          <div className="font-medium">Creative</div>
                          <div className="text-xs text-muted-foreground">Engaging and imaginative</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="professional">
                        <div>
                          <div className="font-medium">Professional</div>
                          <div className="text-xs text-muted-foreground">Corporate and executive-level</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="empathetic">
                        <div>
                          <div className="font-medium">Empathetic</div>
                          <div className="text-xs text-muted-foreground">Understanding and supportive</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="seo-optimized">
                        <div>
                          <div className="font-medium">SEO-Optimized</div>
                          <div className="text-xs text-muted-foreground">Keyword-rich and search engine friendly</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="hook-generator">
                        <div>
                          <div className="font-medium">Hook Generator</div>
                          <div className="text-xs text-muted-foreground">
                            Transforms text into powerful, attention-grabbing hooks
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="complete-rewrite">
                        <div>
                          <div className="font-medium">Complete Rewrite</div>
                          <div className="text-xs text-muted-foreground">
                            Completely rewrites text for maximum clarity and impact
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handlePolishText}
                  disabled={isLoading || !originalText.trim() || (isDemoMode ? demoUsage >= 3 : dailyUsage >= 30)}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Polishing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Polish My Text {isDemoMode && `(${3 - demoUsage} left)`}
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {correctedText && (
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Polished Text</label>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(correctedText)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                    <p className="whitespace-pre-wrap">{correctedText}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Tone: <span className="capitalize font-medium">{selectedTone}</span> •{" "}
                    {getToneDescription(selectedTone)}
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className={`space-y-6 ${showHistory ? "block" : "hidden lg:block"}`}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">{isDemoMode ? "Demo Usage" : "Usage Today"}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Corrections used:</span>
                  <span className="font-medium">{isDemoMode ? `${demoUsage}/3` : `${dailyUsage}/30`}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{
                      width: `${isDemoMode ? (demoUsage / 3) * 100 : (dailyUsage / 30) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {isDemoMode ? "Sign up for 30 daily corrections" : "Resets daily at midnight"}
                </p>
              </div>
              {isDemoMode && (
                <div className="space-y-2 mt-4">
                  <Button className="w-full" size="sm" onClick={() => router.push("/auth/signup")}>
                    Upgrade to Full Access
                  </Button>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Corrections</h3>
              {corrections.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Your correction history will appear here after you polish some text.
                </p>
              ) : (
                <div className="space-y-4">
                  {corrections.slice(0, 5).map((correction) => (
                    <div key={correction.id} className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        {new Date(correction.created_at).toLocaleDateString()} • {correction.tone}
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Original:</div>
                        <div className="text-xs bg-muted/30 p-2 rounded">
                          {correction.original_text.substring(0, 100)}
                          {correction.original_text.length > 100 && "..."}
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Corrected:</div>
                        <div className="text-xs bg-primary/5 p-2 rounded border-l-2 border-primary">
                          {correction.corrected_text.substring(0, 100)}
                          {correction.corrected_text.length > 100 && "..."}
                        </div>
                      </div>
                      {corrections.indexOf(correction) < corrections.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                  {corrections.length > 5 && (
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View All History
                    </Button>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
