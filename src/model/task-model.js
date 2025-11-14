import Observable from '../framework/observable.js';
import { UpdateType, UserAction } from "../const.js";
import generateID from "../utils.js";

export default class TasksModel extends Observable{
    #boardTasks = [];
    #tasksApiService = null;    
    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
    }
    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardTasks = tasks;
        } catch (err) {
            this.#boardTasks = [];
        }
    this._notify(UpdateType.INIT);
    }

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    async addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
        };

        try {
         const createdTask = await this.#tasksApiService.addTask(newTask);
        this.#boardTasks.push(createdTask);
        this._notify(UserAction.ADD_TASK, createdTask);
        return createdTask;
         } catch (err) {
        console.error('Ошибка при добавлении задачи на сервер:', err);
        throw err;
   }

    }

    async clearBucket() {
        const basketTasks = this.#boardTasks.filter(task => task.status === 'trash');
        try {
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

            this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash')
            this._notify(UserAction.DELETE_TASK, {status:'trash'});
        } catch (err) {
            console.error('Ошибка при удаление задач из корзины на сервере: ', err);
            throw err;
        }

    }

    async updateTaskStatus(taskId, newStatus) {
        const taskIndex = this.#boardTasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;
        const [taskToMove] = this.#boardTasks.splice(taskIndex, 1);
        const previousStatus = taskToMove.status; 
        taskToMove.status = newStatus;
        this.#boardTasks.push(taskToMove); 
        try {
            const updatedTask = await this.#tasksApiService.updateTask(taskToMove); 
            Object.assign(taskToMove, updatedTask); 
            this._notify(UserAction.UPDATE_TASK, taskToMove); 

        } catch (err) {
            console.error('Ошибка при обновлении задачи на сервере');
            taskToMove.status = previousStatus;
            this.init(); 

            throw err;
        }
    }

    async removeTasks() {
        const basketTasks = this.#boardTasks.filter(task => task.status === 'trash');

        try {
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
            this._notify(UserAction.DELETE_TASK, { status: 'trash' });
        } catch (err) {
            console.error('Ошибка при очистке корзины: ', err);
            throw err;
        }
    }


}
