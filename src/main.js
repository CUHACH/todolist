import HeaderComponent from './view/headerComponent.js';
import NewTaskForm from './view/NewTaskForm.js';
import TaskBoardComponent from './view/TaskBoard.js'
import TaskColumnComponent from './view/TaskColumn.js';
import TaskComponent from './view/Task.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer= document.querySelector('.header');
const formContainer=document.querySelector('.addTask');
const main=document.querySelector('.main');

const taskBoardComponent = new TaskBoardComponent();


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new NewTaskForm(), formContainer, RenderPosition.BEFOREBEGIN);
render(taskBoardComponent, main, RenderPosition.BEFOREEND);


for (let j=0; j<4;j++) {
    const taskColumnComponent = new TaskColumnComponent();

    render(taskColumnComponent, taskBoardComponent.getElement());

    for (let i=0;i<4;i++) {
        render(new TaskComponent(), taskColumnComponent.getElement());
    }

}