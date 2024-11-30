import {enableModalCloseHandler, openModal} from "./modal";
import {CSS_CLASS, getClassSelector} from "./selector";
import {clearModalFormValidation, clearValidation, enableModalFormValidation, enableValidation} from "./validation";
import {populateForm, populatePopupFormOnlyInputs} from "./form";

/**
 * Атрибуты name инпутов формы редактирования профиля
 */
const CHANGE_AVATAR_INPUT_NAME = {
    link: 'link',
};

/**
 * @param config.clickElementSelector - селектор элемента, при клике на который нужно вызывать модалку редактирования профиля
 */
export const enableOpenChangeAvatarModalHandler = (config) => {
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

        // Todo: Включить обработчики клика на "Сохранить"

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

    const clickElement = document.querySelector(config.clickElementSelector);

    clickElement.addEventListener('click', onClick);

    return () => clickElement.removeEventListener('click', onClick);
}
