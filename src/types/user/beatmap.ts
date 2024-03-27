interface ScoreData {
    accuracy: number;
    count_100: number;
    count_300: number;
    count_50: number;
    count_miss: number;
    id: number;
    max_combo: number;
    mods: number;
    mods_name: string;
    play_mode: number;
    pp: number;
    rank: string;
    score: number;
    time: number;
    top: number;
}

export interface UserBeatmapScore {
    code: number;
    score: Array<ScoreData>;
}
