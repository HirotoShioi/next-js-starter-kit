import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import {getRequestConfig, unstable_setRequestLocale} from 'next-intl/server';
import { notFound } from 'next/navigation';
 
export const locales = ['en', 'ja'];
export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../../locales/${locale}.json`)).default
}));

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

/**
 * https://next-intl-docs-git-feat-next-13-rsc-next-intl.vercel.app/docs/getting-started/app-router#static-rendering
 */
export async function renderStatically(locale: string) {
  if (!locales.includes(locale)) notFound();
  // Enable static rendering
  unstable_setRequestLocale(locale);
}