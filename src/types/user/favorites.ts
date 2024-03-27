import type { RankedStatus } from "@type/enums";

interface Beatmap {
    beatmap_id: number;
    difficulty_ctb: number;
    difficulty_mania: number;
    difficulty_std: number;
    difficulty_taiko: number;
    mode: number;
    version: string;
}

interface Beatmapset {
    artist: string;
    beatmaps: Array<Beatmap>;
    beatmapset_id: number;
    creator: string;
    favourite_count: number;
    passcount: number;
    playcount: number;
    ranked: RankedStatus;
    ranked_status_freezed: number;
    ranking_data: number;
    title: string;
}

export interface UserFavorites {
    code: number;
    result: Array<Beatmapset>;
}
