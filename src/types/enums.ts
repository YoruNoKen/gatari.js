export enum Request {
    USER = "user",
    USERS = "users",
    LEADERBOARD = "leaderboard",
    BEATMAP = "beatmap"
}

export enum User {
    GET = "get",
    STATS = "stats",
    RECENT = "scores/recent",
    BEST = "scores/best",
    FIRSTS = "scores/firsts",
    MOST_PLAYED = "mostplays",
    FAV_SCORE = "scores/favs",
    FAV_MAP = "favs",
    GRAPH = "charts",
    ACTIVITY = "events",
    ACHIEVEMENTS = "achievements"
}

export enum Mode {
    OSU = 0,
    TAIKO = 1,
    FRUITS = 2,
    MANIA = 3
}
