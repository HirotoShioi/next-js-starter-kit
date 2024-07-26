import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from '@/lib/i18n';

const i18nMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // localePrefix: 'as-needed',
  defaultLocale: 'ja',
});

const protectedPages = ['profile'];

export const isProtectedPage = (nextUrlPath: string, pages: string[]) => {
  // 自信がないので、この部分は要確認
  const protectedPageRegex = new RegExp(
    `/(${locales.join('|')})\/(${pages.join('|')})`,
  );
  return protectedPageRegex.test(nextUrlPath);
};

// https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/nextjs-app-router-server-components/#add-middleware-for-server-side-redirect
export default async function middleware(request: NextRequest) {
  const response = i18nMiddleware(request);

  if (!isProtectedPage(request.nextUrl.pathname, protectedPages)) {
    return response;
  }
  const user = await getCurrentUser();
  if (user) {
    return response;
  }
  const maybeLang = request.nextUrl.pathname.split('/')[1];
  const lang = locales.includes(maybeLang) ? maybeLang : 'ja';
  return NextResponse.redirect(new URL(`/${lang}`, request.url));
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
