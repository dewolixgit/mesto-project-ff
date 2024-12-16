import {BASE_API_HEADERS, BASE_API_URL} from "./config";

export const request = async ({ url, method, data }) => {
    try {
        const response = await fetch(`${BASE_API_URL}${url}`, {
            method,
            headers: BASE_API_HEADERS,
            body: data ? JSON.stringify(data) : null,
        });

        if (!response.ok) {
            return Promise.reject({
                isError: true,
                data: null,
            });
        }

        const responseData = await response.json();

        return {
            isError: false,
            data: responseData,
        }
    } catch (error) {
        console.error(`Client error: ${error}`);

        return Promise.reject({
            isError: true,
            data: null,
        });
    }
};
