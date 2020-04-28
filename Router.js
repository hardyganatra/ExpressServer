const Authentication = require("./Controllers/authenticaton");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
	app.get("/", function (req, res) {
		res.send({
			streams: [
				{
					Title: "fd111111mod againnnnnn",
					Description: "fd111111mod",
					UserID: "106784740520625180825",
					id: 2,
				},
				{
					Title: "Virat",
					Description: "Kohli",
					id: 3,
				},
				{
					Title: "with id - login",
					Description: "Given an login id",
					UserID: "106784740520625180825",
					id: 14,
				},
				{
					Title: "with id - login",
					Description: "Given an login id",
					UserID: "106784740520625180825",
					id: 14,
				},
				{
					Title: "Programma editefd",
					Description: "Programma editefd",
					id: 19,
				},
				{
					Title: "lmnss edited",
					Description: "lmnss edited",
					id: 20,
				},
				{
					Title: "qs edited",
					Description: "qs edited",
					id: 21,
				},
				{
					Title: "Its A Title",
					Description: "Its A Description",
					UserID: "106784740520625180825",
					id: 22,
				},
				{
					Title: "knxa123",
					Description: "';qc';",
					UserID: "108810495936710753745",
					id: 23,
				},
			],
		});
	});

	app.get("/withauth", requireAuth, function (req, res) {
		res.send({ hi: "there" });
	});
	//app.post("/signin", requireSignin, Authentication.signin);
	app.post("/signin", requireSignin, Authentication.signin);
	app.post("/signup", Authentication.signup);
};
