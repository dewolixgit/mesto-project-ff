import '../pages/index.css';
import {enableOpenProfileEditModalHandler} from "./components/editProfileModal";
import {enableOpenChangeAvatarModalHandler} from "./components/changeAvatarModal";
import {enableOpenNewPlaceModalHandler} from "./components/newPlaceModal";
import {initCardElement} from "./components/placeCard";
import {updateProfileSection} from "./components/profileSection";
import {CSS_CLASS, getClassSelector} from "./dom/selector";
import {requestCards, requestUser} from "./api";
import {normalizePlaceCard, normalizeUser} from "./entities";

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
