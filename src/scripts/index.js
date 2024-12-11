import '../pages/index.css';
import {enableOpenProfileEditModalHandler} from "./editProfile";
import {CSS_CLASS, getClassSelector} from "./selector";
import {enableOpenNewPlaceModalHandler} from "./newPlace";
import {enableOpenChangeAvatarModalHandler} from "./changeAvatar";
import {initCardElement, initCardsElements, MOCK_CARDS, normalizeCard} from "./cards";
import {updateProfileSection} from "./profile";

enableOpenProfileEditModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.editProfileButton),
    onSuccessSave: updateProfileSection,
});

enableOpenNewPlaceModalHandler({
    userId: 2,
    clickElementSelector: getClassSelector(CSS_CLASS.newPlaceButton),
    onSuccessSave: initCardElement,
});

enableOpenChangeAvatarModalHandler({
    clickElementSelector: getClassSelector(CSS_CLASS.changeAvatarButton),
})

initCardsElements({
    cardEntities: MOCK_CARDS.map(
        (apiCard) => normalizeCard({ userId: 2, card: apiCard })
    ),
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
