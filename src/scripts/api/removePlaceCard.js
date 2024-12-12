import {request} from "./request";
import {ENDPOINTS} from "./config";

export const requestRemovePlaceCard = (id) => request({
    url: ENDPOINTS.removePlaceCard.url(id),
    method: ENDPOINTS.removePlaceCard.method,
});
