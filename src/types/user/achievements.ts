interface Achievement {
    category: number;
    color: string;
    description: string;
    enable: number;
    icon: string;
    name: string;
    time: number;
}

interface AchievementData {
    achievements: Array<Achievement>;
    name: string;
}

type Data = Record<string, AchievementData>;

export interface UserAchievements {
    code: number;
    data: Data;
}
