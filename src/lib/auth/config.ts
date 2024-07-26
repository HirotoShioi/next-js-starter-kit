import { ResourcesConfig } from 'aws-amplify';

export const authConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_WEB_CLIENT_ID!,
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
          scopes: [
            'email',
            'openid',
            'profile',
            'aws.cognito.signin.user.admin',
          ],
          redirectSignIn: [process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_IN!],
          redirectSignOut: [process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_OUT!],
          responseType: 'code',
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: false,
      }
    },
  },
};
