import '../pages/index.css';
import {enableOpenProfileEditModalHandler} from "./profile";
import {CSS_CLASS, getClassSelector} from "./selector";

enableOpenProfileEditModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.editProfileButton),
    modalSelector: getClassSelector(CSS_CLASS.editProfilePopup),
    modalCloseElementSelector: getClassSelector(CSS_CLASS.popupCloseButton),
    modalVisibleClass: CSS_CLASS.popupVisible
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
