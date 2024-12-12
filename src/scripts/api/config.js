export const BASE_API_URL = 'https://mesto.nomoreparties.co/v1/cohort-mag-4';

export const API_TOKEN = 'e8d08beb-3877-4682-a1fb-6cffcae985bf';

export const BASE_API_HEADERS = {
    Authorization: API_TOKEN,
    'Content-Type': 'application/json'
}

export const ENDPOINTS = {
    cards: {
        url: () => '/cards',
        method: 'GET',
    },
    createPlaceCard: {
        url: () => '/cards',
        method: 'POST',
    },
    removePlaceCard: {
        url: (id) => `/cards/${id}`,
        method: 'DELETE',
    },
    likePlaceCard: {
        url: (id) => `/cards/likes/${id}`,
        method: 'PUT',
    },
    dislikePlaceCard: {
        url: (id) => `/cards/likes/${id}`,
        method: 'DELETE',
    },
    user: {
        url: () => '/users/me',
        method: 'GET',
    },
    updateProfile: {
        url: () => '/users/me',
        method: 'PATCH',
    },
    updateUserAvatar: {
        url: () => '/users/me/avatar',
        method: 'PATCH',
    }
}
