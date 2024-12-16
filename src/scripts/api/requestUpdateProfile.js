import {request} from "./request";
import {ENDPOINTS} from "./config";

export const requestUpdateProfile = async (userData) => {
    try {
        return (await request({
            url: ENDPOINTS.updateProfile.url(),
            method: ENDPOINTS.updateProfile.method,
            data: {
                name: userData.name,
                about: userData.about,
            }
        })).data ?? null
    } catch {
        return null;
    }
};
