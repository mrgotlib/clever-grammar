"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Target, Clock, Star, Users, Globe, BookOpen, Search } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CG</span>
            </div>
            <span className="font-semibold text-lg">Clever Grammar</span>
          </div>
          <Link href="/auth/login">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            Lifetime Access • One-Time Payment
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Fix Your English Grammar
            <span className="text-primary block">in Seconds</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your writing instantly with AI powered grammar correction. Choose from 11 professional tones
            including Complete Rewrite, SEO optimized content and powerful hook generation, paste your text, and get
            professional results every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/app">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Lifetime Access – $197
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              onClick={() => {
                console.log("[v0] Try Demo Mode button clicked")
                window.location.href = "/app"
              }}
            >
              Try Demo Mode - Free
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground mb-12">
            <p>No monthly fees • Instant access</p>
            <span className="hidden sm:inline">•</span>
            <p>3 free corrections to test all features</p>
          </div>

          {/* Demo Preview */}
          <div className="max-w-3xl mx-auto">
            <Card className="p-6 bg-muted/30">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-left">Before:</h3>
                  <div className="bg-background p-4 rounded-lg text-left text-sm">
                    "Me and my team is working on this project since last month and we was hoping to get some feedback
                    from you."
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-left">After (Formal):</h3>
                  <div className="bg-background p-4 rounded-lg text-left text-sm border-l-4 border-primary">
                    "My team and I have been working on this project since last month, and we would appreciate your
                    feedback."
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Clever Grammar?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Get your text corrected in seconds, not minutes. Perfect for busy professionals and students.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">11 Professional Tones</h3>
              <p className="text-muted-foreground">
                Choose from Formal, Casual, Friendly, Persuasive, Academic, Creative, Professional, Empathetic, SEO
                Optimized, Hook Generator, or Complete Rewrite tones.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lifetime Access</h3>
              <p className="text-muted-foreground">
                Pay once, use forever. No subscriptions, no hidden fees, no monthly charges.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Complete Rewrite Feature Highlight */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800">
                ✨ PREMIUM FEATURE
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Complete Text Rewrite</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Go beyond grammar fixes - completely transform your text with enhanced vocabulary, improved flow, and
                professional structure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Perfect for Professional Writing</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Completely rewrites text with enhanced vocabulary and structure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Improves sentence flow and readability dramatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Adds smooth transitions between sentences and ideas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Perfect for reports, proposals, and professional documents</span>
                  </li>
                </ul>
              </div>

              <Card className="p-6">
                <h4 className="font-semibold mb-3">Example: Complete Rewrite</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Original:</p>
                    <div className="bg-background p-3 rounded text-sm">
                      "Our company makes good products. We sell them to customers. They like our products because they
                      work well."
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Complete Rewrite:</p>
                    <div className="bg-purple-50 p-3 rounded text-sm border-l-4 border-purple-500">
                      "Our organization specializes in developing exceptional products that consistently exceed customer
                      expectations. Through our commitment to quality and innovation, we have built a loyal customer
                      base who values our reliable, high-performance solutions."
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                  <p className="text-xs text-purple-800 font-medium">
                    💎 Transform basic writing into professional, polished content that impresses readers!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Optimizer Feature Highlight */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
                🆕 NEW FEATURE
              </Badge>
              <h2 className="text-3xl font-bold mb-4">SEO Optimized Content Creation</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your writing into search engine friendly content that ranks higher and drives more traffic.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Perfect for Content Creators & Bloggers</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Automatically optimizes text with relevant keywords</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Improves readability for better search rankings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Uses power words that increase engagement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Structures content for featured snippets</span>
                  </li>
                </ul>
              </div>

              <Card className="p-6">
                <h4 className="font-semibold mb-3">Example: SEO Optimized Tone</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Original:</p>
                    <div className="bg-background p-3 rounded text-sm">
                      "This store has expensive items but they're good quality."
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">SEO Optimized:</p>
                    <div className="bg-green-50 p-3 rounded text-sm border-l-4 border-green-500">
                      "This online store offers premium, top-rated items that provide exceptional value for your
                      investment."
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hook Generator Feature Highlight */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <Badge variant="secondary" className="mb-4 bg-orange-100 text-orange-800">
                🔥 GAME CHANGER
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Powerful Hook Generator</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform boring sentences into attention-grabbing hooks that stop readers in their tracks and demand
                engagement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Essential for Content Creators & Marketers</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span>Creates compelling opening lines that grab attention instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span>Adds urgency and emotional triggers to increase engagement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span>Transforms regular words into powerful, persuasive language</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span>Perfect for social media posts, headlines, and email subject lines</span>
                  </li>
                </ul>
              </div>

              <Card className="p-6">
                <h4 className="font-semibold mb-3">Example: Hook Generator</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Original:</p>
                    <div className="bg-background p-3 rounded text-sm">
                      "I learned something interesting about marketing today."
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Hook Generator:</p>
                    <div className="bg-orange-50 p-3 rounded text-sm border-l-4 border-orange-500">
                      "🚨 SHOCKING: I discovered a game-changing marketing secret that will revolutionize your business
                      forever..."
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                  <p className="text-xs text-orange-800 font-medium">
                    💡 This feature alone is worth the entire $197 investment for content creators and marketers!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Value Proposition Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You Get for $197</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to write perfect English, forever. A complete grammar solution with professional
              features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Advanced Grammar Engine</h3>
              <p className="text-sm text-muted-foreground">
                Fixes complex grammar errors, verb tenses, subject-verb agreement, and sentence structure issues.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">11 Professional Tones</h3>
              <p className="text-sm text-muted-foreground">
                Academic papers, business emails, creative writing, empathetic responses, SEO optimized content, and
                powerful hook generation - perfect tone for every situation.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Long Text Support</h3>
              <p className="text-sm text-muted-foreground">
                Process up to 5,000 characters at once. Perfect for articles, reports, and long-form content.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Unlimited Daily Use</h3>
              <p className="text-sm text-muted-foreground">
                30 corrections per day, every day, forever. That's over 10,950 corrections per year included.
              </p>
            </Card>
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">Why Lifetime Access Makes Sense</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-4">What You Save</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• No monthly subscription fees</li>
                    <li>• No price increases over time</li>
                    <li>• No feature limitations</li>
                    <li>• No expiration dates</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-4">What You Get</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Professional-grade grammar correction</li>
                    <li>• 11 different writing tones including SEO & Hook Generator</li>
                    <li>• 10,950+ corrections per year</li>
                    <li>• Complete writing history</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 p-6 bg-background rounded-lg border-2 border-primary">
                <p className="text-2xl font-bold text-primary mb-2">$197 Once = Forever Access</p>
                <p className="text-muted-foreground">
                  That's less than $17 per month if you use it for just one year, and completely free after that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground mb-12">
            One payment, lifetime access. No complicated plans or hidden fees.
          </p>

          <Card className="p-8 border-2 border-primary relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Lifetime Access</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-5xl font-bold">$197</span>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground line-through">$497</div>
                  <div className="text-sm text-green-600">Save $300</div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>30 daily corrections (10,950+ per year)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>
                  11 professional tones (Formal, Academic, Creative, SEO, Hook Generator, Complete Rewrite, etc.)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Up to 5,000 characters per correction</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Complete correction history</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Advanced grammar & style fixes</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>SEO optimized content creation</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Powerful hook generator for viral content</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Complete text rewriting for professional documents</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>No monthly fees ever</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Instant access after payment</span>
              </li>
            </ul>

            <Link href="/app">
              <Button size="lg" className="w-full text-lg py-6">
                Get Lifetime Access Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "This tool saved me hours of proofreading. The tone selection is perfect for my business emails."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">SJ</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Marketing Manager</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "As a non-native speaker, this is a game-changer. My writing sounds professional now."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">MR</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Miguel Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Freelance Writer</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Simple, fast, and effective. Worth every penny for the lifetime access."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">EK</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Emily Kim</p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">How does the lifetime access work?</h3>
              <p className="text-muted-foreground">
                Pay once, use forever. No monthly subscriptions, no hidden fees. You get unlimited access to all
                features for life.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">What makes this worth $197?</h3>
              <p className="text-muted-foreground">
                You get 11 professional tones including Complete Rewrite, Hook Generator, advanced grammar correction,
                30 daily corrections (10,950+ per year), and lifetime access. Most grammar tools charge monthly fees -
                with us, you pay once and own it forever.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">What languages do you support?</h3>
              <p className="text-muted-foreground">
                Currently, we focus exclusively on English grammar correction to provide the highest quality results.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">Is there a word limit?</h3>
              <p className="text-muted-foreground">
                You can process up to 30 texts per day. Each text can be up to 5,000 characters long, perfect for
                emails, articles, and long documents.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">Do you store my text?</h3>
              <p className="text-muted-foreground">
                We only store your correction history for your convenience. Your original text is processed securely and
                not shared with anyone.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">CG</span>
            </div>
            <span className="font-semibold">Clever Grammar</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
