import '../pages/index.css';
import {enableOpenProfileEditModalHandler} from "./profile";
import {CSS_CLASS, getClassSelector} from "./selector";
import {populateForm} from "./form";
import {enableValidation} from "./validation";

enableOpenProfileEditModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.editProfileButton),
    modalVisibleClass: CSS_CLASS.popupVisible,
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
