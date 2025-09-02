"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

interface QuickReply {
  text: string
  action: string
}

interface UserData {
  email?: string
  interests?: string[]
  visitCount: number
  lastVisit: Date
}

export default function SalesChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm here to help you discover how Clever Grammar can boost your writing and income! 👋",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [currentStep, setCurrentStep] = useState("welcome")
  const [userData, setUserData] = useState<UserData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("clevergram_user_data")
      if (saved) {
        const data = JSON.parse(saved)
        return { ...data, visitCount: data.visitCount + 1, lastVisit: new Date() }
      }
    }
    return { visitCount: 1, lastVisit: new Date() }
  })
  const [emailInput, setEmailInput] = useState("")
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("clevergram_user_data", JSON.stringify(userData))
    }
  }, [userData])

  useEffect(() => {
    if (userData.visitCount > 1) {
      setTimeout(() => {
        addMessage(
          `Welcome back! I see this is visit #${userData.visitCount}. Ready to turn your writing skills into income? 🚀`,
          true,
        )
      }, 2000)
    }
  }, [])

  const addMessage = (text: string, isBot = false) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isBot,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleEmailSubmit = () => {
    if (emailInput && emailInput.includes("@")) {
      setUserData((prev) => ({ ...prev, email: emailInput }))
      addMessage(emailInput, false)
      addMessage(
        "Perfect! I've sent you a free guide: '10 Ways to Earn $1000+ Monthly with Grammar Skills'. Check your email! Now, want to see our premium features?",
        true,
      )
      setShowEmailCapture(false)
      setEmailInput("")
      setCurrentStep("upsell")

      console.log("[v0] Lead captured:", emailInput)
    }
  }

  const handleQuickReply = (action: string, text: string) => {
    addMessage(text, false)

    setTimeout(() => {
      switch (action) {
        case "features":
          addMessage(
            "Great choice! Clever Grammar offers 12 professional tones including Complete Rewrite, SEO Optimizer, Hook Generator, and Plagiarism Checker. Each tone transforms your text differently - from casual to academic to persuasive. Want to see how this can make you money?",
            true,
          )
          setCurrentStep("money-making")
          break
        case "pricing":
          addMessage(
            "Clever Grammar costs just $197 for LIFETIME access - no monthly fees ever! Compare that to Grammarly's $144/year. You save money from year 2 onwards. Plus, you can use it to earn money! Want to know how?",
            true,
          )
          setCurrentStep("money-making")
          break
        case "demo":
          addMessage(
            "Perfect! You can try all 12 tones completely free - no signup required! Just click 'Try Demo Mode' on any page. Test the Complete Rewrite, Hook Generator, and Plagiarism Checker. Ready to see the money-making potential?",
            true,
          )
          setCurrentStep("money-making")
          break
        case "free-guide":
          addMessage(
            "Excellent! I'll send you our exclusive guide '10 Ways to Earn $1000+ Monthly with Grammar Skills' - completely free! Just enter your email below:",
            true,
          )
          setShowEmailCapture(true)
          break
        case "money-freelance":
          addMessage(
            "Excellent! As a freelance writer/editor, you can charge $25-50/hour for grammar correction services. With Clever Grammar, you can work 10x faster! Potential: $2,000-5,000/month. Want our free freelancer starter kit?",
            true,
          )
          setCurrentStep("lead-gen")
          break
        case "money-courses":
          addMessage(
            "Smart thinking! Create online courses teaching 'Perfect English Writing' using Clever Grammar. Price: $97-297 per course. Sell to 100 students = $9,700-29,700! Want our course creation template?",
            true,
          )
          setCurrentStep("lead-gen")
          break
        case "money-business":
          addMessage(
            "Great idea! Offer grammar correction services to businesses. Many companies need help with emails, proposals, and content. Charge $500-2000/month per client. Want our business proposal template?",
            true,
          )
          setCurrentStep("lead-gen")
          break
        case "upsell-course":
          addMessage(
            "Perfect! Our 'Grammar to Gold' course teaches you to build a $5K/month grammar business. Normally $297, but for Clever Grammar users only $97! This pays for itself with your first client. Interested?",
            true,
          )
          setCurrentStep("upsell-close")
          break
        case "upsell-support":
          addMessage(
            "Great choice! Premium Support includes: 1-on-1 business coaching, done-for-you templates, client acquisition strategies, and priority support. Only $47/month. Cancel anytime. Want to start?",
            true,
          )
          setCurrentStep("upsell-close")
          break
        case "affiliate-tools":
          addMessage(
            "I recommend these complementary tools: Canva Pro for graphics ($12.99/month), ConvertKit for email marketing ($29/month), and Calendly for scheduling ($8/month). These will boost your grammar business income!",
            true,
          )
          setCurrentStep("final-cta")
          break
        case "more-ideas":
          addMessage(
            "Here are 3 more ways: 1) Content creation for social media ($30-100/post), 2) Academic editing for students ($20-40/page), 3) Email marketing copywriting ($100-500/email). Want our complete money-making blueprint?",
            true,
          )
          setCurrentStep("lead-gen")
          break
        case "get-started":
          addMessage(
            "Awesome! Here's your action plan: 1) Try the demo to see the quality, 2) Get lifetime access for $197, 3) Start with one money-making method, 4) Scale up as you earn! Plus, I can offer you our business course for just $97 extra. Ready?",
            true,
          )
          setCurrentStep("upsell")
          break
        case "buy-course":
          addMessage(
            "Excellent decision! You're getting Clever Grammar ($197) + Grammar to Gold Course ($97) = Total value $294, but today only $247! This is a limited-time offer. Ready to transform your income?",
            true,
          )
          setCurrentStep("final-purchase")
          break
        case "buy-support":
          addMessage(
            "Smart investment! You're getting Clever Grammar ($197) + Premium Support ($47/month). First month free! This combination guarantees your success. Ready to start earning?",
            true,
          )
          setCurrentStep("final-purchase")
          break
        case "buy-now":
          window.location.href = "/app"
          break
        case "try-demo":
          window.location.href = "/app"
          break
      }
    }, 1000)
  }

  const getQuickReplies = (): QuickReply[] => {
    switch (currentStep) {
      case "welcome":
        return [
          { text: "What features does it have?", action: "features" },
          { text: "How much does it cost?", action: "pricing" },
          { text: "Can I try it first?", action: "demo" },
        ]
      case "money-making":
        return [
          { text: "Freelance writing/editing", action: "money-freelance" },
          { text: "Create online courses", action: "money-courses" },
          { text: "Business services", action: "money-business" },
        ]
      case "lead-gen":
        return [
          { text: "Yes, send me the free guide!", action: "free-guide" },
          { text: "Show me more money ideas", action: "more-ideas" },
          { text: "I'm ready to buy now", action: "get-started" },
        ]
      case "upsell":
        return [
          { text: "Add Grammar to Gold Course (+$97)", action: "upsell-course" },
          { text: "Add Premium Support (+$47/month)", action: "upsell-support" },
          { text: "Just Clever Grammar please", action: "buy-now" },
        ]
      case "upsell-close":
        return [
          { text: "Yes, add it to my order!", action: "buy-course" },
          { text: "Maybe later, just the main product", action: "buy-now" },
        ]
      case "final-purchase":
        return [
          { text: "Complete My Order Now!", action: "buy-now" },
          { text: "Let me try demo first", action: "try-demo" },
        ]
      case "get-started":
        return [
          { text: "I'm ready to start!", action: "buy-now" },
          { text: "Let me try the demo first", action: "try-demo" },
        ]
      case "final-cta":
        return [
          { text: "Get Lifetime Access - $197", action: "buy-now" },
          { text: "Try Demo Mode Free", action: "try-demo" },
          { text: "Show me those tools", action: "affiliate-tools" },
        ]
      default:
        return [
          { text: "Tell me about features", action: "features" },
          { text: "How can I make money?", action: "money-freelance" },
        ]
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <Card className="w-80 h-96 mb-4 flex flex-col bg-card border-border shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center font-bold text-sm">
                CG
              </div>
              <div>
                <h3 className="font-semibold text-sm">Clever Grammar Bot</h3>
                <p className="text-xs opacity-90">Money-Making Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20 h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isBot ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Email Capture Form */}
          {showEmailCapture && (
            <div className="p-4 border-t border-border bg-muted/50">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 h-8 text-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleEmailSubmit()}
                />
                <Button size="sm" onClick={handleEmailSubmit} className="h-8 px-3 text-xs">
                  Send
                </Button>
              </div>
            </div>
          )}

          {/* Quick Replies */}
          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              {getQuickReplies().map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start text-xs h-8 bg-transparent"
                  onClick={() => handleQuickReply(reply.action, reply.text)}
                >
                  {reply.text}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center"
      >
        {isOpen ? (
          <span className="text-xl">×</span>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {userData.visitCount > 1 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>
        )}
      </Button>
    </div>
  )
}
