const { mods } = require("./utilities/mods");
const { tools } = require("./utilities/tools");

// importing handlers
const { user } = require("./api/routes/user");
const { beatmap } = require("./api/routes/beatmap");
const { leaderboard } = require("./api/routes/leaderboard");
const { other } = require("./api/routes/other");

module.exports = {
	v1: {
		user,
		beatmap,
		leaderboard,
		other,
	},
	tools,
	mods,
};
