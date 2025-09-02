"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (text: string, isBot = false) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isBot,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
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
        case "money-freelance":
          addMessage(
            "Excellent! As a freelance writer/editor, you can charge $25-50/hour for grammar correction services. With Clever Grammar, you can work 10x faster! Potential: $2,000-5,000/month. Want more money-making ideas?",
            true,
          )
          setCurrentStep("more-money")
          break
        case "money-courses":
          addMessage(
            "Smart thinking! Create online courses teaching 'Perfect English Writing' using Clever Grammar. Price: $97-297 per course. Sell to 100 students = $9,700-29,700! The tool pays for itself with just 1-2 sales. More ideas?",
            true,
          )
          setCurrentStep("more-money")
          break
        case "money-business":
          addMessage(
            "Great idea! Offer grammar correction services to businesses. Many companies need help with emails, proposals, and content. Charge $500-2000/month per client. Just 1 client covers your investment 3-10x over! Want to get started?",
            true,
          )
          setCurrentStep("get-started")
          break
        case "more-ideas":
          addMessage(
            "Here are 3 more ways: 1) Content creation for social media ($30-100/post), 2) Academic editing for students ($20-40/page), 3) Email marketing copywriting ($100-500/email). The possibilities are endless! Ready to start?",
            true,
          )
          setCurrentStep("get-started")
          break
        case "get-started":
          addMessage(
            "Awesome! Here's your action plan: 1) Try the demo to see the quality, 2) Get lifetime access for $197, 3) Start with one money-making method, 4) Scale up as you earn! The tool pays for itself quickly. Ready to transform your income?",
            true,
          )
          setCurrentStep("final-cta")
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
      case "more-money":
        return [
          { text: "Show me more ideas", action: "more-ideas" },
          { text: "How do I get started?", action: "get-started" },
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </Button>
    </div>
  )
}
