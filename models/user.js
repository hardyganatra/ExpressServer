const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define Our Model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
});

//Create our model class
const modelClass = mongoose.model("user", userSchema);

//Export  the model
module.exports = modelClass;
