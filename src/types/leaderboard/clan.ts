
interface ClanEntry {
    abbr: string;
    creator: string;
    creator_id: number;
    id: number;
    members: number;
    name: string;
    performance: number;
}

export interface LeaderboardClan {
    code: number;
    result: Array<ClanEntry>;
}
