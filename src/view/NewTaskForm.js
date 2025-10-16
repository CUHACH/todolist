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
    get template() {
        return createNewTaskComponentTemplate();
    }

}
