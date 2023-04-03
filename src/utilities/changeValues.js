const { mods } = require("./mods");

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

module.exports = { changeValues };
