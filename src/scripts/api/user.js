import {ENDPOINTS} from "./config";
import {request} from "./request";

export const requestUser = async () => (await request({
    url: ENDPOINTS.user.url(),
    method: ENDPOINTS.user.method,
})).data ?? null;
