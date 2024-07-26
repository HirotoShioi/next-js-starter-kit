import React from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Decorator, Preview } from "@storybook/react";
import "../src/app/globals.css";
import ja from "../locales/ja.json";
import en from "../locales/en.json";

const withIntl: Decorator = (Story, context) => {
  const locale = context.globals.locale;
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={locale === "ja" ? ja : en}
    >
      <Story {...context} />
    </NextIntlClientProvider>
  );
};

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
  decorators: [withIntl],
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "ja",
    toolbar: {
      icon: "globe",
      items: [
        { value: "ja", title: "日本語" },
        { value: "en", title: "English" },
      ],
      showName: true,
    },
  },
};
export default preview;
