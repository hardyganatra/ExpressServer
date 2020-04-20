const User = require("../models/user");
exports.signup = function (req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	//see if the user with given email address exist
	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}
		if (existingUser) {
			return res.status(422).send({ error: "Email allready exist " });
		}
		//if valis user no previous record or a fresh email we need to create a record
		const user = new User({
			email: email,
			password: password,
		});
		user.save(function (err) {
			if (err) {
				return next(err);
			}
			res.json({ success: true });
		});
	});
};
