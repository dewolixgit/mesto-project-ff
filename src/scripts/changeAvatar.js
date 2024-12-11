import {closeModal, enableModalCloseHandler, openModal} from "./modal";
import {CSS_CLASS, getClassSelector} from "./selector";
import {clearModalFormValidation, clearValidation, enableModalFormValidation, enableValidation} from "./validation";
import {populateForm, populatePopupFormOnlyInputs} from "./form";
import {TEXTS} from "./texts";

/**
 * Атрибуты name инпутов формы редактирования профиля
 */
const CHANGE_AVATAR_INPUT_NAME = {
    link: 'link',
};

const enableSaveButtonHandler = ({ modal, onSuccessSave }) => {
    const saveButton = modal.querySelector(getClassSelector(CSS_CLASS.popupButton));

    const onClickSave = async (event) => {
        event.preventDefault();

        console.log('start save');

        saveButton.textContent = TEXTS.editProfileSaveButtonLoading;

        await (new Promise((r) => setTimeout(r, 2000)));

        saveButton.textContent = TEXTS.editProfileSaveButton;

        closeModal(modal);

        onSuccessSave?.('https://via.placeholder.com/150');
    }

    saveButton.addEventListener('click', onClickSave);

    return () => {
        saveButton.removeEventListener('click', onClickSave)
    }
}

/**
 * @param clickElementSelector - селектор элемента, при клике на который нужно вызывать модалку редактирования профиля
 * @param onSuccessSave - колбэк, который вызывается после успешного сохранения аватара
 */
export const enableOpenChangeAvatarModalHandler = ({ clickElementSelector, onSuccessSave }) => {
    const modal = document.querySelector(getClassSelector(CSS_CLASS.changeAvatarPopup));

    const onClick = () => {
        openModal(modal);

        populatePopupFormOnlyInputs({
            modal,
            data: {
                [CHANGE_AVATAR_INPUT_NAME.link]: '',
            }
        });

        const removeFormListeners = enableModalFormValidation(CSS_CLASS.changeAvatarPopup);

        enableSaveButtonHandler({
            modal,
            onSuccessSave
        })

        // Откладываем подписку на события, чтобы не было конфликтов с текущим обработчиком
        requestAnimationFrame(() => enableModalCloseHandler({
                modal,
                onClose: () => {
                    clearModalFormValidation(CSS_CLASS.changeAvatarPopup);
                    removeFormListeners();
                }
            })
        );
    };

    const clickElement = document.querySelector(clickElementSelector);

    clickElement.addEventListener('click', onClick);

    return () => clickElement.removeEventListener('click', onClick);
}
