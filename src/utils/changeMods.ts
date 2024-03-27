import { mods } from "./mods";
import type { UserBeatmapScore, UserScores } from "@type/user";

export function changeMods(req: UserScores | UserBeatmapScore): void {
    if ("score" in req) {
        for (let i = 0; i < req.score.length; i++) {
            const modsBit = req.score[i].mods;
            const modsName = mods.name(modsBit);
            req.score[i].mods_name = modsName;
        }
    } else {
        for (let i = 0; i < req.scores.length; i++) {
            const modsBit = req.scores[i].mods;
            const modsName = mods.name(modsBit);
            req.scores[i].mods_name = modsName;
        }
    }
}
