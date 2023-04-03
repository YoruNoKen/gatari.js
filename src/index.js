const { handlers } = require("./utils/errorHandler");
const { stringToID } = require("./utils/StringToNumber");
const { mods } = require("./utils/mods");

function validateParameters(parameters) {
	parameters.forEach((param) => {
		if (param != undefined) {
			const error = handlers.validHandler(param);
			if (error !== undefined) {
				throw error;
			}
		}
	});
}

function mapRankedToString(scores) {
	if (!Array.isArray(scores)) {
		const ranked_num = scores.beatmap.ranked;

		let _ranked;
		switch (ranked_num) {
			case 0:
				_ranked = "unranked";
				break;
			case 2:
				_ranked = "ranked";
				break;
			case 3:
				_ranked = "approved";
				break;
			case 4:
				_ranked = "qualified";
				break;
			case 5:
				_ranked = "loved";
				break;
			default:
				_ranked = undefined;
		}

		scores.beatmap.status = _ranked;
	}
	for (let i = 0; i < scores.length; i++) {
		const ranked_num = scores[i].beatmap.ranked;

		let _ranked;
		switch (ranked_num) {
			case 0:
				_ranked = "unranked";
				break;
			case 2:
				_ranked = "ranked";
				break;
			case 3:
				_ranked = "approved";
				break;
			case 4:
				_ranked = "qualified";
				break;
			case 5:
				_ranked = "loved";
				break;
			default:
				_ranked = undefined;
		}

		scores[i].beatmap.status = _ranked;
	}
	return scores;
}

function changeValues(scores) {
	if (!Array.isArray(scores)) {
		const mods_bit = scores.mods;
		const mods_name = mods.name(mods_bit);
		scores.mods_name = mods_name;

		const _scores = mapRankedToString(scores); // add "status" object
		if (_scores != undefined) {
			return _scores;
		}
		return scores;
	}
	for (let i = 0; i < scores.length; i++) {
		const mods_bit = scores[i].mods;
		const mods_name = mods.name(mods_bit);
		scores[i].mods_name = mods_name;

		const _scores = mapRankedToString(scores); // add "status" object
		if (_scores != undefined) {
			return _scores;
		}
		return scores;
	}
}

class userClass {
	static baseURL = "https://api.gatari.pw";

	async info(user) {
		let userParam;
		if (user.includes(" ")) {
			const _user = user.split(" ");
			userParam = _user.map((user) => `?ids=${user}`).join("");
		} else {
			userParam = `?u=${user}`;
		}

		const url = `${user.baseURL}/users/get${userParam}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error !== undefined) {
			throw error;
		}

		return response.users;
	}

	async stats(user, mode) {
		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${user.baseURL}/user/stats?u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.users;
	}

	async recent(user, { mode, page, length, include_fails }) {
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

		const url = `${user.baseURL}/user/scores/recent?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.scores);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	}

	async top(user, { mode, page, length, mods: mod }) {
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

		const url = `${user.baseURL}/user/scores/best?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.scores);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	}

	async firsts(user, { mode, page, length }) {
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

		const url = `${user.baseURL}/user/scores/first?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.scores);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	}

	async mostPlayed(user, { mode, page }) {
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

		const url = `${user.baseURL}/user/mostplays?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	}

	async pinned(user, { mode, page, length }) {
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

		const url = `${user.baseURL}/user/scores/favs?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.scores);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	}

	async favoriteMap(user, page) {
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

		const url = `${user.baseURL}/user/favs?id=${user}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	}

	async ppGraph(user, mode) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${user.baseURL}/user/charts?u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	}

	async activity(user, mode) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${user.baseURL}/user/events?u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	}

	async beatmapScore(user, mode, beatmap_id) {
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

		const url = `${user.baseURL}/beatmap/user/score?b=${beatmap_id}&u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		const score = changeValues(response.score);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return score;
	}
}

class leaderboardClass {
	static baseURL = "https://api.gatari.pw";

	async global(type, { mode, page, country }) {
		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		if (page === undefined) {
			page = 1;
		}

		if (type != "score" && type != "pp") {
			throw new Error("type parameter must be either 'score' or 'pp'");
		}

		let filter = "";
		filter += `?m=${mode}`;
		filter += `&p=${page}`;
		if (country !== undefined) {
			filter += `&country=${country}`;
		}

		const url = `${leaderboardClass.baseURL}/leaderboard/type${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.leaderboard;
	}

	async clan() {
		const url = `${leaderboardClass.baseURL}/leaderboard/clans`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	}
}

class beatmapClass {
	static baseURL = "https://api.gatari.pw";

	async topScores(mode, id) {
		if (mode === undefined) {
			throw new Error("mode parameter must be defined and a number");
		}

		if (id === undefined) {
			throw new Error("id parameter must be defined and a number");
		}

		const url = `${beatmapClass.baseURL}/beatmap/${id}/scores?mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		const scores = changeValues(response.data);

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return scores;
	}

	async info(id) {
		if (id === undefined) {
			throw new Error("id parameter must be defined and a number");
		}

		const url = `${beatmapClass.baseURL}/beatmaps/get?bb=${id}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	}
}

class gatari_api {
	static baseURL = "https://api.gatari.pw";

	async calculatePP({ beatmap_id, accuracy, misses, max_combo, mods: mod }) {
		if (beatmap_id == undefined || accuracy == undefined || misses == undefined || max_combo == undefined || mod == undefined) {
			throw new Error("all parameters must be defined");
		}

		let _mods = mod;
		if (isNaN(mod)) {
			_mods = mods.id(mod);
		}

		const url = `${gatari_api.baseURL}/letsapi/v1/pp/b=${beatmap_id}&a=${accuracy}&x=${misses}&c=${max_combo}&m=${_mods}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	}

	async topScores(mode, period) {
		if (mode === undefined) {
			throw new Error("mode parameter must be defined and a number");
		}
		if (period === undefined) {
			throw new Error("period parameter must be one of 'all, month, week'");
		}

		const url = `${gatari_api.baseURL}/top_scores?mode=${mode}&period=${period}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	}
}

module.exports = { userClass, beatmapClass, leaderboardClass, gatari_api };
