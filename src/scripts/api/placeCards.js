import {ENDPOINTS} from "./config";
import {request} from "./request";

export const requestCards = async () => (await request({
    url: ENDPOINTS.cards.url(),
    method: ENDPOINTS.cards.method,
})).data ?? [];
