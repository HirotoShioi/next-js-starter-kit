import "./globals.css"
import { Inter as FontSans, Noto_Sans_JP } from "next/font/google"

import { cn } from "@/lib/utils"

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          notoSansJp.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
