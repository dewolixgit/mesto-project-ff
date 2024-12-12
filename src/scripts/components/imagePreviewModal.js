import {enableModalCloseHandler, openModal} from "../dom/modal";
import {CSS_CLASS, getClassSelector} from "../dom/selector";

const openImagePreviewModal = ({ imageSrc, caption }) => {
    const modal = document.querySelector(getClassSelector(CSS_CLASS.imagePreviewPopup));
    const imageElement = modal.querySelector(getClassSelector(CSS_CLASS.popupImage));
    const captionElement = modal.querySelector(getClassSelector(CSS_CLASS.popupCaption));

    imageElement.src = imageSrc;
    captionElement.textContent = caption;

    openModal(modal);

    // Откладываем подписку на события, чтобы не было конфликтов с текущим обработчиком
    requestAnimationFrame(() => enableModalCloseHandler({
        modal,
        onClose: () => {
            imageElement.src = '';
            captionElement.textContent = '';
        }
    }));
}

export const openPlaceCardImagePreviewModal = (cardEntity) => openImagePreviewModal({
    caption: cardEntity.name,
    imageSrc: cardEntity.image,
});
