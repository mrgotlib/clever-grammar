import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">GP</span>
            </div>
            <span className="font-semibold text-lg">Grammar Polisher</span>
          </Link>
          <Link href="/app">
            <Button variant="outline" size="sm">
              Try Demo
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We're here to help. Get in touch with our support team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea placeholder="Tell us more about your question or issue..." className="min-h-[120px]" />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-2">
                    Get help with your account, billing, or technical issues.
                  </p>
                  <a href="mailto:support@grammarpolisher.com" className="text-primary hover:underline">
                    support@grammarpolisher.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">General Inquiries</h3>
                  <p className="text-muted-foreground mb-2">Questions about our service, partnerships, or feedback.</p>
                  <a href="mailto:hello@grammarpolisher.com" className="text-primary hover:underline">
                    hello@grammarpolisher.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                  <p className="text-muted-foreground">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">How do I reset my password?</p>
                  <p className="text-muted-foreground">Use the "Forgot Password" link on the login page.</p>
                </div>
                <div>
                  <p className="font-medium">Can I get a refund?</p>
                  <p className="text-muted-foreground">Yes, we offer a 30-day money-back guarantee.</p>
                </div>
                <div>
                  <p className="font-medium">Is there a mobile app?</p>
                  <p className="text-muted-foreground">Currently, we're web-based but mobile-optimized.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
