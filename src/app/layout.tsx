import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Auth from "@/components/Auth";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          notoSansJp.variable,
        )}
      >
        <Auth />
        {children}
      </body>
    </html>
  );
}
