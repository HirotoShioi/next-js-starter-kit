"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { I18n } from "aws-amplify/utils";
export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function Page({ params: { locale } }: PageProps) {
  I18n.setLanguage(locale);
  return (
    <div>
      <Authenticator />
    </div>
  );
}
