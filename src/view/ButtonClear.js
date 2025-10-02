import { createElement } from '../framework/render.js';
function createButtonClearComponentTemplate() {
    return (
        `
            <button class="buttonClear">✖ Очистить</button>
        `
    );
}

export default class ButtonClearComponent {
    getTemplate() {
        return createButtonClearComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }


        return this.element;
    }


    removeElement() {
        this.element = null;
    }
}