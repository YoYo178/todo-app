import { getMe, login, logout, signup } from '@src/controllers/auth.controller.js';
import { requireAuth } from '@src/middlewares/auth.middleware.js';
import { validate } from '@src/middlewares/validation.middleware.js';
import { loginSchema, signupSchema } from '@src/schemas/auth.schema.js';
import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.post('/login', validate({ body: loginSchema }), login);
AuthRouter.post('/logout', requireAuth, logout);
AuthRouter.post('/signup', validate({ body: signupSchema }), signup);

AuthRouter.get('/me', requireAuth, getMe);

export default AuthRouter;