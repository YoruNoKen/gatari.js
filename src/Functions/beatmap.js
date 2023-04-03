const baseURL = "https://api.gatari.pw";
const { changeValues } = require("../utils/changeValues");
const { handlers } = require("../utils/errorHandler");

const beatmap = {
	topScores: async function (mode, id) {
		if (mode === undefined) {
			throw new Error("mode parameter must be defined and a number");
		}

		if (id === undefined) {
			throw new Error("id parameter must be defined and a number");
		}

		const url = `${baseURL}/beatmap/${id}/scores?mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.data);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	},

	info: async function (id) {
		if (id === undefined) {
			throw new Error("id parameter must be defined and a number");
		}

		const url = `${baseURL}/beatmaps/get?bb=${id}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	},
};

module.exports = { beatmap };
