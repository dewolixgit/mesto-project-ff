import '../pages/index.css';
import {enableOpenProfileEditModalHandler} from "./editProfile";
import {CSS_CLASS, getClassSelector} from "./selector";
import {populateForm} from "./form";
import {enableValidation} from "./validation";
import {enableOpenNewPlaceModalHandler} from "./newPlace";
import {enableOpenChangeAvatarModalHandler} from "./changeAvatar";

enableOpenProfileEditModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.editProfileButton),
});

enableOpenNewPlaceModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.newPlaceButton),
});

enableOpenChangeAvatarModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.changeAvatarButton),
})

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
