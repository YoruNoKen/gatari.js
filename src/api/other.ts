import { Request } from "@type/enums";
import { request } from "@utils/request";
import { errorHandler } from "@utils/errorHandler";
import type { OtherScores } from "@type/other/topScores";
import type { Mode } from "@type/enums";

async function topScores(mode: Mode, period: "all" | "month" | "week"): Promise<OtherScores> {
    const params = `mode=${mode}&period=${period}`;

    const response = await request(Request.TOP_SCORES, params);

    const error = errorHandler(response.status);
    if (error !== true)
        throw error;

    return response.json() as Promise<OtherScores>;
}

export default { topScores };
