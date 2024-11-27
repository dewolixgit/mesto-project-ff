import { getInputErrorSelector } from "./selector";
import {DATA_ATTRIBUTE_KEY} from "./dataAttribute";
import {addEventListenerElements, removeEventListenerElements} from "./utils";

const getValidationMessage = (input) => {
    if (
        input.validity.patternMismatch
        && input.dataset[DATA_ATTRIBUTE_KEY.patternErrorMessage]
    ) {
        return input.dataset[DATA_ATTRIBUTE_KEY.patternErrorMessage];
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
 * @param config.visibleErrorClass - класс элемента с ошибкой.
 * Этот класс будет присвоен элементу с ошибкой при невалидности конкретного инпута
 */
export const enableValidation = (config) => {
    const form = document.querySelector(config.formSelector);
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    const getErrorElement = (input) => form.querySelector(
        getInputErrorSelector({
            errorClass: config.errorClass,
            inputName: input.name
        })
    );

    const showInputError = (input) => {
        input.classList.add(config.inputErrorClass);

        const error = getErrorElement(input)
        error.textContent = getValidationMessage(input);
        error.classList.add(config.visibleErrorClass);
    };

    const hideInputError = (input) => {
        input.classList.remove(config.inputErrorClass);

        const error = getErrorElement(input);
        error.textContent = '';
        error.classList.remove(config.visibleErrorClass);
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
            submitButton.removeAttribute('disabled');
            submitButton.classList.remove(config.inactiveButtonClass);
        } else {
            submitButton.setAttribute('disabled', true);
            submitButton.classList.add(config.inactiveButtonClass);
        }
    };

    const onInput = (input) => {
        checkInputValidity(input);
        handleButtonState();
    }

    handleButtonState();
    addEventListenerElements(inputs, 'input', onInput);

    return () => removeEventListenerElements(inputs, 'input', onInput);
}
