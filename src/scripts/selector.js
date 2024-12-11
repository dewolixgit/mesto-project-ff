export const CSS_ID = {
    cardTemplate: 'card-template',
};

export const CSS_CLASS = {
    profileImage: 'profile__image',
    profileTitle: 'profile__title',
    profileDescription: 'profile__description',
    popupVisible: 'popup_is-opened',
    popupContent: 'popup__content',
    popupForm: 'popup__form',
    popupInput: 'popup__input',
    popupInputError: 'popup__input_error',
    popupButton: 'popup__button',
    popupButtonDisabled: 'popup__button_disabled',
    popupErrorMessage: 'popup__error-message',
    popupErrorMessageVisible: 'popup__error-message_visible',
    popupCloseButton: 'popup__close',
    editProfileButton: 'profile__edit-button',
    newPlaceButton: 'profile__add-button',
    changeAvatarButton: 'profile__change-avatar-button',
    editProfilePopup: 'popup_type_edit',
    newPlacePopup: 'popup_type_new-card',
    changeAvatarPopup: 'popup_type_avatar',
    card: 'card',
    cardImage: 'card__image',
    cardTitle: 'card__title',
    cardLikeButton: 'card__like-button',
    cardLikeButtonActive: 'card__like-button_is-active',
    cardLikesCount: 'card__likes-count',
    cardDeleteButton: 'card__delete-button',
    cardDeleteButtonHidden: 'card__delete-button_hidden',
    placesList: 'places__list',
}

export const getIdSelector = (id) => `#${id}`;

export const getClassSelector = (className) => `.${className}`;

export const getClassInClassSelector = (className, innerClassName) => `.${className} .${innerClassName}`;

export const getInputErrorSelector = ({ errorClass, inputName }) => {
    return `.${errorClass}_type_${inputName}`;
}
