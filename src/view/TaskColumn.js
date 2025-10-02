import {createElement} from '../framework/render.js'; 
function createTaskListComponentTemplate() {
    return (
        `   <div class="taskColumn">
                <h2 class="backlog">Бэклог</h2>
            </div>`
    );
}


export default class TaskColumnComponent {
    getTemplate() {
        return createTaskListComponentTemplate();
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