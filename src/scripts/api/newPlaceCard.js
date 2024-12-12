import {request} from "./request";
import {ENDPOINTS} from "./config";

export const requestCreatePlaceCard = async (placeCardData) => (await request({
    url: ENDPOINTS.createPlaceCard.url(),
    method: ENDPOINTS.createPlaceCard.method,
    data: {
        name: placeCardData.name,
        link: placeCardData.link,
    }
})).data ?? null;
