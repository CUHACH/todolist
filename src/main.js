import HeaderComponent from './view/headerComponent.js';
import NewTaskForm from './view/NewTaskForm.js';
import TaskBoardComponent from './view/TaskBoard.js'
import {render, RenderPosition} from './framework/render.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';

const bodyContainer= document.querySelector('.header');
const formContainer=document.querySelector('.addTask');
const main=document.querySelector('.main');
const taskBoardContainer = new TaskBoardComponent()

const taskModel = new TasksModel();
const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: main,
    taskModel,
})

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new NewTaskForm(), formContainer, RenderPosition.BEFOREBEGIN);

taskBoardPresenter.init()
