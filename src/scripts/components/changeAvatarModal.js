import {closeModal, enableModalCloseHandler, openModal} from "../dom/modal";
import {CSS_CLASS, getClassSelector} from "../dom/selector";
import {clearModalFormValidation, enableModalFormValidation} from "../utils/validation";
import {getPopupFormInputValues, populatePopupFormOnlyInputs} from "../dom/form";
import {TEXTS} from "../config/texts";
import {requestUpdateUserAvatar} from "../api";

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

        saveButton.textContent = TEXTS.editProfileSaveButtonLoading;

        const formValues = getPopupFormInputValues(modal);

        const response = await requestUpdateUserAvatar(
            formValues[CHANGE_AVATAR_INPUT_NAME.link]
        );

        saveButton.textContent = TEXTS.editProfileSaveButton;

        closeModal(modal);

        if (response.avatar) {
            onSuccessSave?.(response.avatar);
        }
    }

    saveButton.addEventListener('click', onClickSave);

    return () => {
        saveButton.removeEventListener('click', onClickSave)
    }
}

/**
 * @param clickElementSelector - селектор элемента, при клике на который нужно вызывать модалку редактирования профиля
 * @param userEntity - объект текущего пользователя
 * @param onSuccessSave - колбэк, который вызывается после успешного сохранения аватара
 */
export const enableOpenChangeAvatarModalHandler = ({ clickElementSelector, onSuccessSave, userEntity }) => {
    const modal = document.querySelector(getClassSelector(CSS_CLASS.changeAvatarPopup));

    const onClick = () => {
        openModal(modal);

        populatePopupFormOnlyInputs({
            modal,
            data: {
                [CHANGE_AVATAR_INPUT_NAME.link]: userEntity.avatar,
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
