interface Beatmap {
    beatmap_id: number;
    beatmap_md5: string;
    beatmapset_id: number;
    creator: string;
    difficulty: number;
    playcount: number;
    song_name: string;
}

export interface MostPlayed {
    code: number;
    result: Beatmap;
}
