import {getIdSelector} from "./selector";

export const copyTemplateById = (id) =>
    document.querySelector(getIdSelector(id))?.content.cloneNode(true) ?? null;

export const addEventListener = (element, event, handler) => {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler);
}

export const appendAndGetElement = ({ element, parent }) => {
    parent.appendChild(element);

    console.log('appendAndGetElement', parent.childNodes);

    return parent.lastChild;
}
