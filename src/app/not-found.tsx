"use client";
import jaMessage from "../../locales/ja.json";
import enMessage from "../../locales/en.json";
import Providers from "@/providers/providers";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import { cn } from "@/lib/utils";
import { pageWrapperStyles } from "@/styles/common";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n";
export default function NotFound() {
  const lang =
    (window.navigator.languages || [])[0] || window.navigator.language;
  const message = lang.startsWith("ja") ? jaMessage : enMessage;
  return (
    <html lang="en">
      <body>
        <Providers messages={message} locale={lang}>
          <Header />
          <div className={cn(pageWrapperStyles, "max-w-3xl space-y-8")}>
            <div className="flex flex-col items-center justify-center h-full gap-5">
            <h1 className="text-2xl">Page Not Found</h1>
            <Button asChild>
              <Link href="/">
                Go home
              </Link>
            </Button>
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
