export enum Request {
    USER = "user",
    USERS = "users",
    USER_BEATMAP = "beatmap/user",
    SCORE = "scores",
    LEADERBOARD = "leaderboard",
    BEATMAP = "beatmap",
    TOP_SCORES = "top_scores"
}

export enum User {
    GET = "get",
    STATS = "stats",
    RECENT = "scores/recent",
    BEST = "scores/best",
    SCORE = "score",
    FIRSTS = "scores/firsts",
    MOST_PLAYED = "mostplays",
    FAV_SCORE = "scores/favs",
    FAV_MAP = "favs",
    GRAPH = "charts",
    ACTIVITY = "events",
    ACHIEVEMENTS = "achievements"
}

export enum Leaderboard {
    PP = "pp",
    SCORE = "score",
    CLANS = "clans"
}

export enum Mode {
    OSU = 0,
    TAIKO = 1,
    FRUITS = 2,
    MANIA = 3
}

export enum RankedStatus {
    Unranked = 0,
    RecentlyUpdated = 1,
    Ranked = 2,
    Approved = 3,
    Qualified = 4,
    Loved = 5
}

export enum Grades {
    X = "X",
    XH = "XH",
    S = "S",
    SH = "SH",
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    F = "F"
}
