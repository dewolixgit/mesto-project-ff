export const CSS_CLASS = {
    popupVisible: 'popup_is-opened',
    popupContent: 'popup__content',
    popupCloseButton: 'popup__close',
    editProfileButton: 'profile__edit-button',
    editProfilePopup: 'popup_type_edit',
}

export const getClassSelector = (className) => `.${className}`;

export const getInputErrorSelector = ({ errorClass, inputName }) => {
    return `.${errorClass}._type_${inputName}`;
}
