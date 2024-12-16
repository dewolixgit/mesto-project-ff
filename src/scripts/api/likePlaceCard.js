import {request} from "./request";
import {ENDPOINTS} from "./config";

export const requestLikePlaceCard = async (id) => {
    try {
        return (await request({
            url: ENDPOINTS.likePlaceCard.url(id),
            method: ENDPOINTS.likePlaceCard.method,
        })).data ?? null;
    } catch {
        return null;
    }
}
