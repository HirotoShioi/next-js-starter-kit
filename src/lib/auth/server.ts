import { createServerRunner } from '@aws-amplify/adapter-nextjs';

import { cookies } from 'next/headers';
import {
  fetchAuthSession as amplifyFetchAuthSession,
  fetchUserAttributes as amplifyFetchUserAttributes,
  getCurrentUser as amplifyGetCurrentUser,
} from 'aws-amplify/auth/server';
import { AuthUser, FetchUserAttributesOutput, JWT } from 'aws-amplify/auth';
import { authConfig } from './config';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: authConfig,
});

export const fetchUserAttributes =
  async (): Promise<FetchUserAttributesOutput | null> => {
    return runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        return amplifyFetchUserAttributes(contextSpec).catch((e) => {
          console.log(e);
          return null;
        });
      },
    });
  };

export const getCurrentUser =
  async (): Promise<AuthUser | null> =>
    runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        return amplifyGetCurrentUser(contextSpec).catch(() => null);
      },
    });

export const fetchIdToken = async (): Promise<JWT | null> =>
  runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const user = await amplifyFetchAuthSession(contextSpec).catch(() => null);
      return user?.tokens?.idToken || null;
    },
  });
