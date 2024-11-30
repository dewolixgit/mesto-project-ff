import {addEventListener, appendAndGetElement, copyTemplateById} from "./elements";
import {CSS_CLASS, CSS_ID, getClassSelector} from "./selector";

export const MOCK_CARDS = [
    {
        id: 1,
        likesCount: 10,
        name: 'Место 1',
        image: 'https://via.placeholder.com/300',
        likes: [1, 2],
    },
    {
        id: 2,
        likesCount: 20,
        name: 'Место 2',
        image: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
    },
    {
        id: 3,
        likesCount: 30,
        name: 'Место 3',
        image: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
    },
    {
        id: 4,
        likesCount: 40,
        name: 'Место 4',
        image: 'https://via.placeholder.com/300',
        likes: [1, 2],
    },
    {
        id: 5,
        likesCount: 50,
        name: 'Место 5',
        image: 'https://via.placeholder.com/300',
        likes: [1, 3],
    },
    {
        id: 6,
        likesCount: 60,
        name: 'Место 6',
        image: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
    },
    {
        id: 7,
        likesCount: 70,
        name: 'Место 7',
        image: 'https://via.placeholder.com/300',
        likes: [1, 3],
    },
    {
        id: 8,
        likesCount: 80,
        name: 'Место 8',
        image: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
    },
    {
        id: 9,
        likesCount: 90,
        name: 'Место 9',
        image: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
    },
    {
        id: 10,
        likesCount: 100,
        name: 'Место 10',
        image: 'https://via.placeholder.com/300',
        likes: [1, 2, 3],
    }
];

const getPlacesListElement = () => document.querySelector(getClassSelector(CSS_CLASS.placesList));
const getTitleElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardTitle));
const getImageElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardImage));
const getLikeButtonElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardLikeButton));
const getLikesCountElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardLikesCount));
const getDeleteButtonElement = (cardElement) => cardElement.querySelector(getClassSelector(CSS_CLASS.cardDeleteButton));

/**
 * @param config.id - id места
 * @param config.likesCount - количество лайков
 * @param config.name - заголовок, название места
 * @param config.image - ссылка на картинку
 * @param config.isLiked - лайкнута ли карточка
 *
 * @return {DocumentFragment} - облегченная объектная модель элемента, ещё не вставленного в DOM
 */
export const createCardFragment = (config) => {
    const cardFragment = copyTemplateById(CSS_ID.cardTemplate);

    getTitleElement(cardFragment).textContent = config.name;

    const image = getImageElement(cardFragment);
    image.src = config.image;
    image.alt = config.name;

    if (config.isLiked) {
        getLikeButtonElement(cardFragment).classList.add(CSS_CLASS.cardLikeButtonActive);
    }

    getLikesCountElement(cardFragment).textContent = config.likesCount;

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

const handleLikeCard = async ({ id, cardElement }) => {
    const likesCountElement = getLikesCountElement(cardElement);
    const likesCount = Number(likesCountElement.textContent);
    const isLiked = getLikeButtonElement(cardElement).classList.contains(CSS_CLASS.cardLikeButtonActive);

    if (isLiked) {
        console.log('dislike start', id);
        await (new Promise((resolve) => setTimeout(resolve, 1000)));
        getLikeButtonElement(cardElement).classList.remove(CSS_CLASS.cardLikeButtonActive);
        likesCountElement.textContent = likesCount - 1;
        console.log('dislike end', id);
        return;
    }

    console.log('like start', id);
    await (new Promise((resolve) => setTimeout(resolve, 1000)));
    getLikeButtonElement(cardElement).classList.add(CSS_CLASS.cardLikeButtonActive);
    likesCountElement.textContent = likesCount + 1;
    console.log('like end', id);
};

const handleDeleteCard = async ({
    id,
    cardElement,
    removeListeners
}) => {
    console.log('delete start', id);
    await (new Promise((resolve) => setTimeout(resolve, 1000)));
    cardElement.remove();
    removeListeners();
    console.log('delete end', id);
};

/**
 * @param userId - id пользователя
 * @param cardEntity - объект места
 * @param cardEntity.id - id места
 * @param cardEntity.likes - массив id пользователей, которые лайкнули место
 * @param cardEntity.name - заголовок, название места
 * @param cardEntity.image - ссылка на картинку
 */
const initCardElement = ({ userId, cardEntity }) => {
    const cardFragment = createCardFragment({
        id: cardEntity.id,
        likesCount: cardEntity.likes.length,
        name: cardEntity.name,
        image: cardEntity.image,
        isLiked: cardEntity.likes.some(likedUserId => likedUserId === userId),
    })

    const cardElement = appendAndGetElement({
        element: cardFragment,
        parent: getPlacesListElement()
    });

    const removeListeners = enableCardHandlers({
        cardElement,
        onLike: () => handleLikeCard({
            id: cardEntity.id,
            cardElement
        }),
        onDelete: () => handleDeleteCard({
            id: cardEntity.id,
            cardElement,
            removeListeners
        }),
    });
};

/**
 * @param userId - id пользователя
 * @param cardEntities[].id - id места
 * @param cardEntities[].likes - массив id пользователей, которые лайкнули место
 * @param cardEntities[].name - заголовок, название места
 * @param cardEntities[].image - ссылка на картинку
 */
export const initCardsElements = ({ userId, cardEntities }) => cardEntities.forEach(
    (cardEntity) => initCardElement({ cardEntity, userId })
);

