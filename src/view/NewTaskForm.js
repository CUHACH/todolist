import { AbstractComponent } from "../framework/AbstractComponent.js";
function createNewTaskComponentTemplate() {
    return (
        `<div class="newTask">
            <h2 class="newTaskTitle">
                Новая задача
            </h2>
            <div class="newTaskForm">
                <input type="text" placeholder="Название задачи">
                <button class="buttonAddTask">+ Добавить</button>
            </div>
        </div>`
    );
}

export default class FormAddTaskComponent extends AbstractComponent {
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }
    
    get template() {
        return createNewTaskComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}
