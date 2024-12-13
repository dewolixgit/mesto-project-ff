import {getIdSelector} from "./selector";

export const copyTemplateById = (id) =>
    document.querySelector(getIdSelector(id))?.content.cloneNode(true) ?? null;

export const addEventListener = (element, event, handler) => {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler);
}

export const DOM_INSERT_POSITION = {
    prepend: 'prepend',
    append: 'append',
}

/**
 * @param element - вставляемый элемент
 * @param parent - родительский элемент (куда нужно вставить элемент)
 * @param position - позиция вставки (append, prepend)
 */
export const insertAndGetElement = ({ element, parent, position }) => {
    switch (position) {
        case DOM_INSERT_POSITION.prepend:
            parent.prepend(element);
            return parent.firstChild;
        case DOM_INSERT_POSITION.append:
        default:
            parent.appendChild(element);
            return parent.lastChild;
    }
}
