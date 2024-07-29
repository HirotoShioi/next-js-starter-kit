"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import { authConfig } from "@/lib/auth/config";

// https://github.com/ErikCH/GithubLoginAWSAmplifyGen2/blob/main/src/app/Auth.tsx
Amplify.configure(authConfig, { ssr: true });

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticator.Provider>
      {children}
    </Authenticator.Provider>
  );
}
