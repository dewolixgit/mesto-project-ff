import '../pages/index.css';
import {enableOpenProfileEditModalHandler} from "./editProfile";
import {CSS_CLASS, getClassSelector} from "./selector";
import {enableOpenNewPlaceModalHandler} from "./newPlace";
import {enableOpenChangeAvatarModalHandler} from "./changeAvatar";
import {initCardElement} from "./cards";
import {updateProfileSection} from "./profile";
import {requestCards, requestUser} from "./api";
import {normalizePlaceCard, normalizeUser, populatePlaceCardByUserData} from "./entities";

const init = async () => {
    const [apiUser, apiCards] = await Promise.all([
        requestUser(),
        requestCards()
    ]);

    const userEntity = apiUser ? normalizeUser(apiUser) : null;

    if (userEntity) {
        updateProfileSection(userEntity);

        enableOpenChangeAvatarModalHandler({
            clickElementSelector: getClassSelector(CSS_CLASS.changeAvatarButton),
            onSuccessSave: (avatar) => updateProfileSection({ avatar }),
            userEntity
        });

        enableOpenProfileEditModalHandler({
            clickElementSelector: getClassSelector(CSS_CLASS.editProfileButton),
            onSuccessSave: updateProfileSection,
            userEntity
        });

        enableOpenNewPlaceModalHandler({
            userEntity,
            clickElementSelector: getClassSelector(CSS_CLASS.newPlaceButton),
            onSuccessSave: initCardElement,
        });
    }

    if (apiCards && userEntity) {
        apiCards.map((apiCard) => normalizePlaceCard({
                apiCard,
                userId: userEntity.id
            }))
            .forEach(initCardElement);
    }
};

init();

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
