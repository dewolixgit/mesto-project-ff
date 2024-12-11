import '../pages/index.css';
import {enableOpenProfileEditModalHandler} from "./editProfile";
import {CSS_CLASS, getClassSelector} from "./selector";
import {enableOpenNewPlaceModalHandler} from "./newPlace";
import {enableOpenChangeAvatarModalHandler} from "./changeAvatar";
import {initCardsElements, MOCK_CARDS} from "./cards";
import {updateProfileSection} from "./profile";

enableOpenProfileEditModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.editProfileButton),
    onSuccessSave: updateProfileSection,
});

enableOpenNewPlaceModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.newPlaceButton),
});

enableOpenChangeAvatarModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.changeAvatarButton),
})

initCardsElements({
    cardEntities: MOCK_CARDS,
    userId: 2,
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
