import { AbstractComponent } from "../framework/AbstractComponent.js";
function createTaskListComponentTemplate(title, status) {
    return (
        `   <div class="taskColumn">
                <h2 class="${status}">${title}</h2>
            </div>`
    );
}


export default class TaskColumnComponent extends AbstractComponent {
    constructor(title, status) {
        super()
        this.title = title;
        this.status = status;
    }

    get template() {
        return createTaskListComponentTemplate(this.title, this.status);
    }

}