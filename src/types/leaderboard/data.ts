export interface LeaderboardData {
    code: number;
    leaderboard: Array<PlayerEntry>;
}

interface PlayerEntry {
    playcount: number;
    ranked_score: number;
    accuracy: number;
    clan?: ClanInfo;
    active: boolean;
    pp: number;
    username: string;
    level: number;
    country: string;
    user: number;
}

interface ClanInfo {
    abbr: string;
    id: number;
}
