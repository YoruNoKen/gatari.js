interface Stats {
    a_count: number;
    avg_accuracy: number;
    avg_hits_play: number;
    country_rank: number;
    id: number;
    level: number;
    level_progress: number;
    max_combo: number;
    playcount: number;
    playtime: number;
    pp: number;
    rank: number;
    ranked_score: number;
    replays_watched: number;
    s_count: number;
    sh_count: number;
    total_hits: number;
    total_score: number;
    x_count: number;
    xh_count: number;
}

export interface UserStats {
    code: number;
    stats: Stats;
}
