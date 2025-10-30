import TaskColumnComponent from '../view/TaskColumn.js';
import TaskComponent from '../view/Task.js';
import TaskBoardComponent from '../view/TaskBoard.js';
import { Status, StatusLabel, UserAction } from '../const.js';
import { render } from '../framework/render.js';
import ButtonClearComponent from '../view/ButtonClear.js';
import PlugComponent from '../view/PlugComponent.js';
import LoadingViewComponent from '../view/LoadingViewComponent.js';

export default class TaskBoardPresenter {
    #taskBoardComponent = new TaskBoardComponent();
    #boardContainer = null;
    #taskModel = null;
    #loadingComponent = new LoadingViewComponent();
    #buttonClearComponent = null;
    isLoading = false;
    #needsRerender = false;

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#taskModel = tasksModel;
        this.#taskModel.addObserver(this.#handleModelChange.bind(this));

        this.#buttonClearComponent = new ButtonClearComponent({
            onClick: this.handleClearButtonClick.bind(this)
        });
    }

    /** Показать компонент загрузки */
    #showLoading() {
        this.isLoading = true;
        this.#clearBoard();
        render(this.#loadingComponent, this.#boardContainer);
    }

    /** Скрыть компонент загрузки */
    #hideLoading() {
        this.isLoading = false;
        this.#loadingComponent.element?.remove();

        if (this.#needsRerender) {
            this.#clearBoard();
            this.#renderBoard();
            this.#needsRerender = false;
        }
    }

    async init() {
        this.#showLoading();
        try {
            await this.#taskModel.init();
            this.#renderBoard();
        } catch (err) {
            console.error('Ошибка инициализации доски:', err);
        } finally {
            this.#hideLoading();
        }
    }

    async createTask() {
        const taskTitle = document.querySelector('input').value.trim();
        if (!taskTitle) return;

        this.#showLoading();
        try {
            await this.#taskModel.addTask(taskTitle);
            document.querySelector('input').value = '';
        } catch (err) {
            console.error('Ошибка при создании задачи:', err);
        } finally {
            this.#hideLoading();
        }
    }

    handleClearButtonClick() {
        this.removeTasks();
    }

    async removeTasks() {
        this.#showLoading();
        try {
            await this.#taskModel.clearBucket();
        } catch (err) {
            console.error('Ошибка при очистке корзины:', err);
        } finally {
            this.#hideLoading();
        }
    }

    async #handleTaskDrop(taskId, newStatus) {
        this.#showLoading();
        try {
            await this.#taskModel.updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи:', err);
        } finally {
            this.#hideLoading();
        }
    }

    #renderTaskColumn(status, container) {
        const taskColumnComponent = new TaskColumnComponent(
            StatusLabel[status],
            status,
            this.#handleTaskDrop.bind(this)
        );
        render(taskColumnComponent, container);
        return taskColumnComponent;
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent(task);
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
            render(this.#buttonClearComponent, container);
        }
    }

    #renderBoard() {
        render(this.#taskBoardComponent, this.#boardContainer);


        Object.values(Status).forEach((status) => {
            const taskColumnComponent = this.#renderTaskColumn(status, this.#taskBoardComponent.element);
            const filteredTasks = this.tasks.filter((task) => task.status === status);

            this.#renderPlugComponent(filteredTasks, taskColumnComponent.element);

            for (let i = 0; i < filteredTasks.length; i++) {
                this.#renderTask(filteredTasks[i], taskColumnComponent.element);
            }

            this.#renderButtonClear(status, taskColumnComponent.element);
        });
    }

    #clearBoard() {
        if (this.#taskBoardComponent.element) {
            this.#taskBoardComponent.element.innerHTML = '';
        }
    }

    #handleModelChange(event, payload) {
        if (this.isLoading) {
            this.#needsRerender = true;
            return;
        }

        switch (event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                break;
        }
    }

    get tasks() {
        return this.#taskModel.tasks;
    }
}
