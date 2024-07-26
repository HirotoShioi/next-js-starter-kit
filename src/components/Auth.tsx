"use client";

import { Amplify } from "aws-amplify";
import { authConfig } from "@/lib/auth/config";

// https://github.com/ErikCH/GithubLoginAWSAmplifyGen2/blob/main/src/app/Auth.tsx
Amplify.configure(authConfig, { ssr: true });

export default function Auth() {
  return null;
}
