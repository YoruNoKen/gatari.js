import { errorHandler } from "@utils/errorHandler";
import { mods as modsCalc } from "@utils/mods";
import { request } from "@utils/request";
import { Request, User } from "@type/enums";
import type { Mode } from "@type/enums";
import type { MostPlayed, UserInfo, UserScores, UserStats } from "@type/user";

const baseUrl = "https://api.gatari.pw";

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

    return response.json() as Promise<UserScores>;
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

    return response.json() as Promise<UserScores>;
}

async function firsts(id: number, mode: Mode, { page = 1, pageLength = 50 }: { page?: number, pageLength?: number }): Promise<UserScores> {
    const params = `id=${id}&mode=${mode}&p=${page}&l=${pageLength}`;

    const response = await request(Request.USER, User.FIRSTS, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<UserScores>;
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

    return response.json() as Promise<UserScores>;
}

const user = {
    achievements: async function (user, mode) {
        const url = `${baseUrl}/user/achievements?u=${user}&mode=${mode}`;
        const response = await fetch(url).then(async (res) => res.json());

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return response.achievements;
    },

    likedMaps: async function (user, page) {
        // if user param is not a number, turn it into a number
        if (typeof user !== "number")
            user = await stringToID(user);

        let filter = "";
        if (page !== undefined)
            filter += `&p=${page}`;

        const url = `${baseUrl}/user/favs?id=${user}${filter}`;
        const response = await fetch(url).then(async (res) => res.json());

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return response.result;
    },

    ppGraph: async function (user, mode) {
        /**
		if user param is not a number, turn it into a number
		*/
        if (typeof user !== "number")
            user = await stringToID(user);

        if (mode === undefined)
            throw new Error("mode parameter must be a number");

        const url = `${baseUrl}/user/charts?u=${user}&mode=${mode}`;
        const response = await fetch(url).then(async (res) => res.json());

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return response.data;
    },

    activity: async function (user, mode) {
        /**
		if user param is not a number, turn it into a number
		*/
        if (typeof user !== "number")
            user = await stringToID(user);

        if (mode === undefined)
            throw new Error("mode parameter must be a number");

        const url = `${baseUrl}/user/events?u=${user}&mode=${mode}`;
        const response = await fetch(url).then(async (res) => res.json());

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return response.data;
    },

    beatmapScore: async function (user, mode, beatmap_id) {
        /**
		if user param is not a number, turn it into a number
		*/
        if (typeof user !== "number")
            user = await stringToID(user);

        if (isNaN(beatmap_id))
            throw new Error("beatmap_id parameter must be a number");

        if (mode === undefined)
            throw new Error("mode parameter must be a number");

        const url = `${baseUrl}/beatmap/user/score?b=${beatmap_id}&u=${user}&mode=${mode}`;
        const response = await fetch(url).then(async (res) => res.json());

        const score = changeValues(response.score);

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return score;
    }
};

module.exports = { user };
