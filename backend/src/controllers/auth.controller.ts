import HttpStatusCodes from "@src/common/HttpStatusCodes"
import { TLoginBody, TSignUpBody } from "@src/schemas/auth.schema";
import { User } from "@src/models/user.model";
import type { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from "@src/utils";
import { cookieConfig, tokenConfig } from "@src/config";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as TLoginBody;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(HttpStatusCodes.NOT_FOUND).json({ success: false, message: 'No user exists with the specified email.' });
        return;
    }

    const passwordMatches = !!await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ success: false, message: 'Invalid password!' });
        return;
    }

    const refreshToken = generateRefreshToken({ user: { id: user._id.toString(), email: user.email } });
    const accessToken = generateAccessToken({ user: { id: user._id.toString(), email: user.email, name: user.name } });

    res.cookie('accessToken', accessToken, {
        ...cookieConfig,
        maxAge: tokenConfig.accessToken.expiry
    });

    res.cookie('refreshToken', refreshToken, {
        ...cookieConfig,
        maxAge: tokenConfig.refreshToken.expiry
    });

    const { password: _, ...rest } = user.toObject();

    res.status(HttpStatusCodes.OK).json({ success: true, message: 'Logged in successfully!', data: { user: rest } });
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('accessToken', {
        ...cookieConfig,
        maxAge: undefined
    });

    res.clearCookie('refreshToken', {
        ...cookieConfig,
        maxAge: undefined
    });

    res.status(HttpStatusCodes.OK).json({ success: true, message: 'Logged out successfully!' });
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = req.body as TSignUpBody;

    const hashedPassword = await bcrypt.hash(password, 10);

    const emailExists = !!await User.findOne({ email }).select('-password').lean();

    if (emailExists) {
        res.status(HttpStatusCodes.CONFLICT).json({ success: false, message: 'An account already exists with this email!' });
        return;
    }

    const user = await User.create({ email, name, password: hashedPassword });
    const { password: _, ...rest } = user.toObject();

    res.status(HttpStatusCodes.OK).json({ success: true, message: 'Created user successfully!', data: { user: rest } })
}

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatusCodes.OK).json({ success: true, message: 'You are logged in', data: { user: req.user } })
}