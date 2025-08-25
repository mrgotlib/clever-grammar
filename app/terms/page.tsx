import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-gray max-w-none">
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
              <p className="text-muted-foreground">
                Grammar Polisher provides an online grammar correction service with multiple tone options. By purchasing
                lifetime access for $97, you receive unlimited daily usage (up to 30 corrections per day) for the
                lifetime of the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Lifetime Access Terms</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>One-time payment of $97 grants lifetime access to the service</li>
                <li>Up to 30 grammar corrections per day</li>
                <li>Access to all 10 professional tones</li>
                <li>Up to 5,000 characters per correction</li>
                <li>No additional monthly or yearly fees</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use our service only for lawful purposes and in accordance with these terms. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Submit content that is illegal, harmful, or violates others' rights</li>
                <li>Attempt to reverse engineer or copy our service</li>
                <li>Use automated tools to exceed daily usage limits</li>
                <li>Share your account credentials with others</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
              <p className="text-muted-foreground">
                We offer a 30-day money-back guarantee. If you're not satisfied with our service within 30 days of
                purchase, contact us for a full refund. After 30 days, all sales are final due to the lifetime nature of
                the access.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
              <p className="text-muted-foreground">
                While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. We reserve the right to
                perform maintenance and updates as needed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Our service is provided "as is" without warranties. We are not liable for any damages arising from your
                use of the service beyond the amount you paid for access.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these terms, contact us at legal@grammarpolisher.com
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
