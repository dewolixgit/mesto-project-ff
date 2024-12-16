import {request} from "./request";
import {ENDPOINTS} from "./config";

export const requestDislikePlaceCard = async (id) => {
    try {
        return (await request({
            url: ENDPOINTS.dislikePlaceCard.url(id),
            method: ENDPOINTS.dislikePlaceCard.method,
        })).data ?? null;
    }
    catch {
        return null;
    }
};
