export * from './theme';

export const APP_NAME = 'MailPocket';
export const APP_VERSION = '1.0.0';

export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.mailpocket.com';

export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  THEME_PREFERENCE: 'theme_preference',
  LANGUAGE_PREFERENCE: 'language_preference',
} as const;
