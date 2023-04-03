const { handlers } = require("./utils/errorHandler");
const { stringToID } = require("./utils/StringToNumber");
const { mods } = require("./utils/mods");

class gatari_api {
	static baseURL = "https://api.gatari.pw";

	async userInfo(user) {
		let userParam;
		if (user.includes(" ")) {
			const _user = user.split(" ");
			userParam = _user.map((user) => `?ids=${user}`).join("");
		} else {
			userParam = `?u=${user}`;
		}

		const url = `${gatari_api.baseURL}/users/get${userParam}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error !== undefined) {
			throw error;
		}

		return response.users;
	}

	async userStats(user, mode) {
		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${gatari_api.baseURL}/user/stats?u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.users;
	}

	async userRecent(user, { mode, page, length, include_fails }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const parameters = [page, length, include_fails];
		parameters.forEach((param) => {
			if (param != undefined) {
				const error = handlers.validHandler(param);
				if (error !== undefined) {
					throw error;
				}
			}
		});

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

		const url = `${gatari_api.baseURL}/user/scores/recent?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		for (let i = 0; i < response.scores.length; i++) {
			const mods_bit = response.scores[i].mods;
			const mods_name = mods.name(mods_bit);
			response.scores[i].mods_name = mods_name;
		}

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.scores;
	}

	async userTop(user, { mode, page, length, mods: mod }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const parameters = [page, length];
		parameters.forEach((param) => {
			if (param != undefined) {
				const error = handlers.validHandler(param);
				if (error !== undefined) {
					throw error;
				}
			}
		});

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

		const url = `${gatari_api.baseURL}/user/scores/best?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		for (let i = 0; i < response.scores.length; i++) {
			const mods_bit = response.scores[i].mods;
			const mods_name = mods.name(mods_bit);
			response.scores[i].mods_name = mods_name;
		}

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.scores;
	}

	async userFirsts(user, { mode, page, length }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const parameters = [page, length];
		parameters.forEach((param) => {
			if (param != undefined) {
				const error = handlers.validHandler(param);
				if (error !== undefined) {
					throw error;
				}
			}
		});

		let filter = "";
		if (page !== undefined) {
			filter += `&p=${page}`;
		}
		if (length !== undefined) {
			filter += `&l=${length}`;
		}

		const url = `${gatari_api.baseURL}/user/scores/first?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		for (let i = 0; i < response.scores.length; i++) {
			const mods_bit = response.scores[i].mods;
			const mods_name = mods.name(mods_bit);
			response.scores[i].mods_name = mods_name;
		}

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.scores;
	}

	async userMostPlayed(user, { mode, page }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const _error = handlers.validHandler(page);
		if (_error !== undefined) {
			throw _error;
		}

		let filter = "";
		if (page !== undefined) {
			filter += `&page=${page}`;
		}

		const url = `${gatari_api.baseURL}/user/mostplays?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	}

	async userPinned(user, { mode, page, length }) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const parameters = [page, length];
		parameters.forEach((param) => {
			if (param != undefined) {
				const error = handlers.validHandler(param);
				if (error !== undefined) {
					throw error;
				}
			}
		});

		let filter = "";
		if (page !== undefined) {
			filter += `&p=${page}`;
		}
		if (length !== undefined) {
			filter += `&l=${length}`;
		}

		const url = `${gatari_api.baseURL}/user/scores/favs?id=${user}&mode=${mode}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		for (let i = 0; i < response.scores.length; i++) {
			const mods_bit = response.scores[i].mods;
			const mods_name = mods.name(mods_bit);
			response.scores[i].mods_name = mods_name;
		}

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.scores;
	}

	async userFavoriteMap(user, page) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (page != undefined) {
			if (_error !== undefined) {
				throw _error;
			}
		}
		const _error = handlers.validHandler(page);

		let filter = "";
		if (page !== undefined) {
			filter += `&p=${page}`;
		}

		const url = `${gatari_api.baseURL}/user/favs?id=${user}${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	}

	async userPPGraph(user, mode) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${gatari_api.baseURL}/user/charts?u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	}

	async userActivity(user, mode) {
		/** 
		if user param is not a number, turn it into a number
		*/
		if (typeof user !== "number") {
			user = await stringToID(user);
		}

		if (mode === undefined) {
			throw new Error("mode parameter must be a number");
		}

		const url = `${gatari_api.baseURL}/user/events?u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	}

	async userBeatmapScore(user, mode, beatmap_id) {
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

		const url = `${gatari_api.baseURL}/beatmap/user/score?b=${beatmap_id}&u=${user}&mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		const mods_bit = response.score.mods;
		const mods_name = mods.name(mods_bit);
		response.score.mods_name = mods_name;

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.score;
	}

	async leaderboard(type, { mode, page, country }) {
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

		const url = `${gatari_api.baseURL}/leaderboard/type${filter}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.leaderboard;
	}

	async leaderboardClan() {
		const url = `${gatari_api.baseURL}/leaderboard/clans`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.result;
	}

	async beatmapTopScores(mode, id) {
		if (mode === undefined) {
			throw new Error("mode parameter must be defined and a number");
		}

		if (id === undefined) {
			throw new Error("id parameter must be defined and a number");
		}

		const url = `${gatari_api.baseURL}/beatmap/${id}/scores?mode=${mode}`;
		const response = await fetch(url).then((res) => res.json());

		for (let i = 0; i < response.data.length; i++) {
			const mods_bit = response.data[i].mods;
			const mods_name = mods.name(mods_bit);
			response.data[i].mods_name = mods_name;
		}

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	}

	async beatmapInfo(id) {
		if (id === undefined) {
			throw new Error("id parameter must be defined and a number");
		}

		const url = `${gatari_api.baseURL}/beatmaps/get?bb=${id}`;
		const response = await fetch(url).then((res) => res.json());

		var error = handlers.errorHandler(response.code);
		if (error != undefined) {
			throw error;
		}

		return response.data;
	}

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

module.exports = { gatari_api };
