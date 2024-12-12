import { addEventListener, appendAndGetElement, copyTemplateById } from "./elements";
import { CSS_CLASS, CSS_ID, getClassSelector } from "./selector";
import { requestDislikePlaceCard, requestLikePlaceCard, requestRemovePlaceCard } from "./api";
import { getLikesCountApiPlaceCard } from "./entities";

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
    if (cardEntity.isLiked) {
        const updatedCard = await requestDislikePlaceCard(cardEntity.id);

        if (updatedCard) {
            getLikeButtonElement(cardElement).classList.remove(CSS_CLASS.cardLikeButtonActive);
            getLikesCountElement(cardElement).textContent =
                getLikesCountTextContent(getLikesCountApiPlaceCard(updatedCard));
        }

        return;
    }

    const updatedCard = await requestLikePlaceCard(cardEntity.id);

    if (updatedCard) {
        getLikeButtonElement(cardElement).classList.add(CSS_CLASS.cardLikeButtonActive);
        getLikesCountElement(cardElement).textContent =
            getLikesCountTextContent(getLikesCountApiPlaceCard(updatedCard));
    }
};

const handleDeleteCard = async ({
    cardEntity,
    cardElement,
    removeListeners
}) => {
    if (!cardEntity.isOwned) {
        return;
    }

    const removeResponse = await requestRemovePlaceCard(cardEntity.id);

    if (!removeResponse.isError) {
        cardElement.remove();
        removeListeners();
    }
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
