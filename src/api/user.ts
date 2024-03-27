import { errorHandler } from "@utils/errorHandler";
import { mods as modsCalc } from "@utils/mods";
import { request } from "@utils/request";
import { Request, User } from "@type/enums";
import { changeMods } from "@utils/changeMods";
import type { Mode } from "@type/enums";
import type { MostPlayed, UserInfo, UserScores, UserStats, UserAchievements, UserFavorites, UserGraph, UserActivity, UserBeatmapScore } from "@type/user";

async function info(user: string | number | Array<string | number>): Promise<UserInfo> {
    let params = "";
    if (Array.isArray(user))
        for (let i = 0; i < user.length; i++) params += `&ids=${user[i]}`;
    else
        params = `u=${user}`;

    const response = await request(Request.USERS, User.GET, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<UserInfo>;
}

async function stats(user: string | number, mode: Mode): Promise<UserStats> {
    const params = `u=${user}&mode=${mode}`;
    const response = await request(Request.USER, User.STATS, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<UserStats>;
}

async function recent(id: number, mode: Mode, { page, pageLength, includeFails }: { page?: number, pageLength?: number, includeFails?: boolean }): Promise<UserScores> {
    let params = `id=${id}&mode=${mode}`;
    if (typeof page !== "undefined")
        params += `&p=${page}`;

    if (typeof pageLength !== "undefined")
        params += `&l=${length}`;

    if (typeof includeFails !== "undefined")
        params += `&f=${includeFails ? 1 : 0}`;

    const response = await request(Request.USER, User.RECENT, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    const data = await response.json() as UserScores;
    changeMods(data);

    return data;
}

async function best(id: number, mode: Mode, { page = 1, pageLength = 50, mods }: { page?: number, pageLength?: number, mods?: Array<string> }): Promise<UserScores> {
    let params = `id=${id}&mode=${mode}&p=${page}&l=${pageLength}`;

    if (typeof mods !== "undefined") {
        let modsMashed = "";
        for (let i = 0; i < mods.length; i++) modsMashed += mods[i];
        params += `&mods=${modsCalc.id(modsMashed)}`;
    }

    const response = await request(Request.USER, User.BEST, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    const data = await response.json() as UserScores;
    changeMods(data);

    return data;
}

async function firsts(id: number, mode: Mode, { page = 1, pageLength = 50 }: { page?: number, pageLength?: number }): Promise<UserScores> {
    const params = `id=${id}&mode=${mode}&p=${page}&l=${pageLength}`;

    const response = await request(Request.USER, User.FIRSTS, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    const data = await response.json() as UserScores;
    changeMods(data);

    return data;
}

async function mostPlayed(id: number, mode: Mode, { page = 1 }: { page?: number }): Promise<MostPlayed> {
    const params = `id=${id}&mode=${mode}&p=${page}`;

    const response = await request(Request.USER, User.MOST_PLAYED, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<MostPlayed>;
}

async function pinned(id: number, mode: Mode): Promise<UserScores> {
    const params = `id=${id}&mode=${mode}`;

    const response = await request(Request.USER, User.FAV_SCORE, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    const data = await response.json() as UserScores;
    changeMods(data);

    return data;
}

async function achievements(id: number, mode: Mode): Promise<UserAchievements> {
    const params = `id=${id}&mode=${mode}`;

    const response = await request(Request.USER, User.ACHIEVEMENTS, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<UserAchievements>;
}

async function likedMaps(id: number, page = 1): Promise<UserFavorites> {
    const params = `id=${id}&p=${page}`;

    const response = await request(Request.USER, User.FAV_MAP, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<UserFavorites>;
}

async function graph(id: number, mode: Mode): Promise<UserGraph> {
    const params = `id=${id}&mode=${mode}`;

    const response = await request(Request.USER, User.GRAPH, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<UserGraph>;
}

async function activity(id: number, mode: Mode): Promise<UserActivity> {
    const params = `id=${id}&mode=${mode}`;

    const response = await request(Request.USER, User.ACTIVITY, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<UserActivity>;
}

async function beatmap(id: number, mode: Mode, beatmapId: number): Promise<UserBeatmapScore> {
    const params = `b=${beatmapId}id=${id}&mode=${mode}`;

    const response = await request(Request.USER_BEATMAP, User.SCORE, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    const data = await response.json() as UserBeatmapScore;
    changeMods(data);

    return data;
}

const scores = {
    recent, best, beatmap
};

export default { achievements, activity, scores, firsts, graph, info, stats, pinned, likedMaps, mostPlayed };

