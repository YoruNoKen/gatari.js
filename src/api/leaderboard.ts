import { request } from "@utils/request";
import { Leaderboard, Request } from "@type/enums";
import { errorHandler } from "@utils/errorHandler";
import type { LeaderboardClan, LeaderboardData } from "@type/leaderboard";
import type { Mode } from "@type/enums";

async function pp(mode: Mode, page = 1, country?: string): Promise<LeaderboardData> {
    let params = `m=${mode}&p=${page}`;
    if (typeof country !== "undefined")
        params += `&country=${country}`;

    const response = await request(Request.LEADERBOARD, Leaderboard.PP, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<LeaderboardData>;
}

async function score(mode: Mode, page = 1, country?: string): Promise<LeaderboardData> {
    let params = `m=${mode}&p=${page}`;
    if (typeof country !== "undefined")
        params += `&country=${country}`;

    const response = await request(Request.LEADERBOARD, Leaderboard.SCORE, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<LeaderboardData>;
}

async function clan(): Promise<LeaderboardClan> {
    const response = await request(Request.LEADERBOARD, Leaderboard.CLANS);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<LeaderboardClan>;
}

export default { clan, score, pp };
