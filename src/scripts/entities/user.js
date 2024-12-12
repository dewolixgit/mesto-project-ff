export const normalizeUser = (userApi) => ({
    id: userApi._id,
    name: userApi.name,
    about: userApi.about,
    avatar: userApi.avatar,
});
