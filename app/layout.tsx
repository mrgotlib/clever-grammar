import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import SalesChatbot from "@/components/sales-chatbot"

export const metadata: Metadata = {
  title: "Clever Grammar - Fix Your English Grammar in Seconds",
  description:
    "AI powered grammar correction tool with 12 professional tones including Plagiarism Checker. Lifetime access for $197. Perfect for content creators, students, and professionals.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <SalesChatbot />
      </body>
    </html>
  )
}
