import {CSS_CLASS, getClassSelector} from "./selector";

export const openModal = (modal) => modal.classList.add(CSS_CLASS.popupVisible);

export const closeModal = (modal) => modal.classList.remove(CSS_CLASS.popupVisible);

export const enableModalCloseHandler = ({ modal, closeElement, onClose }) => {
    const content = modal.querySelector(getClassSelector(CSS_CLASS.popupContent));

    const onClick = (event) => {
        if (event.target === closeElement || !content.contains(event.target)) {
            closeModal(modal);
            document.removeEventListener('click', onClick);
            onClose?.();
        }
    }

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
};

export const getCloseModalElement = (modal) =>
    modal.querySelector(getClassSelector(CSS_CLASS.popupCloseButton));
