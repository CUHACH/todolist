import { createElement } from '../framework/render.js';
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

export default class FormAddTaskComponent {
    getTemplate() {
        return createNewTaskComponentTemplate();
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
