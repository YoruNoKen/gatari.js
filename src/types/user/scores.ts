import type { Grades } from "@type/enums";

interface Beatmap {
    ar: number;
    beatmap_id: number;
    beatmap_md5: string;
    beatmapset_id: number;
    bpm: number;
    creator: string;
    difficulty: number;
    fc: number;
    hit_length: number;
    od: number;
    ranked: number;
    ranked_status_frozen: number;
    song_name: string;
}

interface Score {
    accuracy: number;
    beatmap: Beatmap;
    completed: number;
    count_100: number;
    count_300: number;
    count_50: number;
    count_gekis: number;
    count_katu: number;
    count_miss: number;
    full_combo: boolean;
    id: number;
    isfav: boolean;
    max_combo: number;
    mods: number;
    mods_name: string;
    play_mode: number;
    pp: number;
    ranking: Grades;
    score: number;
    time: string;
    views: number;
}

export interface UserScores {
    code: number;
    count: number;
    scores: Array<Score>;
}
