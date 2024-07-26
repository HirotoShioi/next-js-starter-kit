import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { Noto_Sans_JP } from "next/font/google";
import { notFound } from "next/navigation";

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
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  let messages;
  try {
    messages = (await import(`../../../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          notoSansJp.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
