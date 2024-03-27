import type { Request } from "@type/enums";

const baseUrl = "https://api.gatari.pw";

export async function request(type: Request, endpoint?: string | number, params?: string): Promise<Response> {
    return fetch(`${baseUrl}/${type}${typeof endpoint !== "undefined" ? `/${endpoint}` : ""}${params ? `?${params}` : ""}`);
}
