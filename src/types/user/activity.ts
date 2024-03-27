interface UserData {
    data: [number, { rank: string }];
    id: number;
    log: string;
    mode: number;
    time: number;
    type: number;
    userid: number;
}

export interface UserActivity {
    code: number;
    data: Array<UserData>;
}
