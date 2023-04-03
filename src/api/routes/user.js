const { handlers } = require("../../utilities/errorHandler");
const { stringToID } = require("../../utilities/StringToNumber");
const { mods } = require("../../utilities/mods");
const { changeValues } = require("../../utilities/changeValues");
const { validateParameters } = require("../../utilities/validateParameters");

const baseURL = "https://api.gatari.pw";
const user = {
	info: async function (user) {
		let userParam;
		if (user.includes(" ")) {
			const _user = user.split(" ");
			userParam = _user.map((user) => `?ids=${user}`).join("");
		} else {
			userParam = `?u=${user}`;
		}

		const url = `${baseURL}/users/get${userParam}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error !== undefined) {
			throw error;
		}

		return response.users;
	},

	stats: async function (user, mode) {
		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${baseURL}/user/stats?u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.users;
	},

	recent: async function (user, { mode, page, length, include_fails }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		validateParameters([page, length, include_fails]);

		let filter = "";
		if (page !== undefined) {
			filter += `&p=${page}`;
		}
		if (length !== undefined) {
			filter += `&l=${length}`;
		}
		if (include_fails !== undefined) {
			filter += `&f=${include_fails}`;
		}

		const url = `${baseURL}/user/scores/recent?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.scores);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	},

	top: async function (user, { mode, page, length, mods: mod }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		validateParameters([page, length]);

		let filter = "";
		if (page !== undefined) {
			filter += `&p=${page}`;
		}
		if (length !== undefined) {
			filter += `&l=${length}`;
		}
		if (mod !== undefined) {
			if (isNaN(mod)) {
				let _mods = mods.id(mod);
				filter += `&mods=${_mods}`;
			} else {
				filter += `&mods=${mod}`;
			}
		}

		const url = `${baseURL}/user/scores/best?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.scores);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	},

	firsts: async function (user, { mode, page, length }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		validateParameters([page, length]);

		let filter = "";
		if (page !== undefined) {
			filter += `&p=${page}`;
		}
		if (length !== undefined) {
			filter += `&l=${length}`;
		}

		const url = `${baseURL}/user/scores/first?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.scores);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	},

	mostPlayed: async function (user, { mode, page }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		validateParameters([page]);

		let filter = "";
		if (page !== undefined) {
			filter += `&page=${page}`;
		}

		const url = `${baseURL}/user/mostplays?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	},

	pinned: async function (user, { mode, page, length }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		validateParameters([page, length]);

		let filter = "";
		if (page !== undefined) {
			filter += `&p=${page}`;
		}
		if (length !== undefined) {
			filter += `&l=${length}`;
		}

		const url = `${baseURL}/user/scores/favs?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.scores);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	},

	favorites: async function (user, page) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (page != undefined) {
			const _error = handlers.validHandler(page);
			if (_error !== undefined) {
				throw _error;
			}
		}

		let filter = "";
		if (page !== undefined) {
			filter += `&p=${page}`;
		}

		const url = `${baseURL}/user/favs?id=${user}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	},

	ppGraph: async function (user, mode) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${baseURL}/user/charts?u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	},

	activity: async function (user, mode) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${baseURL}/user/events?u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	},

	beatmapScore: async function (user, mode, beatmap_id) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (isNaN(beatmap_id)) {
			throw new Error("beatmap_id parameter must be a number");
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${baseURL}/beatmap/user/score?b=${beatmap_id}&u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		const score = changeValues(response.score);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return score;
	},
};

module.exports = { user };
