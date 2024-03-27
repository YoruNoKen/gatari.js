import { request } from "@utils/request";
import { Request } from "@type/enums";
import { errorHandler } from "@utils/errorHandler";
import type { BeatmapInfo, BeatmapLeaderboard } from "@type/beatmap";
import type { Mode } from "@type/enums";

async function info(id: number): Promise<BeatmapInfo> {
    const params = `bb=${id}`;
    const response = await request(Request.BEATMAP, "beatmaps", params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<BeatmapInfo>;
}

async function leaderboard(id: number, mode: Mode): Promise<BeatmapLeaderboard> {
    const params = `mode=${mode}`;
    const response = await request(Request.BEATMAP, id, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<BeatmapLeaderboard>;
}

export default { info, leaderboard };
