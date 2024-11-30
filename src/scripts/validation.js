import {CSS_CLASS, getClassInClassSelector, getClassSelector, getInputErrorSelector} from "./selector";
import {DATA_ATTRIBUTE_KEY} from "./dataAttribute";
import {addEventListenerElements, removeEventListenerElements} from "./utils";

/**
 * @param config.formSelector - селектор формы
 * @param config.inputSelector - селектор инпута.
 * @param config.submitButtonSelector - селектор кнопки отправки формы.
 */
const getFormElements = (config) => {
    const form = document.querySelector(config.formSelector);

    return {
        form,
        inputs: Array.from(form.querySelectorAll(config.inputSelector)),
        submitButton: form.querySelector(config.submitButtonSelector),
    }
};

const showInputErrorElement = ({
   form,
   input,
   errorClass,
   visibleErrorClass,
   getValidationMessage
}) => {
    const errorElement = form.querySelector(
        getInputErrorSelector({
            errorClass,
            inputName: input.name
        })
    );

    if (errorElement) {
        errorElement.textContent = getValidationMessage(input);
        errorElement.classList.add(visibleErrorClass);
    }
}

const hideInputErrorElement = ({
    form,
    input,
    errorClass,
    visibleErrorClass
}) => {
    const errorElement = form.querySelector(
        getInputErrorSelector({
            errorClass,
            inputName: input.name
        })
    );

    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(visibleErrorClass);
    }
}

const disableButton = ({ button, disabledClass }) => {
    button.setAttribute('disabled', true);
    button.classList.add(disabledClass);
};

const enableButton = ({ button, disabledClass }) => {
    button.removeAttribute('disabled');
    button.classList.remove(disabledClass);
}

const getValidationMessage = (input) => {
    console.log('getValidationMessage dataset', input.dataset[DATA_ATTRIBUTE_KEY.patternErrorMessage]);
    console.log('getValidationMessage validationMessage', input.validationMessage);

    if (
        input.validity.patternMismatch
    ) {
        return input.dataset[DATA_ATTRIBUTE_KEY.patternErrorMessage] ? input.dataset[DATA_ATTRIBUTE_KEY.patternErrorMessage] : input.validationMessage;
    }

    return input.validationMessage;
}

/**
 * @param config.formSelector - селектор формы
 * @param config.inputSelector - селектор инпута.
 * Ко всем инпутам по селектору будут применены настройки валидации
 * @param config.submitButtonSelector - селектор кнопки отправки формы
 * @param config.inactiveButtonClass - класс кнопки в неактивном состоянии.
 * Этот класс будет присвоен кнопке при невалидности формы
 * @param config.inputErrorClass - класс инпута с ошибкой.
 * Этот класс будет присвоен конкретному инпуту при невалидности формы
 * @param config.errorClass - класс элемента с ошибкой.
 * @param config.visibleErrorClass - класс элемента с ошибкой в видимом состоянии.
 * Этот класс будет присвоен элементу с ошибкой при невалидности конкретного инпута
 */
export const enableValidation = (config) => {
    const { form, inputs, submitButton } = getFormElements({
        formSelector: config.formSelector,
        inputSelector: config.inputSelector,
        submitButtonSelector: config.submitButtonSelector
    });

    const showInputError = (input) => {
        input.classList.add(config.inputErrorClass);

        showInputErrorElement({
            form,
            input,
            errorClass: config.errorClass,
            visibleErrorClass: config.visibleErrorClass,
            getValidationMessage
        });
    };

    const hideInputError = (input) => {
        input.classList.remove(config.inputErrorClass);

        hideInputErrorElement({
            form,
            input,
            errorClass: config.errorClass,
            visibleErrorClass: config.visibleErrorClass
        });
    };

    const checkInputValidity = (input) => {
        if (input.validity.valid) {
            hideInputError(input);
        } else {
            showInputError(input);
        }
    };

    const handleButtonState = () => {
        if (inputs.every(input => input.validity.valid)) {
            enableButton({
                button: submitButton,
                disabledClass: config.inactiveButtonClass
            });
        } else {
            disableButton({
                button: submitButton,
                disabledClass: config.inactiveButtonClass
            });
        }
    };

    const onInput = (event) => {
        checkInputValidity(event.target);
        handleButtonState();
    }

    handleButtonState();
    addEventListenerElements(inputs, 'input', onInput);

    return () => removeEventListenerElements(inputs, 'input', onInput);
}

/**
 * Включить валидацию формы в модальном окне
 * @param popupClass - класс модального окна
 */
export const enableModalFormValidation = (popupClass) => enableValidation({
    formSelector: getClassInClassSelector(popupClass, CSS_CLASS.popupForm),
    inputSelector: getClassSelector(CSS_CLASS.popupInput),
    submitButtonSelector: getClassSelector(CSS_CLASS.popupButton),
    inactiveButtonClass: CSS_CLASS.popupButtonDisabled,
    inputErrorClass: CSS_CLASS.popupInputError,
    errorClass: CSS_CLASS.popupErrorMessage,
    visibleErrorClass: CSS_CLASS.popupErrorMessageVisible
})

/**
 * @param config.formSelector - селектор формы
 * @param config.inputSelector - селектор инпутов в форме.
 * @param config.submitButtonSelector - селектор кнопки отправки формы.
 * @param config.inactiveButtonClass - класс кнопки в неактивном состоянии.
 * @param config.inputErrorClass - класс инпута с ошибкой.
 * @param config.errorClass - класс элемента с ошибкой.
 * @param config.visibleErrorClass - класс элемента с ошибкой в видимом состоянии.
 */
export const clearValidation = (config) => {
    const { form, inputs, submitButton } = getFormElements({
        formSelector: config.formSelector,
        inputSelector: config.inputSelector,
        submitButtonSelector: config.submitButtonSelector
    });

    const hideInputError = (input) => {
        input.classList.remove(config.inputErrorClass);

        hideInputErrorElement({
            form,
            input,
            errorClass: config.errorClass,
            visibleErrorClass: config.visibleErrorClass
        });
    };

    inputs.forEach(hideInputError);

    disableButton({
        button: submitButton,
        disabledClass: config.inactiveButtonClass
    });
};

export const clearModalFormValidation = (popupClass) => clearValidation({
    formSelector: getClassInClassSelector(popupClass, CSS_CLASS.popupForm),
    inputSelector: getClassSelector(CSS_CLASS.popupInput),
    submitButtonSelector: getClassSelector(CSS_CLASS.popupButton),
    inactiveButtonClass: CSS_CLASS.popupButtonDisabled,
    inputErrorClass: CSS_CLASS.popupInputError,
    errorClass: CSS_CLASS.popupErrorMessage,
    visibleErrorClass: CSS_CLASS.popupErrorMessageVisible
});
