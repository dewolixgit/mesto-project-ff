import {request} from "./request";
import {ENDPOINTS} from "./config";

export const requestDislikePlaceCard = async (id) => (await request({
    url: ENDPOINTS.dislikePlaceCard.url(id),
    method: ENDPOINTS.dislikePlaceCard.method,
})).data;
