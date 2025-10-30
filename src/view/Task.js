import { AbstractComponent } from "../framework/AbstractComponent.js";

function createTaskComponentTemplate(task) {
    const { title, status, id} = task;
    return (
        `   <div class="task ${status}" data-task-id="${id}"">${title}</div>`
    );
}


export default class TaskComponent extends AbstractComponent {
    constructor(task) {
        super()
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

    #afterCreateElement(){
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable(){
        this.element.setAttribute(`draggable`, true);

        this.element.addEventListener('dragstart', (event)=>{
            event.dataTransfer.setData('text/plain',this.task.id);
            this.element.classList.add('dragging');
        });
        this.element.addEventListener('dragend', (event)=>{
            this.element.classList.remove('dragging'); 
        });
    }

}