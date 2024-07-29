import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import AuthProvider from "./auth-provider";

export default function Providers({
  children,
  messages,
}: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}) {
  return (
    <>
      <AuthProvider>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </AuthProvider>
    </>
  );
}
