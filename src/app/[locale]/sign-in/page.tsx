"use client";
import {
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { translations } from "@aws-amplify/ui-react";
import { I18n } from "aws-amplify/utils";
export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function Page({ params: { locale } }: PageProps) {
  const { tokens } = useTheme();
  I18n.putVocabularies(translations);
  I18n.setLanguage(locale);
  const theme: Theme = {
    name: "Auth Example Theme",
    tokens: {
      components: {
        authenticator: {
          router: {
            boxShadow: `0 0 16px ${tokens.colors.overlay["10"]}`,
            borderWidth: "0",
          },
          form: {
            padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
          },
        },
        button: {
          primary: {
            backgroundColor: tokens.colors.neutral["100"],
          },
          link: {
            color: tokens.colors.blue["80"],
          },
        },
        fieldcontrol: {
          _focus: {
            boxShadow: `0 0 0 2px ${tokens.colors.blue["60"]}`,
          },
        },
        tabs: {
          item: {
            color: tokens.colors.neutral["80"],
            _active: {
              borderColor: tokens.colors.neutral["100"],
              color: tokens.colors.blue["100"],
            },
          },
        },
      },
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Authenticator />
    </ThemeProvider>
  );
}
