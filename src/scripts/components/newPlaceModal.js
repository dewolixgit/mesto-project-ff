import {CSS_CLASS, getClassSelector} from "../dom/selector";
import {closeModal, enableModalCloseHandler, openModal} from "../dom/modal";
import {getPopupFormInputValues, populatePopupFormOnlyInputs} from "../dom/form";
import {clearModalFormValidation, enableModalFormValidation} from "../utils/validation";
import {TEXTS} from "../config/texts";
import {normalizePlaceCard} from "../entities";
import {requestCreatePlaceCard} from "../api";

const NEW_PLACE_INPUT_NAME = {
    placeName: 'place-name',
    link: 'link',
};

const enableCreateNewPlaceHandlers = ({ modal, onSuccessSave, userEntity }) => {
    const saveButton = modal.querySelector(getClassSelector(CSS_CLASS.popupButton));

    const onClickSave = async (event) => {
        event.preventDefault();

        saveButton.textContent = TEXTS.newPlaceSaveButtonLoading;

        const formValues = getPopupFormInputValues(modal)

        const newApiCard = await requestCreatePlaceCard({
            name: formValues[NEW_PLACE_INPUT_NAME.placeName],
            link: formValues[NEW_PLACE_INPUT_NAME.link],
        });

        saveButton.textContent = TEXTS.newPlaceSaveButton;

        onSuccessSave?.(normalizePlaceCard({ apiCard: newApiCard, userId: userEntity.id }));

        closeModal(modal);
    }

    saveButton.addEventListener('click', onClickSave);

    return () => {
        saveButton.removeEventListener('click', onClickSave);
    }
}

/**
 * @param clickElementSelector - селектор элемента,
 * при клике на который нужно вызывать модалку создания карточки места
 * @param onSuccessSave - колбэк, который вызывается после успешного сохранения данных
 * @param userEntity - сущность текущего пользователя
 */
export const enableOpenNewPlaceModalHandler = ({ clickElementSelector, onSuccessSave, userEntity }) => {
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

        enableCreateNewPlaceHandlers({
            modal,
            onSuccessSave,
            userEntity,
        });

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

    const clickElement = document.querySelector(clickElementSelector);

    clickElement.addEventListener('click', onClick);

    return () => clickElement.removeEventListener('click', onClick);
}
