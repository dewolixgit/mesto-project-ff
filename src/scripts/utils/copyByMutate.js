/**
 * Копирование объекта в объект с сохранением ссылки на исходный объект
 * (мутирует исходный объект)
 *
 * @param {Object} from - исходный объект
 * @param {Object} to - объект, в который нужно скопировать свойства
 */
export const copyByMutate = ({ from, to }) => {
    for (const key in from) {
        to[key] = from[key];
    }
}
