const passport = require("passport");
const user = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//set options for jwt strategy
const jwtOptions = {};

//ctreate jwt strategy
const jwtlogin = new JwtStrategy(jwtOptions, function (payload, done) {
	//See if the user id in payload exist in DB
	//if it does, call done with that user
	//otherwise call done without user object
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
