import { createElement } from '../framework/render.js';
function createTaskListComponentTemplate(title,status) {
    return (
        `   <div class="taskColumn">
                <h2 class="${status}">${title}</h2>
            </div>`
    );
}


export default class TaskColumnComponent {
    constructor(title,status) {
        this.title = title;
        this.status = status;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.title,this.status);
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