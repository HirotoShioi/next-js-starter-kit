import createMiddleware from 'next-intl/middleware';
import { locales } from '@/lib/i18n';
// https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/nextjs-app-router-server-components/#add-middleware-for-server-side-redirect
export default createMiddleware({
    // A list of all locales that are supported
    locales: locales,
    // localePrefix: 'as-needed',
    defaultLocale: 'ja',
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ja|en)/:path*']
};
