import { locales } from '@/lib/i18n';
import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
 
  // Used when no locale matches
  defaultLocale: 'ja'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ja|en)/:path*']
};