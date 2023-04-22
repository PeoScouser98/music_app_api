import passport from 'passport';
import 'dotenv/config';
import googleApiConfig from '../../config/googleAPI.config';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from '../models/user.model';

passport.use(
	new GoogleStrategy(
		{
			clientID: googleApiConfig.clientId,
			clientSecret: googleApiConfig.clientSecret,
			callbackURL: '/api/auth/google/callback',
			passReqToCallback: true,
		},
		function (req, accessToken, refreshToken, profile, done) {
			console.log(profile);
			const userProfile = {
				email: profile.email,
				username: profile.displayName,
				avatar: profile.picture,
				role: 'USER',
			};
			User.findOrCreate(userProfile, function (err, user) {
				if (err) {
					return done(null, false);
				}
				return done(null, user.toObject());
			});
		}
	)
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));
