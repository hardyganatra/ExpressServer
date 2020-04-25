const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

function tookenforuser(user) {
	const timestamp = new Date().getTime;
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		return res
			.status(422)
			.send({ error: "you must provide email and password" });
	}
	//see if the user with given email address exist
	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}
		if (existingUser) {
			return res.status(422).send({ error: "Email allready exist " });
		}
		//if valid user no previous record or a fresh email we need to create a record
		const user = new User({
			email: email,
			password: password,
		});
		user.save(function (err) {
			if (err) {
				return next(err);
			}
			res.json({ token: tookenforuser(user) });
		});
	});
};
