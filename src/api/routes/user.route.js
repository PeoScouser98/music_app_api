import express from 'express';
import {
	activateAccount,
	getUser,
	list,
	recoverPassword,
	resetPassword,
	update,
} from '../controllers/user.controller';
import {
	loginWithEmail,
	refreshToken,
	register,
	loginWithGoogle,
	logout,
} from '../controllers/auth.controller';
import { checkAccessToken } from '../middlewares/checkAuth.middleware';
import passport from 'passport';
import globalConfig from '../../config/global.config';

const router = express.Router();
router.get(
	'/auth/google/login',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: globalConfig.frontendURL + '/login',
	}),
	loginWithGoogle
);

router.get('/users', list);
router.get('/user', checkAccessToken, getUser);
router.get('/refresh-token/:userId', refreshToken);
router.post(
	'/auth/login-with-email',
	passport.authenticate('local', {
		failureRedirect: globalConfig.frontendURL + '/login',
	}),
	loginWithEmail
);
router.post('/register', register);
router.get('/activate-account', activateAccount);
router.post('/forgot-password', recoverPassword);
router.post('/reset-password', resetPassword);
router.patch('/user', checkAccessToken, update);
router.post('/logout', logout);
export default router;
