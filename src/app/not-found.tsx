import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/providers/providers";
import { getMessages } from "next-intl/server";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import { pageWrapperStyles } from "@/styles/common";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function NotFound({ params }: PageProps) {
  const messages = await getMessages({
    locale: params.locale,
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          notoSansJp.variable,
        )}
      >
        <Providers messages={messages}>
          <div className="flex flex-col w-full">
            <Header />
            <main
              className={cn(
                pageWrapperStyles,
                "flex flex-col items-center gap-8",
              )}
            >
              <h1 className="text-2xl text-center font-bold">
                404 - Page Not Found
              </h1>
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
