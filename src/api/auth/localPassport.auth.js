import passport from 'passport';
import User from '../models/user.model';
import { Strategy as LocalStrategy } from 'passport-local';
import createHttpError from 'http-errors';

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
			session: true,
		},
		(req, email, password, done) => {
			User.findOne({ email }, (error, user) => {
				if (error) {
					return done(null, false, { message: error.message });
				}
				if (!user) {
					return done(null, false, {
						message: 'Account does not exist!',
					});
				}
				console.log(user.authenticate(password));
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Incorrect password!',
					});
				}
				return done(null, user.toObject());
			});
		}
	)
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));
