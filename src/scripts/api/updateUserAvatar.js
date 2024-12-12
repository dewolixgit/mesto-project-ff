import {request} from "./request";
import {ENDPOINTS} from "./config";

export const requestUpdateUserAvatar = async (avatar) => (await request({
    url: ENDPOINTS.updateUserAvatar.url(),
    method: ENDPOINTS.updateUserAvatar.method,
    data: {
        avatar
    },
})).data;
