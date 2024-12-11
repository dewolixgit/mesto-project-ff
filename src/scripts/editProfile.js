import {closeModal, enableModalCloseHandler, openModal} from "./modal";
import {CSS_CLASS, getClassSelector} from "./selector";
import {clearModalFormValidation, clearValidation, enableModalFormValidation, enableValidation} from "./validation";
import {populateForm, populatePopupFormOnlyInputs} from "./form";
import {TEXTS} from "./texts";

/**
 * Атрибуты name инпутов формы редактирования профиля
 */
const EDIT_PROFILE_INPUT_NAME = {
    name: 'name',
    description: 'description',
};

const enableSaveButtonHandlers = ({ modal, onSuccessSave }) => {
    const saveButton = modal.querySelector(getClassSelector(CSS_CLASS.popupButton));

    const onClickSave = async (event) => {
        event.preventDefault();

        console.log('start save');

        saveButton.textContent = TEXTS.editProfileSaveButtonLoading;

        await (new Promise((r) => setTimeout(r, 2000)));

        saveButton.textContent = TEXTS.editProfileSaveButton;

        closeModal(modal);

        onSuccessSave?.({
            name: 'name',
            about: 'about'
        });
    }

    saveButton.addEventListener('click', onClickSave);

    return () => {
        saveButton.removeEventListener('click', onClickSave)
    }
}

/**
 * @param clickElementSelector - селектор элемента, при клике на который нужно вызывать модалку редактирования профиля
 * @param onSuccessSave - колбэк, который вызывается после успешного сохранения данных
 */
export const enableOpenProfileEditModalHandler = ({ clickElementSelector, onSuccessSave }) => {
    const clickElement = document.querySelector(clickElementSelector);
    const modal = document.querySelector(getClassSelector(CSS_CLASS.editProfilePopup));

    const onClick = () => {
        openModal(modal);

        populatePopupFormOnlyInputs({
            modal,
            data: {
                [EDIT_PROFILE_INPUT_NAME.name]: '',
                [EDIT_PROFILE_INPUT_NAME.description]: '',
            }
        });

        const removeFormListeners = enableModalFormValidation(CSS_CLASS.editProfilePopup);

        const removeSaveButtonHandlers = enableSaveButtonHandlers({ modal, onSuccessSave });

        // Откладываем подписку на события, чтобы не было конфликтов с текущим обработчиком
        requestAnimationFrame(() => enableModalCloseHandler({
                modal,
                onClose: () => {
                    clearModalFormValidation(CSS_CLASS.editProfilePopup);
                    removeFormListeners();
                    removeSaveButtonHandlers();
                }
            })
        );
    };

    clickElement.addEventListener('click', onClick);

    return () => clickElement.removeEventListener('click', onClick);
}
