import {CSS_CLASS, getClassSelector} from "./selector";
import {enableModalCloseHandler, getCloseModalElement, openModal} from "./modal";
import {populatePopupFormOnlyInputs} from "./form";
import {clearModalFormValidation, enableModalFormValidation} from "./validation";

const NEW_PLACE_INPUT_NAME = {
    placeName: 'place-name',
    link: 'link',
};

/**
 * @param config.clickElementSelector - селектор элемента,
 * при клике на который нужно вызывать модалку создания карточки места
 */
export const enableOpenNewPlaceModalHandler = (config) => {
    const modal = document.querySelector(getClassSelector(CSS_CLASS.newPlacePopup));

    const onClick = () => {
        openModal(modal);

        populatePopupFormOnlyInputs({
            modal,
            data: {
                [NEW_PLACE_INPUT_NAME.placeName]: '',
                [NEW_PLACE_INPUT_NAME.link]: '',
            }
        });

        const removeFormListeners = enableModalFormValidation(CSS_CLASS.newPlacePopup);

        // Todo: Включить обработчики клика на "Сохранить"

        // Откладываем подписку на события, чтобы не было конфликтов с текущим обработчиком
        requestAnimationFrame(() => enableModalCloseHandler({
                modal,
                onClose: () => {
                    clearModalFormValidation(CSS_CLASS.newPlacePopup);
                    removeFormListeners();
                }
            })
        );
    };

    const clickElement = document.querySelector(config.clickElementSelector);

    clickElement.addEventListener('click', onClick);

    return () => clickElement.removeEventListener('click', onClick);
}
