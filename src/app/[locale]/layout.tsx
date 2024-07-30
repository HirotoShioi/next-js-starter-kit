import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Noto_Sans_JP } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import Providers from "@/providers/providers";

export const metadata: Metadata = {
  title: "My App",
  description: "My app description",
};
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function Layout({
  children,
  params: { locale },
}: LayoutProps) {
  if (!locales.includes(locale as any)) notFound();
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          notoSansJp.variable,
        )}
      >
        <Providers messages={messages}>
          <div className="flex flex-col w-full">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
