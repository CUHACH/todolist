import { AbstractComponent } from '../framework/AbstractComponent.js';
function createButtonClearComponentTemplate() {
    return (
        `
            <button class="buttonClear">✖ Очистить</button>
        `
    );
}

export default class ButtonClearComponent extends AbstractComponent {
    #handleClick = null;

    constructor({ onClick }) {
        super()
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }
    get template() {
        return createButtonClearComponentTemplate();
    }
    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}