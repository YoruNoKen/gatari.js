import { errorHandler } from "@utils/errorHandler";
import { mods as modsCalc } from "@utils/mods";
import { changeValues } from "@utils/changeValues";
import { validateParameters } from "@utils/validateParameters";
import { request } from "@utils/request";
import { Request, User } from "@type/enums";
import type { Mode } from "@type/enums";
import type { UserInfo, UserRecent, UserStats } from "@type/user";

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
    const response = await request(Request.USERS, User.STATS, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<UserStats>;
}

async function recent(id: number, mode: Mode, { page, pageLength, includeFails }: { page?: number, pageLength?: number, includeFails?: boolean }): Promise<UserRecent> {
    let params = `id=${id}&mode=${mode}`;
    if (typeof page !== "undefined")
        params += `&p=${page}`;

    if (typeof pageLength !== "undefined")
        params += `&l=${length}`;

    if (typeof includeFails !== "undefined")
        params += `&f=${includeFails ? 1 : 0}`;

    const response = await request(Request.USERS, User.RECENT, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<UserRecent>;
}

const user = {
    top: async function (user, { mode, page, length, mods: mod }) {
        if (mode === undefined)
            throw new Error("mode parameter must be a number");

        validateParameters([page, length]);

        let filter = "";
        if (page !== undefined)
            filter += `&p=${page}`;

        if (length !== undefined)
            filter += `&l=${length}`;

        if (mod !== undefined) {
            if (isNaN(mod)) {
                const _mods = modsCalc.id(mod);
                filter += `&mods=${_mods}`;
            } else
                filter += `&mods=${mod}`;
        }

        const url = `${baseUrl}/user/scores/best?id=${user}&mode=${mode}${filter}`;
        const response = await fetch(url).then(async (res) => res.json());

        const scores = changeValues(response.scores);

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return scores;
    },

    firsts: async function (user, { mode, page, length }) {
        /**
		if user param is not a number, turn it into a number
		*/
        if (typeof user !== "number")
            user = await stringToID(user);

        if (mode === undefined)
            throw new Error("mode parameter must be a number");

        validateParameters([page, length]);

        let filter = "";
        if (page !== undefined)
            filter += `&p=${page}`;

        if (length !== undefined)
            filter += `&l=${length}`;

        const url = `${baseUrl}/user/scores/first?id=${user}&mode=${mode}${filter}`;
        const response = await fetch(url).then(async (res) => res.json());

        const scores = changeValues(response.scores);

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return scores;
    },

    mostPlayed: async function (user, { mode, page }) {
        /**
		if user param is not a number, turn it into a number
		*/
        if (typeof user !== "number")
            user = await stringToID(user);

        if (mode === undefined)
            throw new Error("mode parameter must be a number");

        validateParameters([page]);

        let filter = "";
        if (page !== undefined)
            filter += `&page=${page}`;

        const url = `${baseUrl}/user/mostplays?id=${user}&mode=${mode}${filter}`;
        const response = await fetch(url).then(async (res) => res.json());

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return response.result;
    },

    pinned: async function (user, mode) {
        /**
		if user param is not a number, turn it into a number
		*/
        if (typeof user !== "number")
            user = await stringToID(user);

        if (mode === undefined)
            throw new Error("mode parameter must be a number");

        validateParameters([page, length]);

        let filter = "";
        if (page !== undefined)
            filter += `&p=${page}`;

        if (length !== undefined)
            filter += `&l=${length}`;

        const url = `${baseUrl}/user/scores/favs?id=${user}&mode=${mode}${filter}`;
        const response = await fetch(url).then(async (res) => res.json());

        let scores = changeValues(response.scores);
        if (scores == undefined)
            scores = [];

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return scores;
    },

    achievements: async function (user, mode) {
        const url = `${baseUrl}/user/achievements?u=${user}&mode=${mode}`;
        const response = await fetch(url).then(async (res) => res.json());

        const error = errorHandler(response.code);
        if (error != undefined)
            throw error;

        return response.achievements;
    },

    likedMaps: async function (user, page) {
        /**
		if user param is not a number, turn it into a number
		*/
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
