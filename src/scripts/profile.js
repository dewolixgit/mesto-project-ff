import {enableModalCloseHandler, openModal} from "./modal";

/**
 * @param config.clickElementSelector - селектор элемента, при клике на который нужно вызывать модалку редактирования профиля
 * @param config.modalSelector - селектор модалки редактирования профиля
 * @param config.modalCloseElementSelector - селектор элемента, при клике на который нужно закрывать модалку
 * @param config.modalVisibleClass - класс модалки в видимом состоянии
 */
export const enableOpenProfileEditModalHandler = (config) => {
    const clickElement = document.querySelector(config.clickElementSelector);
    const modal = document.querySelector(config.modalSelector);
    const closeElement = modal.querySelector(config.modalCloseElementSelector);

    const onClick = () => {
        openModal(modal);

        // Откладываем подписку на события, чтобы не было конфликтов с текущим обработчиком
        requestAnimationFrame(() => enableModalCloseHandler({
                modal,
                closeElement
            })
        );
    };

    clickElement.addEventListener('click', onClick);

    return () => clickElement.removeEventListener('click', onClick);
}
