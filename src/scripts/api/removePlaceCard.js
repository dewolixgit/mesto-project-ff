import {request} from "./request";
import {ENDPOINTS} from "./config";

export const requestRemovePlaceCard = async (id) => {
    try {
        return await request({
            url: ENDPOINTS.removePlaceCard.url(id),
            method: ENDPOINTS.removePlaceCard.method,
        });
    } catch (error) {
        return error;
    }
};
