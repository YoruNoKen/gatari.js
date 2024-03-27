interface Beatmap {
    ar: number;
    artist: string;
    beatmap_id: number;
    beatmapset_id: number;
    bpm: number;
    cs: number;
    difficulty_ctb: number;
    difficulty_mania: number;
    difficulty_std: number;
    difficulty_taiko: number;
    hit_length: number;
    hp: number;
    mode: number;
    od: number;
    ranked: number;
    ranked_status_freezed: number;
    ranking_data: number;
    rating: number;
    title: string;
    version: string;
}

export interface BeatmapInfo {
    code: number;
    data: Array<Beatmap>;
}

