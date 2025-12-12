import HTTP_STATUS_CODES from '@src/common/HTTP_STATUS_CODES';
import { TLoginBody, TSignUpBody } from '@src/schemas/auth.schema';
import { User } from '@src/models/user.model';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '@src/utils';
import { cookieConfig, tokenConfig } from '@src/config';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as TLoginBody;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(HTTP_STATUS_CODES.NotFound).json({ success: false, message: 'No user exists with the specified email.' });
    return;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    res.status(HTTP_STATUS_CODES.BadRequest).json({ success: false, message: 'Invalid password!' });
    return;
  }

  const refreshToken = generateRefreshToken({ user: { id: user._id.toString(), email: user.email } });
  const accessToken = generateAccessToken({ user: { id: user._id.toString(), email: user.email, name: user.name } });

  res.cookie('accessToken', accessToken, {
    ...cookieConfig,
    maxAge: tokenConfig.accessToken.expiry,
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieConfig,
    maxAge: tokenConfig.refreshToken.expiry,
  });

  res.status(HTTP_STATUS_CODES.Ok).json({
    success: true,
    message: 'Logged in successfully!',
    data: {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    },
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('accessToken', {
    ...cookieConfig,
    maxAge: undefined,
  });

  res.clearCookie('refreshToken', {
    ...cookieConfig,
    maxAge: undefined,
  });

  res.status(HTTP_STATUS_CODES.Ok).json({ success: true, message: 'Logged out successfully!' });
};

export const signup = async (req: Request, res: Response) => {
  const { email, name, password } = req.body as TSignUpBody;

  const hashedPassword = await bcrypt.hash(password, 10);

  const emailExists = !!await User.findOne({ email }).select('-password').lean();

  if (emailExists) {
    res.status(HTTP_STATUS_CODES.Conflict).json({ success: false, message: 'An account already exists with this email!' });
    return;
  }

  const user = await User.create({ email, name, password: hashedPassword });

  res.status(HTTP_STATUS_CODES.Ok).json({
    success: true,
    message: 'Created user successfully!',
    data: {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    },
  });
};

export const getMe = (req: Request, res: Response) => {
  res.status(HTTP_STATUS_CODES.Ok).json({ success: true, message: 'You are logged in', data: { user: req.user } });
};