import HeaderComponent from './view/headerComponent.js';
import FormAddTaskComponent from './view/NewTaskForm.js';
import {render, RenderPosition} from './framework/render.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT='https://69039ac7d0f10a340b250ea3.mockapi.io';
const bodyContainer= document.querySelector('.header');
const formContainer=document.querySelector('.addTask');
const main=document.querySelector('.main');

const taskModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});
const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: main,
    tasksModel: taskModel
})

const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer, RenderPosition.BEFOREBEGIN);

taskBoardPresenter.init()
