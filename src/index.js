const { mods } = require("./utils/mods");
const { tools } = require("./utils/tools");
const { user } = require("./Functions/user");
const { beatmap } = require("./Functions/beatmap");
const { leaderboard } = require("./Functions/leaderboard");
const { other } = require("./Functions/other");

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
