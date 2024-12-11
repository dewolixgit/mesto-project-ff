import {CSS_CLASS, getClassSelector} from "./selector";

export const updateProfileSection = ({ name, about, avatar }) => {
    if (name) {
        document.querySelector(getClassSelector(CSS_CLASS.profileTitle)).textContent = name;
    }

    if (about) {
        document.querySelector(getClassSelector(CSS_CLASS.profileDescription)).textContent = about;
    }

    if (avatar) {
        document.querySelector(getClassSelector(CSS_CLASS.profileImage)).src = avatar;
    }
}
