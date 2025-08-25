import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none">
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when you create an account, use our grammar
                correction service, or contact us for support.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Account information (email address, password)</li>
                <li>Text you submit for grammar correction</li>
                <li>Usage data and correction history</li>
                <li>Payment information (processed securely by our payment provider)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and improve our grammar correction service</li>
                <li>Process your payments and manage your account</li>
                <li>Send you important updates about our service</li>
                <li>Respond to your questions and provide customer support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. Your text submissions are processed securely and are not
                shared with third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your correction history for your convenience. You can delete your history at any time from
                your account settings. Account information is retained as long as your account is active.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@grammarpolisher.com
              </p>
            </div>

            <div className="text-sm text-muted-foreground pt-4 border-t">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
