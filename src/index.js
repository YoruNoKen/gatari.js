const { mods } = require("./utils/mods");
const { ppCalculator } = require("./utils/ppCalculator");
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
	tools: { ppCalculator },
	mods,
};
