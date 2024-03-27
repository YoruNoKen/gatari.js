interface Score {
    accuracy: number;
    count_100: number;
    count_300: number;
    count_50: number;
    count_miss: number;
    country: string;
    fc: number;
    friend: number;
    id: number;
    max_combo: number;
    mods: number;
    play_mode: number;
    pp: number;
    rank: string;
    score: number;
    time: number;
    userid: number;
    username: string;
}

export interface BeatmapLeaderboard {
    code: number;
    data: Array<Score>;
}
