import {ENDPOINTS} from "./config";
import {request} from "./request";

export const requestCards = async () => {
    try {
        return (await request({
            url: ENDPOINTS.cards.url(),
            method: ENDPOINTS.cards.method,
        })).data ?? []
    } catch {
        return null;
    }
};
