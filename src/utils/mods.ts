/* eslint-disable @typescript-eslint/naming-convention */
// This code was copy-pasted (with some adjustments) from https://github.com/cyperdark/osu-api-extended/blob/master/src/utility/mods.ts

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
