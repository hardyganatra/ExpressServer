const Authentication = require("./Controllers/authenticaton");

module.exports = function (app) {
	app.post("/signup", Authentication.signup);
};
