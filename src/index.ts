import user from "./api/user";
import beatmap from "./api/beatmap";
import leaderboard from "./api/leaderboard";
import other from "./api/other";

import { mods } from "@utils/mods";
import { tools } from "@utils/tools";

const api = {
    user,
    beatmap,
    leaderboard,
    other
};
export { api, tools, mods };
