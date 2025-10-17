export type OAuthProvider = "kakao" | "naver" | "google" | "apple";

export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  responseType?: string;
  scopes?: string[];
}

export interface OAuthResponse {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  expiresIn?: number;
  tokenType?: string;
  user?: OAuthUser;
}

export interface OAuthUser {
  id: string;
  email?: string;
  name?: string;
  profileImage?: string;
  provider: OAuthProvider;
}

export interface OAuthError {
  code: string;
  message: string;
  provider: OAuthProvider;
}

export interface OAuthResult {
  success: boolean;
  data?: OAuthResponse;
  error?: OAuthError;
}

export interface OAuthProviderConfig {
  kakao?: OAuthConfig;
  naver?: OAuthConfig;
  google?: OAuthConfig;
  apple?: OAuthConfig;
}
