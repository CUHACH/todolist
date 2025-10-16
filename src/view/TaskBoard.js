import { AbstractComponent } from "../framework/AbstractComponent.js";
function createTaskBoardComponentTemplate() {
    return (
        `
            <div class="taskBoard">
            </div>
        `
    );
}

export default class TaskBoardComponent extends AbstractComponent {
    get template() {
        return createTaskBoardComponentTemplate();
    }

}