import { Mode, Grades } from "@type/enums";

function calculatePercentage(hits: number, objects: number): number {
    return hits / objects * 100;
}

function accuracy(mode: Mode, { n300, n100, n50, nMiss, nGeki, nKatu }: { n300: number, n100?: number, n50?: number, nMiss?: number, nGeki?: number, nKatu?: number }): number {
    n100 = Number(n100) || 0;
    n50 = Number(n50) || 0;
    nMiss = Number(nMiss) || 0;
    nGeki = Number(nGeki) || 0;
    nKatu = Number(nKatu) || 0;

    switch (mode) {
        case Mode.TAIKO:
            return 100 * (n300 + 0.5 * n100) / (n300 + n100 + nMiss);
        case Mode.MANIA:
            return 100 * (300 * (nGeki + n300) + 200 * nKatu + 100 * n100 + 50 * n50) / (300 * (nGeki + n300 + n100 + n50 + nMiss));
        case Mode.FRUITS:
            return 100 * (n300 + n100 + n50) / (n300 + n100 + n50 + nKatu + nMiss);
        default:
            return 100 * (300 * n300 + 100 * n100 + 50 * n50) / (300 * (n300 + n100 + n50 + nMiss));
    }
}

function grade(mode: Mode, mods: Array<string>, { n300, n100, n50, nMiss, nGeki, nKatu }: { n300: number, n100?: number, n50?: number, nMiss?: number, nGeki?: number, nKatu?: number }): Grades {
    let hasHidden = false;
    let hasFlashlight = false;

    // I could also use `.toUpperCase()` method here, but just doing this is faster.
    for (let i = 0; i < mods.length; i++) {
        const mod = mods[i];
        if (mod === "HD" || mod === "Hd" || mod === "hD" || mod === "hd") {
            hasHidden = true;
            continue;
        }

        if (mod === "FL" || mod === "Fl" || mod === "fL" || mod === "fl") {
            hasFlashlight = true;
            continue;
        }
    }

    n300 = Number(n300) || 0;
    n100 = Number(n100) || 0;
    n50 = Number(n50) || 0;
    nMiss = Number(nMiss) || 0;
    nGeki = Number(nGeki) || 0;
    nKatu = Number(nKatu) || 0;

    if (mode === Mode.OSU) {
        const totalObj = n300 + n100 + n50 + nMiss;

        const percentOf300 = calculatePercentage(n300, totalObj);
        const percentOf50 = calculatePercentage(n50, totalObj);

        switch (true) {
            case percentOf300 === 100 && !hasHidden && !hasFlashlight:
                return Grades.X;
            case percentOf300 > 90 && !hasHidden && !hasFlashlight:
                return nMiss >= 1 || percentOf50 > 1 ? Grades.A : Grades.S;
            case percentOf300 === 100 && (hasHidden || hasFlashlight):
                return Grades.XH;
            case percentOf300 > 90 && (hasHidden || hasFlashlight):
                return nMiss > 0 || percentOf50 > 1 ? Grades.A : Grades.SH;
            case percentOf300 > 80:
                return nMiss > 0 ? Grades.B : Grades.A;
            case percentOf300 > 70:
                return nMiss > 0 ? Grades.C : Grades.B;
            case percentOf300 > 60:
                return nMiss > 0 ? Grades.D : Grades.C;
            default:
                return Grades.D;
        }
    }

    if (mode === Mode.TAIKO) {
        const totalObj = n300 + n100 + nMiss;
        const percent = calculatePercentage(n300, totalObj);

        switch (true) {
            case percent === 100 && !hasHidden && !hasFlashlight:
                return Grades.X;
            case percent > 90 && !hasHidden && !hasFlashlight:
                return nMiss >= 1 ? Grades.A : Grades.S;
            case percent === 100 && hasHidden && hasFlashlight:
                return Grades.XH;
            case percent > 90 && hasHidden && hasFlashlight:
                return nMiss >= 1 ? Grades.A : Grades.SH;
            case percent > 80:
                return nMiss >= 1 ? Grades.B : Grades.A;
            case percent > 70:
                return nMiss >= 1 ? Grades.C : Grades.B;
            case percent > 60:
                return nMiss >= 1 ? Grades.D : Grades.C;
            default:
                return Grades.D;
        }
    }

    if (mode === Mode.MANIA) {
        const acc = accuracy(mode, {
            n300,
            n100,
            n50,
            nMiss,
            nGeki,
            nKatu
        });

        switch (true) {
            case acc === 100 && !hasHidden && !hasFlashlight:
                return Grades.X;
            case acc > 95 && !hasHidden && !hasFlashlight:
                return Grades.S;
            case acc === 100 && hasHidden && hasFlashlight:
                return Grades.XH;
            case acc > 95 && hasHidden && hasFlashlight:
                return Grades.SH;
            case acc > 90:
                return Grades.A;
            case acc > 80:
                return Grades.B;
            case acc > 70:
                return Grades.C;
            default:
                return Grades.D;
        }
    }

    // if nothing matches, it's fruits.
    const acc = accuracy(mode, {
        n300,
        n100,
        n50,
        nMiss,
        nGeki,
        nKatu
    });

    switch (true) {
        case acc === 100 && !hasHidden && !hasFlashlight:
            return Grades.X;
        case acc >= 98.01 && !hasHidden && !hasFlashlight:
            return Grades.S;
        case acc === 100 && hasHidden && hasFlashlight:
            return Grades.XH;
        case acc >= 98.01 && hasHidden && hasFlashlight:
            return Grades.SH;
        case acc >= 94.01:
            return Grades.A;
        case acc >= 90.01:
            return Grades.B;
        case acc >= 85.01:
            return Grades.C;
        default:
            return Grades.D;
    }
}

export const tools = { accuracy, grade };

