const baseURL = "https://api.gatari.pw";
const { handlers } = require("../utils/errorHandler");

const other = {
	topScores: async function (mode, period) {
		if (mode === undefined) {
			throw new Error("mode parameter must be defined and a number");
		}
		if (period === undefined) {
			throw new Error("period parameter must be one of 'all, month, week'");
		}

		const url = `${baseURL}/top_scores?mode=${mode}&period=${period}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	},
};

module.exports = { other };
