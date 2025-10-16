import TaskColumnComponent from '../view/TaskColumn.js';
import TaskComponent from '../view/Task.js';
import TaskBoardComponent from '../view/TaskBoard.js'
import { Status, StatusLabel } from "../const.js";
import { render } from '../framework/render.js';
import ButtonClearComponent from '../view/ButtonClear.js';
import PlugComponent from '../view/PlugComponent.js';

export default class TaskBoardPresenter {
    #taskBoardComponent = new TaskBoardComponent()
    #boardContainer = null;
    #taskModel = null;

    handleClearButtonClick = () => {
        this.clearBucket();
    };

    #buttonClearComponent = new ButtonClearComponent({
        onClick: this.handleClearButtonClick
    });

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#taskModel = tasksModel;
        this.#taskModel.addObserver(this.#handleModelChange.bind(this))
    }

    init() {
        this.#renderBoard()
    }

    #renderTaskColumn(status, container) {
        const taskColumnComponent = new TaskColumnComponent(StatusLabel[status], status);

        render(taskColumnComponent, container)

        return taskColumnComponent
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent(task)
        render(taskComponent, container);
    }

    #renderPlugComponent(filteredTasks, container) {
        if (filteredTasks.length === 0) {
            const plugComponent = new PlugComponent();
            render(plugComponent, container);
        }
    }

    #renderButtonClear(status, container) {
        if (status === Status.TRASH) {
            render(this.#buttonClearComponent, container)
        }
    }
    createTask() {
        const taskTitle = document.querySelector('input').value.trim();
        if (!taskTitle)
            return;

        this.#taskModel.addTask(taskTitle);
        document.querySelector('input').value = '';
    }

    #renderBoard() {
        render(this.#taskBoardComponent, this.#boardContainer);

        Object.values(Status).forEach(element => {
            const taskColumnComponent = this.#renderTaskColumn(element, this.#taskBoardComponent.element);
            const filteredTasks = this.tasks.filter(task => task.status === element);
            this.#renderPlugComponent(filteredTasks, taskColumnComponent.element)
            for (let i = 0; i < filteredTasks.length; i++) {

                this.#renderTask(filteredTasks[i], taskColumnComponent.element);
            }
            this.#renderButtonClear(element, taskColumnComponent.element)
        });
    }

    clearBucket() {
        this.#taskModel.clearBucket();
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    #clearBoard() {
        this.#taskBoardComponent.element.innerHTML = '';
    }

    get tasks() {
        return this.#taskModel.tasks;
    }

}