import {CSS_CLASS, getClassSelector} from "./selector";

/**
 * Заполняет форму данными
 *
 * @param form - HTML-элемент формы
 * @param data - маппинг данных формы: ключ — name input'а, значение — значение input'а
 * @param inputClass - класс инпута
 */
export const populateForm = ({ form, data, inputClass }) => {
    for (const key in data) {
        const input = form.querySelector(`${getClassSelector(inputClass)}[name="${key}"]`);

        if (input) {
            input.value = data[key];
        }
    }
}

export const populatePopupFormOnlyInputs = ({ modal, data }) => populateForm({
    form: modal.querySelector(getClassSelector(CSS_CLASS.popupForm)),
    inputClass: CSS_CLASS.popupInput,
    data,
})
