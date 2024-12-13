export const normalizePlaceCard = ({ apiCard, userId } ) => ({
    id: apiCard._id,
    likesCount: apiCard.likes.length,
    name: apiCard.name,
    image: apiCard.link,
    isLiked: apiCard.likes.some(likedUser => likedUser._id === userId),
    isOwned: apiCard.owner._id === userId,
});
