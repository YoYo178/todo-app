import type { TTokenConfig } from '@src/types/jwt.types.js';

export const tokenConfig: TTokenConfig = {
  accessToken: {
    expiry: 3 * 60 * 60 * 1000, // 3 hours
  },
  refreshToken: {
    expiry: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
} as const;