const passport = require("passport");
const user = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

//create local Strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function (
	email,
	password,
	done
) {
	//verify the email and password ,
	//call done with the user,
	//if it is correct email and password, or call done with false
	//console.log("Local Login");
	user.findOne({ email: email }, function (err, user) {
		//console.log("Entered1111");
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}
		//compare passwords - is password equal to this.password ??
		user.comparePassword(password, function (err, isMatch) {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}

			return done(null, user);
		});
	});
});

//set options for jwt strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	secretOrKey: "llhxlksnxy9bwjknxsijnlnxojwx0wnnxpjwx11232lknsln",
};

//ctreate jwt strategy
const jwtlogin = new JwtStrategy(jwtOptions, function (payload, done) {
	//See if the user id in payload exist in DB
	//if it does, call done with that user
	//otherwise call done without user object
	console.log("JWT login");
	user.findById(payload.sub, function (err, user) {
		if (err) {
			return done(err, false);
		}
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
});
//tell passport to use JWT Strategy
passport.use(jwtlogin);
passport.use(localLogin);
