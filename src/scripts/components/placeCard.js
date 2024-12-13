import {addEventListener, insertAndGetElement, copyTemplateById} from "../dom/elements";
import {CSS_CLASS, CSS_ID, getClassSelector} from "../dom/selector";
import {requestDislikePlaceCard, requestLikePlaceCard, requestRemovePlaceCard} from "../api";
import {normalizePlaceCard} from "../entities";
import {openPlaceCardImagePreviewModal} from "./imagePreviewModal";
import {copyByMutate} from "../utils/copyByMutate";

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

const enableCardHandlers = ({ cardElement, onLike, onDelete, onClickImage }) => {
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

    const removeClickImageListener = addEventListener(
        getImageElement(cardElement),
        'click',
        onClickImage
    );

    return () => {
        removeLikeButtonListener();
        removeDeleteButtonListeners();
        removeClickImageListener();
    }
};

const handleLikeCard = async ({ cardEntity, cardElement, userEntity }) => {
    if (cardEntity.isLiked) {
        const updatedApiCard = await requestDislikePlaceCard(cardEntity.id);

        if (updatedApiCard) {
            const updatedCardEntity = normalizePlaceCard({
                apiCard: updatedApiCard,
                userId: userEntity.id
            });

            getLikeButtonElement(cardElement).classList.remove(CSS_CLASS.cardLikeButtonActive);
            getLikesCountElement(cardElement).textContent =
                getLikesCountTextContent(updatedCardEntity.likesCount);

            copyByMutate({
                from: updatedCardEntity,
                to: cardEntity
            });
        }

        return;
    }

    const updatedApiCard = await requestLikePlaceCard(cardEntity.id);

    if (updatedApiCard) {
        const updatedCardEntity = normalizePlaceCard({
            apiCard: updatedApiCard,
            userId: userEntity.id
        });

        getLikeButtonElement(cardElement).classList.add(CSS_CLASS.cardLikeButtonActive);
        getLikesCountElement(cardElement).textContent =
            getLikesCountTextContent(updatedCardEntity.likesCount);

        copyByMutate({
            from: updatedCardEntity,
            to: cardEntity
        });
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

/**
 * @param cardEntity - объект места
 * @param userEntity - объект текущего пользователя
 * @param insertPosition - позиция вставки (append, prepend)
 */
export const initCardElement = ({ cardEntity, userEntity, insertPosition }) => {
    const cardFragment = createCardFragment(cardEntity);

    const cardElement = insertAndGetElement({
        element: cardFragment,
        parent: getPlacesListElement(),
        position: insertPosition,
    });

    const removeListeners = enableCardHandlers({
        cardElement,
        onLike: () => handleLikeCard({
            cardEntity,
            cardElement,
            userEntity
        }),
        onDelete: () => handleDeleteCard({
            cardEntity,
            cardElement,
            removeListeners
        }),
        onClickImage: () => openPlaceCardImagePreviewModal(cardEntity)
    });
};
