interface DataPoint {
    value: number;
    data: string | null;
}

export interface UserGraph {
    code: number;
    data: Array<Array<DataPoint>>;
    high_limit: number;
    low_limit: number;
    value_ticks: Array<number>;
}
