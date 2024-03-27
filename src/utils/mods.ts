/* eslint-disable @typescript-eslint/naming-convention */
// This code was copy-pasted (with some adjustments) from https://github.com/cyperdark/osu-api-extended/blob/master/src/utility/mods.ts

export const enums = {
    None: 0,
    NoFail: 1,
    Easy: 1 << 1,
    TouchDevice: 1 << 2,
    Hidden: 1 << 3,
    HardRock: 1 << 4,
    SuddenDeath: 1 << 5,
    DoubleTime: 1 << 6,
    Relax: 1 << 7,
    HalfTime: 1 << 8,
    Nightcore: 1 << 9, // DoubleTime mod
    Flashlight: 1 << 10,
    Autoplay: 1 << 11,
    SpunOut: 1 << 12,
    Relax2: 1 << 13, // Autopilot
    Perfect: 1 << 14, // SuddenDeath mod
    Key4: 1 << 15,
    Key5: 1 << 16,
    Key6: 1 << 17,
    Key7: 1 << 18,
    Key8: 1 << 19,
    FadeIn: 1 << 20,
    Random: 1 << 21,
    Cinema: 1 << 22,
    Target: 1 << 23,
    Key9: 1 << 24,
    KeyCoop: 1 << 25,
    Key1: 1 << 26,
    Key3: 1 << 27,
    Key2: 1 << 28,
    KeyMod: 521109504,
    FreeModAllowed: 522171579,
    ScoreIncreaseMods: 1049662
};

const modsKeys: Record<string, string> = {
    0: "NM",
    1: "NF",
    2: "EZ",
    4: "TD",
    8: "HD",
    16: "HR",
    32: "SD",
    64: "DT",
    256: "HT",
    576: "NC", // Only set along with DoubleTime. i.e: NC only gives 576
    1024: "FL",
    4096: "SO",
    16416: "PF", // Only set along with SuddenDeath. i.e: PF only gives 16416
    32768: "K4",
    65536: "K5",
    131072: "K6",
    262144: "K7",
    524288: "K8",
    1048576: "FI",
    2097152: "RD",
    16777216: "K9",
    33554432: "KC",
    67108864: "K1",
    134217728: "K3",
    268435456: "K2",
    1073741824: "MR"
};

const modsOrder: Record<string, number> = {
    nf: 0,
    ez: 1,
    hd: 2,
    dt: 3,
    nc: 3,
    ht: 3,
    hr: 4,
    so: 5,
    sd: 5,
    pf: 5,
    fl: 6,
    td: 7
};

function id(mods: string): number | undefined {
    if (typeof mods === "number") return mods;

    const modsMatched = mods.match(/.{1,2}/g);
    if (modsMatched == null) return undefined;
    let modsInt = 0;

    const values: Array<string> = Object.keys(modsKeys).map((a) => a);
    for (let i = 0; i < modsMatched.length; i++) {
        const find = values.find((v) => modsKeys[v].toLowerCase() === modsMatched[i].toLowerCase());
        if (typeof find !== "undefined")
            modsInt += parseInt(find);
    }

    return modsInt;
}

function name(mods: number): string {
    let enabled = [];
    let converted = "";

    const values = Object.keys(modsKeys).map((a) => Number(a));

    for (let i = values.length - 1; i >= 0; i--) {
        const v = values[i];
        if (mods >= v) {
            const mode = modsKeys[v];
            enabled.push({ i: modsOrder[mode.toLowerCase()], n: mode });
            mods -= v;
        }
    }

    enabled = enabled.sort((a, b) => (a.i > b.i ? 1 : b.i > a.i ? -1 : 0));
    for (let i = 0; i < enabled.length; i++) converted += enabled[i].n;

    // if (converted === '') return 'NM';
    return converted;
}

export const mods = { id, name };
