import { AbstractComponent } from '../framework/AbstractComponent.js';
function createButtonClearComponentTemplate() {
    return (
        `
            <button class="buttonClear">✖ Очистить</button>
        `
    );
}

export default class ButtonClearComponent extends AbstractComponent {
    get template() {
        return createButtonClearComponentTemplate();
    }

}