import { AbstractComponent } from "../framework/AbstractComponent.js";


function createNoTaskTemplate() {
    return (
        `
        <p class="board_no-tasks">
            Loading...
        </p>
        `
    );
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createNoTaskTemplate();
    }
}