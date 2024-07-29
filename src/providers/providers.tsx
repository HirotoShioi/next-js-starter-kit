import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import Auth from "./AuthProvider";

export default function Providers({
  children,
  messages,
}: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}) {
  return (
    <>
      <Auth />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
