import ENV from '@src/common/env.js';
import { tokenConfig } from '@src/config/jwt.config.js';
import type {
  TAccessTokenPayload,
  TDecodedToken,
  TRefreshTokenPayload,
} from '@src/types/jwt.types.js';
import jwt from 'jsonwebtoken';

export function generateAccessToken(data: TAccessTokenPayload): string {
  const accessToken = jwt.sign(
    data,
    ENV.ACCESS_TOKEN_SECRET,
    { expiresIn: (tokenConfig['accessToken']?.expiry ?? 3 * 60 * 60 * 1000) / 1000 }, // Note: JWT takes expiry time in seconds, not milliseconds.
  );

  return accessToken;
}

export function generateRefreshToken(data: TRefreshTokenPayload): string {
  const refreshToken = jwt.sign(
    data,
    ENV.REFRESH_TOKEN_SECRET,
    { expiresIn: (tokenConfig['refreshToken']?.expiry ?? 7 * 24 * 60 * 60 * 1000) / 1000 }, // Note: JWT takes expiry time in seconds, not milliseconds.
  );

  return refreshToken;
}

export function verifyAccessToken(token: string): TDecodedToken<TAccessTokenPayload> {
  try {
    const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as TAccessTokenPayload;
    return { valid: true, expired: false, data: decoded };
  } catch (err) {
    const error = err as jwt.JsonWebTokenError;
    console.error(
      'An error occured while verifying access token!\nError details: ' +
        (error.message ?? 'Unknown error'),
    );

    if (err instanceof jwt.TokenExpiredError)
      return { valid: true, expired: true, data: {} as TAccessTokenPayload };

    return { valid: false, expired: true, data: {} as TAccessTokenPayload };
  }
}

export function verifyRefreshToken(token: string): TDecodedToken<TRefreshTokenPayload> {
  try {
    const decoded = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET) as TRefreshTokenPayload;
    return { valid: true, expired: false, data: decoded };
  } catch (err) {
    const error = err as jwt.JsonWebTokenError;
    console.error(
      'An error occured while verifying refresh token!\nError details: ' +
        (error.message ?? 'Unknown error'),
    );

    if (err instanceof jwt.TokenExpiredError)
      return { valid: true, expired: true, data: {} as TAccessTokenPayload };

    return { valid: false, expired: false, data: {} as TRefreshTokenPayload };
  }
}
