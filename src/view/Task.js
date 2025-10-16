import { AbstractComponent } from "../framework/AbstractComponent.js";

function createTaskComponentTemplate(task) {
    const { title, status } = task;
    return (
        `   <div class="task ${status}">${title}</div>`
    );
}


export default class TaskComponent extends AbstractComponent {
    constructor(task) {
        super()
        this.task = task;
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

}