import { locales } from '@/lib/i18n';
import { NextIntlClientProvider } from 'next-intl';
import {notFound} from 'next/navigation';

export default async function LocaleLayout({children, params: {locale}}: 
    {children: React.ReactNode, params: {locale: string}}
) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  let messages;
  try {
    messages = (await import(`../../../locales/${locale}.json`)).default;
    console.log(messages);
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
        {children}
        </NextIntlClientProvider>
        </body>
    </html>
  );
}