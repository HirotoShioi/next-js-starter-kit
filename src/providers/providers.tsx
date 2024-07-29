import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import AuthProvider from "./auth-provider";

export default function Providers({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale?: string;
}) {
  return (
    <>
      <AuthProvider>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </AuthProvider>
    </>
  );
}
