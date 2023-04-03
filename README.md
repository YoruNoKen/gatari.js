# gatari-api-wrapper

# Usage

## [Documentation](https://github.com/YoruNoKen/gatari-api-wrapper/wiki)

## Installation

```
npm install gatari-api-wrapper
```

# Example

```js
const { userClass, beatmapClass, leaderboardClass, gatari_api } = require("./src/index");

const user = new userClass();
const beatmap = new beatmapClass();
const leaderboard = new leaderboardClass();
const others = new gatari_api();

async function main() {
	const user_test = await user.recent("neriv", { mode: 0 });
	console.log(user_test);

	const beatmap_test = await beatmap.info(1000);
	console.log(beatmap_test);

	const leaderboard_test = await leaderboard.global("score", { mode: 0 });
	console.log(leaderboard_test);

	const others_test = await others.calculatePP({ beatmap_id: 1000, accuracy: 100, max_combo: 1000, misses: 0 });
	console.log(others_test);
}
main();
```
