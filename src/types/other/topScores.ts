interface ResultEntry {
    accuracy: number;
    beatmap_id: number;
    beatmapset_id: number;
    fc: number;
    max_combo: number;
    mods: number;
    pp: number;
    rank: string;
    song_name: string;
    time: number;
    userid: number;
    username: string;
}

export interface OtherScores {
    code: number;
    result: Array<ResultEntry>;
}
