const baseURL = "https://api.gatari.pw";
const { mods } = require("../utils/mods");
const { handlers } = require("../utils/errorHandler");

async function ppCalculator({ beatmap_id, accuracy, misses, max_combo, mods: mod }) {
	if (beatmap_id == undefined || accuracy == undefined || misses == undefined || max_combo == undefined || mod == undefined) {
		throw new Error("all parameters must be defined");
	}

	let _mods = mod;
	if (isNaN(mod)) {
		_mods = mods.id(mod);
	}

	const url = `${baseURL}/letsapi/v1/pp/b=${beatmap_id}&a=${accuracy}&x=${misses}&c=${max_combo}&m=${_mods}`;
	const response = await fetch(url).then((res) => res.json());

	var error = handlers.errorHandler(response.code);
	if (error != undefined) {
		throw error;
	}

	return response.result;
}

module.exports = { ppCalculator };
