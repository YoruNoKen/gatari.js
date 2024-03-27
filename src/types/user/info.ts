interface User {
    abbr: null | string;
    clanid: null | string;
    country: string;
    favourite_mode: number;
    followers_count: number;
    id: number;
    latest_activity: number;
    play_style: number;
    privileges: number;
    registered_on: number;
    username: string;
    username_aka: string;
}

export interface UserInfo {
    code: number;
    users: Array<User>;
}
