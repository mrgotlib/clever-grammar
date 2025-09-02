"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, DollarSign, TrendingUp, Users, BookOpen, Zap, Target } from "lucide-react"
import Link from "next/link"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  cards?: MoneyStrategy[]
}

interface MoneyStrategy {
  title: string
  description: string
  potential: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeframe: string
  icon: any
}

const moneyStrategies: MoneyStrategy[] = [
  {
    title: "פרילנסינג בתיקון דקדוק",
    description:
      "הצע שירותי תיקון דקדוק ב-Upwork, Fiverr ו-Freelancer. השתמש ב-Clever Grammar כדי לעבוד מהר יותר ולקבל יותר לקוחות.",
    potential: "$500-$3000/חודש",
    difficulty: "Easy",
    timeframe: "1-2 שבועות להתחלה",
    icon: Users,
  },
  {
    title: "קורסים אונליין",
    description:
      "צור קורס 'איך לכתוב באנגלית מקצועית' ב-Udemy או Teachable. השתמש ב-Clever Grammar כדי ליצור תוכן איכותי.",
    potential: "$1000-$10000/חודש",
    difficulty: "Medium",
    timeframe: "1-3 חודשים",
    icon: BookOpen,
  },
  {
    title: "שירותי כתיבה לעסקים",
    description:
      "הצע שירותי כתיבת תוכן לעסקים - מיילים, אתרים, פוסטים ברשתות חברתיות. Clever Grammar יעזור לך לספק איכות גבוהה.",
    potential: "$2000-$8000/חודש",
    difficulty: "Medium",
    timeframe: "2-4 שבועות",
    icon: TrendingUp,
  },
  {
    title: "אפיליאייט מרקטינג",
    description: "קדם את Clever Grammar ברשתות חברתיות ובלוגים. קבל עמלה על כל מכירה שתביא.",
    potential: "$200-$2000/חודש",
    difficulty: "Easy",
    timeframe: "מיידי",
    icon: Target,
  },
  {
    title: "שירותי עריכה אקדמית",
    description: "עזור לסטודנטים ולחוקרים לערוך מאמרים ועבודות. השתמש ב-Clever Grammar לתיקונים מהירים ומדויקים.",
    potential: "$800-$4000/חודש",
    difficulty: "Medium",
    timeframe: "2-3 שבועות",
    icon: BookOpen,
  },
  {
    title: "יצירת תוכן לרשתות חברתיות",
    description: "נהל חשבונות רשתות חברתיות לעסקים. השתמש ב-Clever Grammar ליצירת פוסטים מקצועיים ומושכים.",
    potential: "$1500-$6000/חודש",
    difficulty: "Easy",
    timeframe: "1-2 שבועות",
    icon: Zap,
  },
]

const botResponses: { [key: string]: { text: string; strategies?: MoneyStrategy[] } } = {
  שלום: {
    text: "שלום! אני הבוט של Clever Grammar 🤖 אני כאן כדי לעזור לך לגלות איך לעשות כסף עם כישורי הדקדוק שלך! על מה תרצה לשמוע? פרילנסינג, קורסים, שירותי כתיבה, או משהו אחר?",
  },
  פרילנסינג: {
    text: "פרילנסינג זה דרך מעולה להתחיל! הנה כמה אסטרטגיות:",
    strategies: [moneyStrategies[0], moneyStrategies[3]],
  },
  קורסים: {
    text: "יצירת קורסים אונליין יכולה להביא הכנסה פסיבית מעולה! הנה מה שאני ממליץ:",
    strategies: [moneyStrategies[1]],
  },
  עסקים: {
    text: "עבודה עם עסקים יכולה להיות מאוד רווחית! הנה האפשרויות הטובות ביותר:",
    strategies: [moneyStrategies[2], moneyStrategies[5]],
  },
  סטודנטים: {
    text: "עזרה לסטודנטים זה שוק ענק! הנה איך להתחיל:",
    strategies: [moneyStrategies[4]],
  },
  כסף: {
    text: "בואו נדבר על כסף! הנה כל הדרכים הטובות ביותר לעשות כסף עם Clever Grammar:",
    strategies: moneyStrategies.slice(0, 3),
  },
  התחלה: {
    text: "מעולה שאתה רוצה להתחיל! הנה הדרכים הכי קלות להתחיל עם הכנסה מהירה:",
    strategies: [moneyStrategies[0], moneyStrategies[3], moneyStrategies[5]],
  },
  default: {
    text: "אני יכול לעזור לך עם: פרילנסינג, יצירת קורסים, עבודה עם עסקים, עזרה לסטודנטים, ועוד הרבה דרכים לעשות כסף! על מה תרצה לשמוע?",
  },
}

export default function MoneyBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "שלום! אני הבוט של Clever Grammar 💰 אני כאן כדי לעזור לך לגלות איך לעשות כסף עם כישורי הדקדוק שלך! איך אני יכול לעזור לך היום?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): { text: string; strategies?: MoneyStrategy[] } => {
    const message = userMessage.toLowerCase()

    if (message.includes("שלום") || message.includes("היי") || message.includes("hello")) {
      return botResponses["שלום"]
    } else if (message.includes("פרילנס") || message.includes("freelanc")) {
      return botResponses["פרילנסינג"]
    } else if (message.includes("קורס") || message.includes("course")) {
      return botResponses["קורסים"]
    } else if (message.includes("עסק") || message.includes("business") || message.includes("חברה")) {
      return botResponses["עסקים"]
    } else if (message.includes("סטודנט") || message.includes("student") || message.includes("אקדמי")) {
      return botResponses["סטודנטים"]
    } else if (
      message.includes("כסף") ||
      message.includes("money") ||
      message.includes("הכנסה") ||
      message.includes("רווח")
    ) {
      return botResponses["כסף"]
    } else if (
      message.includes("התחל") ||
      message.includes("start") ||
      message.includes("איך") ||
      message.includes("how")
    ) {
      return botResponses["התחלה"]
    } else {
      return botResponses["default"]
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        cards: botResponse.strategies,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CG</span>
              </div>
              <span className="font-bold text-xl">Clever Grammar</span>
            </Link>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-accent" />
              <span className="font-semibold text-accent">Money Bot</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">💰 בוט עשיית כסף של Clever Grammar</h1>
          <p className="text-xl text-muted-foreground">
            גלה איך לעשות כסף עם כישורי הדקדוק שלך - פרילנסינג, קורסים, שירותי כתיבה ועוד!
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>צ'אט עם בוט עשיית הכסף</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-4">
                <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? "bg-primary" : "bg-accent"}`}
                    >
                      {message.isBot ? (
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <User className="w-4 h-4 text-accent-foreground" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${message.isBot ? "bg-muted" : "bg-primary text-primary-foreground"}`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Strategy Cards */}
                {message.cards && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                    {message.cards.map((strategy, index) => (
                      <Card key={index} className="border-accent/20 hover:border-accent/40 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="flex items-center space-x-2">
                            <strategy.icon className="w-5 h-5 text-accent" />
                            <CardTitle className="text-sm">{strategy.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-xs text-muted-foreground">{strategy.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge className={getDifficultyColor(strategy.difficulty)}>{strategy.difficulty}</Badge>
                            <span className="text-xs font-semibold text-accent">{strategy.potential}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">⏱️ {strategy.timeframe}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="שאל אותי על דרכים לעשות כסף..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
            onClick={() => setInputValue("איך להתחיל עם פרילנסינג?")}
          >
            <Users className="w-6 h-6" />
            <span>פרילנסינג</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
            onClick={() => setInputValue("איך ליצור קורס אונליין?")}
          >
            <BookOpen className="w-6 h-6" />
            <span>קורסים</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
            onClick={() => setInputValue("איך לעבוד עם עסקים?")}
          >
            <TrendingUp className="w-6 h-6" />
            <span>עסקים</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
            onClick={() => setInputValue("תן לי את כל הדרכים לעשות כסף")}
          >
            <DollarSign className="w-6 h-6" />
            <span>כל הדרכים</span>
          </Button>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">מוכן להתחיל לעשות כסף?</h2>
              <p className="text-muted-foreground mb-6">
                השתמש ב-Clever Grammar כדי לשפר את הטקסטים שלך ולהתחיל לעשות כסף עוד היום!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/app">נסה את Clever Grammar</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/">חזור לדף הבית</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
