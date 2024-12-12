import {CSS_CLASS, getClassSelector} from "./selector";
import {addEventListener} from "./elements";

export const openModal = (modal) => {
    // Поскольку модальное окно никогда не display none, следует обработать через aria-hidden
    modal.ariaHidden = false;
    modal.classList.add(CSS_CLASS.popupVisible)
};

export const closeModal = (modal) => {
    // Поскольку модальное окно никогда не display none, следует обработать через aria-hidden
    modal.ariaHidden = true;
    modal.classList.remove(CSS_CLASS.popupVisible)
};

export const enableModalCloseHandler = ({ modal, onClose }) => {
    const content = modal.querySelector(getClassSelector(CSS_CLASS.popupContent));
    const closeElement = modal.querySelector(getClassSelector(CSS_CLASS.popupCloseButton));

    const removeClickListener = addEventListener(document, 'click', (event) => {
        if (event.target === closeElement || !content.contains(event.target)) {
            closeModal(modal);
            removeClickListener();
            onClose?.();
        }
    });

    const removeEscapeListener = addEventListener(document, 'keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal(modal);
            removeEscapeListener();
            onClose?.();
        }
    });

    return () => {
        removeClickListener();
        removeEscapeListener();
    };
};
