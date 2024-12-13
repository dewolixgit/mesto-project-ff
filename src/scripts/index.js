import '../pages/index.css';
import {enableOpenProfileEditModalHandler} from "./components/editProfileModal";
import {enableOpenChangeAvatarModalHandler} from "./components/changeAvatarModal";
import {enableOpenNewPlaceModalHandler} from "./components/newPlaceModal";
import {initCardElement} from "./components/placeCard";
import {updateProfileSection} from "./components/profileSection";
import {CSS_CLASS, getClassSelector} from "./dom/selector";
import {requestCards, requestUser} from "./api";
import {normalizePlaceCard, normalizeUser} from "./entities";
import {DOM_INSERT_POSITION} from "./dom/elements";

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
            onSuccessSave: (avatar) => {
                updateProfileSection({ avatar });
                userEntity.avatar = avatar;
            },
            userEntity
        });

        enableOpenProfileEditModalHandler({
            clickElementSelector: getClassSelector(CSS_CLASS.editProfileButton),
            onSuccessSave: (updatedData) => {
                updateProfileSection(updatedData);
                userEntity.name = updatedData.name;
                userEntity.about = updatedData.about;
            },
            userEntity
        });

        enableOpenNewPlaceModalHandler({
            userEntity,
            clickElementSelector: getClassSelector(CSS_CLASS.newPlaceButton),
            onSuccessSave: (cardEntity) => initCardElement({
                cardEntity,
                userEntity,
                insertPosition: DOM_INSERT_POSITION.prepend
            }),
        });
    }

    if (apiCards && userEntity) {
        apiCards.map((apiCard) => normalizePlaceCard({
                apiCard,
                userId: userEntity.id
            }))
            .forEach((cardEntity) => initCardElement({
                cardEntity,
                userEntity,
                insertPosition: DOM_INSERT_POSITION.append
            }));
    }
};

init();
