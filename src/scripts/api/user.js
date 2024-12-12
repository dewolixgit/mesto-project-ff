import {ENDPOINTS} from "./config";
import {request} from "./request";
import {normalizeUser} from "../entities";

export const requestUser = async () => (await request({
    url: ENDPOINTS.user.url(),
    method: ENDPOINTS.user.method,
})).data ?? null;
