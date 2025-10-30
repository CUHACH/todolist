import { AbstractComponent } from "../framework/AbstractComponent.js";
function createTaskListComponentTemplate(title, status) {
    return (
        `   <div class="taskColumn">
                <h2 class="${status}">${title}</h2>
            </div>`
    );
}


export default class TaskColumnComponent extends AbstractComponent {
    constructor(title, status, onTaskDrop) {
        super()
        this.title = title;
        this.status = status;
        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        return createTaskListComponentTemplate(this.title, this.status);
    }

    #setDropHandler(onTaskDrop){
        const container = this.element;

        container.addEventListener('dragover', (event) =>{
            event.preventDefault();
        });

        container.addEventListener('drop', (event) =>{
            event.preventDefault();
            
            const taskId = event.dataTransfer.getData('text/plain');   
            
            const targetElement = event.target.closest('.task');

            let newIndex = 0; 
            
            if (targetElement) {

                const taskElements = [...container.children].filter(child => child.classList.contains('task'));
                

                const targetIndex = taskElements.indexOf(targetElement);
                

                newIndex = targetIndex; 
            } else {

                const tasksInColumn = container.querySelectorAll('.task');
                newIndex = tasksInColumn.length;
            }


            onTaskDrop(taskId, this.status, newIndex);
        })
    }

}