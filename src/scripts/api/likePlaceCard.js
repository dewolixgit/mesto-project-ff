import {request} from "./request";
import {ENDPOINTS} from "./config";

export const requestLikePlaceCard = async (id) => (await request({
    url: ENDPOINTS.likePlaceCard.url(id),
    method: ENDPOINTS.likePlaceCard.method,
})).data;
