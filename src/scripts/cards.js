import {addEventListener, appendAndGetElement, copyTemplateById} from "./elements";
import {CSS_CLASS, CSS_ID, getClassSelector} from "./selector";

export const MOCK_CARDS = [
    {
        _id: 1,
        name: 'Место 1',
        link: 'https://via.placeholder.com/300',
        likes: [1, 2],
        owner: {
            _id: 1,
        }
    },
    {
        _id: 2,
        name: 'Место 2',
        link: 'https://via.placeholder.com/300',
        likes: [],
        owner: {
            _id: 2,
        }
    },
    {
        _id: 3,
        name: 'Место 3',
        link: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
        owner: {
            _id: 3,
        }
    },
    {
        _id: 4,
        name: 'Место 4',
        link: 'https://via.placeholder.com/300',
        likes: [1, 2],
        owner: {
            _id: 1,
        }
    },
    {
        _id: 5,
        name: 'Место 5',
        link: 'https://via.placeholder.com/300',
        likes: [1, 3],
        owner: {
            _id: 2,
        }
    },
    {
        _id: 6,
        name: 'Место 6',
        link: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
        owner: {
            _id: 3,
        }
    },
    {
        _id: 7,
        name: 'Место 7',
        link: 'https://via.placeholder.com/300',
        likes: [1, 3],
        owner: {
            _id: 1,
        }
    },
    {
        _id: 8,
        name: 'Место 8',
        link: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
        owner: {
            _id: 2,
        }
    },
    {
        _id: 9,
        name: 'Место 9',
        link: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
        owner: {
            _id: 3,
        }
    },
    {
        _id: 10,
        name: 'Место 10',
        link: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
        owner: {
            _id: 1,
        }
    }
];

export const normalizeCard = ({ card: cardApi, userId }) => ({
    id: cardApi._id,
    likesCount: cardApi.likes.length,
    name: cardApi.name,
    image: cardApi.link,
    isLiked: cardApi.likes.some(likedUserId => likedUserId === userId),
    isOwned: cardApi.owner._id === userId,
});

const getPlacesListElement = () => document.querySelector(getClassSelector(CSS_CLASS.placesList));
const getTitleElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardTitle));
const getImageElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardImage));
const getLikeButtonElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardLikeButton));
const getLikesCountElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardLikesCount));
const getDeleteButtonElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardDeleteButton));

const getLikesCountTextContent = (likesCount) => likesCount > 0 ? likesCount : '';

/**
 * @param cardEntity - объект места
 *
 * @return {DocumentFragment} - облегченная объектная модель элемента, ещё не вставленного в DOM
 */
export const createCardFragment = (cardEntity) => {
    const cardFragment = copyTemplateById(CSS_ID.cardTemplate);

    getTitleElement(cardFragment).textContent = cardEntity.name;

    const image = getImageElement(cardFragment);
    image.src = cardEntity.image;
    image.alt = cardEntity.name;

    if (cardEntity.isLiked) {
        getLikeButtonElement(cardFragment).classList.add(CSS_CLASS.cardLikeButtonActive);
    }

    if (!cardEntity.isOwned) {
        getDeleteButtonElement(cardFragment).classList.add(CSS_CLASS.cardDeleteButtonHidden);
    }

    getLikesCountElement(cardFragment).textContent =
        getLikesCountTextContent(cardEntity.likesCount);

    return cardFragment;
}

const enableCardHandlers = ({ cardElement, onLike, onDelete }) => {
    const removeLikeButtonListener = addEventListener(
        getLikeButtonElement(cardElement),
        'click',
        onLike
    );

    const removeDeleteButtonListeners = addEventListener(
        getDeleteButtonElement(cardElement),
        'click',
        onDelete
    );

    return () => {
        removeLikeButtonListener();
        removeDeleteButtonListeners();
    }
};

const handleLikeCard = async ({ cardEntity, cardElement }) => {
    const likesCountElement = getLikesCountElement(cardElement);
    const likesCount = Number(likesCountElement.textContent);
    const isLiked = getLikeButtonElement(cardElement).classList.contains(CSS_CLASS.cardLikeButtonActive);

    if (isLiked) {
        console.log('dislike start', cardEntity.id);
        await (new Promise((resolve) => setTimeout(resolve, 1000)));
        getLikeButtonElement(cardElement).classList.remove(CSS_CLASS.cardLikeButtonActive);
        likesCountElement.textContent = getLikesCountTextContent(likesCount - 1);
        console.log('dislike end', cardEntity.id);
        return;
    }

    console.log('like start', cardEntity.id);
    await (new Promise((resolve) => setTimeout(resolve, 1000)));
    getLikeButtonElement(cardElement).classList.add(CSS_CLASS.cardLikeButtonActive);
    likesCountElement.textContent = getLikesCountTextContent(likesCount + 1);
    console.log('like end', cardEntity.id);
};

const handleDeleteCard = async ({
    cardEntity,
    cardElement,
    removeListeners
}) => {
    if (!cardEntity.isOwned) {
        return;
    }

    console.log('delete start', cardEntity.id);
    await (new Promise((resolve) => setTimeout(resolve, 1000)));
    cardElement.remove();
    removeListeners();
    console.log('delete end', cardEntity.id);
};

export const initCardElement = (cardEntity) => {
    const cardFragment = createCardFragment(cardEntity);

    const cardElement = appendAndGetElement({
        element: cardFragment,
        parent: getPlacesListElement()
    });

    const removeListeners = enableCardHandlers({
        cardElement,
        onLike: () => handleLikeCard({
            cardEntity,
            cardElement
        }),
        onDelete: () => handleDeleteCard({
            cardEntity,
            cardElement,
            removeListeners
        }),
    });
};

export const initCardsElements = ({ cardEntities }) => cardEntities.forEach(
    initCardElement
);
