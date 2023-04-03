const baseURL = "https://api.gatari.pw";
const { handlers } = require("../utils/errorHandler");

const leaderboard = {
	score: async function (mode, page, country) {
		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		if (page === undefined) {
			page = 1;
		}

		let filter = "";
		filter += `?m=${mode}`;
		filter += `&p=${page}`;
		if (country !== undefined) {
			filter += `&country=${country}`;
		}

		const url = `${baseURL}/leaderboard/score${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.leaderboard;
	},

	pp: async function (mode, page, country) {
		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		if (page === undefined) {
			page = 1;
		}

		let filter = "";
		filter += `?m=${mode}`;
		filter += `&p=${page}`;
		if (country !== undefined) {
			filter += `&country=${country}`;
		}

		const url = `${baseURL}/leaderboard/pp${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.leaderboard;
	},

	clan: async function () {
		const url = `${baseURL}/leaderboard/clans`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	},
};

module.exports = { leaderboard };
