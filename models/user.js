const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

//Define Our Model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
});

//on save hook encrypt password

// const password = "mypass123";
//const saltRounds = 10;

userSchema.pre("save", function (next) {
	const user = this;
	bcrypt.genSalt(10, function (err, salt) {
		if (err) {
			throw err;
		} else {
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) {
					throw err;
				} else {
					// console.log("heyyyy", hash);
					user.password = hash;
					next();
					//$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
				}
			});
		}
	});
});

const modelClass = mongoose.model("user", userSchema);

//Export  the model
module.exports = modelClass;
