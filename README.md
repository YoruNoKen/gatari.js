### gatari-api-wrapper

[![](https://img.shields.io/npm/v/gatari-api-wrapper?color=AD745F&style=for-the-badge)](https://www.npmjs.com/package/gatari-api-wrapper)
[![](https://img.shields.io/bundlephobia/min/@aqilcont/gatari-api-wrapper?color=5FAE89&label=size&style=for-the-badge)](https://www.npmjs.com/package/gatari-api-wrapper)
[![](https://img.shields.io/npm/dm/gatari-api-wrapper?color=625FAD&style=for-the-badge)](https://npm-stat.com/charts.html?package=gatari-api-wrapper)
![](https://img.shields.io/npm/l/gatari-api-wrapper?color=AD5F8C&style=for-the-badge)

# Usage

## [Documentation](https://github.com/YoruNoKen/gatari-api-wrapper/wiki)

## Installation

```
npm install gatari-api-wrapper
```

# Example

```js
const { v1, tools, mods } = require("gatari-api-wrapper");

async function main() {
	const user_test = await v1.user.info("neriv");
	console.log(user_test); // returns general user info

	const beatmap_test = await v1.beatmap.info(1000);
	console.log(beatmap_test); // returns beatmap information

	const leaderboard_test = await v1.leaderboard.score("0");
	console.log(leaderboard_test); // returns global score leaderboard

	const tools_test = await tools.ppCalculator({ beatmap_id: 1000, accuracy: 100, max_combo: 1000, misses: 0 });
	console.log(tools); // returns the calculated pp

	const mods_test = mods.name(64);
	console.log(mods_test); // returns "DT"
}

main();
```
