import TaskColumnComponent from '../view/TaskColumn.js';
import TaskComponent from '../view/Task.js';
import TaskBoardComponent from '../view/TaskBoard.js'
import { Status, StatusLabel } from "../const.js";
import { render, RenderPosition } from '../framework/render.js';
import ButtonClearComponent from '../view/ButtonClear.js';

export default class TaskBoardPresenter {
    taskBoardComponent = new TaskBoardComponent()
    taskColumnComponent = new TaskColumnComponent();
    boardContainer = null;
    taskmodel = null;
    boardTask = [];

    constructor({ boardContainer, taskModel }) {
        this.boardContainer = boardContainer;
        this.taskModel = taskModel;
    }


    init() {
        this.boardTask = [...this.taskModel.getTasks()]

        render(this.taskBoardComponent, this.boardContainer);

        Object.values(Status).forEach(element => {
            const taskColumnComponent = new TaskColumnComponent(StatusLabel[element], element);
            render(taskColumnComponent, this.taskBoardComponent.getElement());
            const filteredTasks = this.boardTask.filter(task => task.status === element);
            for (let i = 0; i < filteredTasks.length; i++) {

                render(new TaskComponent(filteredTasks[i]), taskColumnComponent.getElement());
            }
            if (element === Status.TRASH) {
                render(new ButtonClearComponent(),taskColumnComponent.getElement());
            }
        })


    }
}