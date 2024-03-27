import type { Request } from "@type/enums";

const baseUrl = "https://api.gatari.pw";

export async function request(type: Request, endpoint: string, params: string | undefined): Promise<Response> {
    return fetch(`${baseUrl}/${type}/${endpoint}${params ? `?${params}` : ""}`);
}
