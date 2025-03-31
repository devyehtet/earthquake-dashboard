import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./responsive.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { DeviceProvider } from "@/contexts/device-context"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Myanmar Earthquake Data Center",
  description: "Real-time earthquake monitoring and response coordination for Myanmar",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add preload for Myanmar font */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/khmertype/Pyidaungsu/Pyidaungsu-2.5.3_Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/khmertype/Pyidaungsu/Pyidaungsu-2.5.3_Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <DeviceProvider>
              <LanguageProvider>{children}</LanguageProvider>
            </DeviceProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'