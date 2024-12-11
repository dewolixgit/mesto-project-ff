import {CSS_CLASS, getClassSelector} from "./selector";
import {closeModal, enableModalCloseHandler, openModal} from "./modal";
import {populatePopupFormOnlyInputs} from "./form";
import {clearModalFormValidation, enableModalFormValidation} from "./validation";
import {TEXTS} from "./texts";
import {normalizeCard} from "./cards";

const NEW_PLACE_INPUT_NAME = {
    placeName: 'place-name',
    link: 'link',
};

const enableCreateNewPlaceHandlers = ({ modal, onSuccessSave, userId }) => {
    const saveButton = modal.querySelector(getClassSelector(CSS_CLASS.popupButton));

    const onClickSave = async (event) => {
        event.preventDefault();

        saveButton.textContent = TEXTS.newPlaceSaveButtonLoading;

        await (new Promise((r) => setTimeout(r, 2000)));

        saveButton.textContent = TEXTS.newPlaceSaveButton;

        // Todo: Нормализация в реквесте
        onSuccessSave?.(normalizeCard({
            userId,
            card: {
                _id: 111,
                name: 'Место 111',
                link: 'https://via.placeholder.com/300',
                likes: [],
                owner: {
                    _id: userId,
                }
            }
        }));

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
 * @param userId - id текущего пользователя
 */
export const enableOpenNewPlaceModalHandler = ({ clickElementSelector, onSuccessSave, userId }) => {
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
            userId,
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

    console.log('clickElementSelector', clickElementSelector);

    const clickElement = document.querySelector(clickElementSelector);

    clickElement.addEventListener('click', onClick);

    return () => clickElement.removeEventListener('click', onClick);
}
