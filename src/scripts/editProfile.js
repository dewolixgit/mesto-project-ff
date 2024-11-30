import {enableModalCloseHandler, openModal} from "./modal";
import {CSS_CLASS, getClassSelector} from "./selector";
import {clearModalFormValidation, clearValidation, enableModalFormValidation, enableValidation} from "./validation";
import {populateForm, populatePopupFormOnlyInputs} from "./form";

/**
 * Атрибуты name инпутов формы редактирования профиля
 */
const EDIT_PROFILE_INPUT_NAME = {
    name: 'name',
    description: 'description',
};

/**
 * @param config.clickElementSelector - селектор элемента, при клике на который нужно вызывать модалку редактирования профиля
 */
export const enableOpenProfileEditModalHandler = (config) => {
    const clickElement = document.querySelector(config.clickElementSelector);
    const modal = document.querySelector(getClassSelector(CSS_CLASS.editProfilePopup));
    const closeElement = modal.querySelector(getClassSelector(CSS_CLASS.popupCloseButton));

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

        // Todo: Включить обработчики клика на "Сохранить"

        // Откладываем подписку на события, чтобы не было конфликтов с текущим обработчиком
        requestAnimationFrame(() => enableModalCloseHandler({
                modal,
                closeElement,
                onClose: () => {
                    clearModalFormValidation(CSS_CLASS.editProfilePopup);
                    removeFormListeners();
                }
            })
        );
    };

    clickElement.addEventListener('click', onClick);

    return () => clickElement.removeEventListener('click', onClick);
}
