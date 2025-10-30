import { tasks } from "../mock/task.js";
import generateID from "../utils.js";

export default class TasksModel {
    #boardTasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
        };

        this.#boardTasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    clearBucket() {
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer())
    }
    reorderTask(taskId, newStatus, newIndex) {
        const oldIndex = this.#boardTasks.findIndex(task => task.id === taskId);
        if (oldIndex === -1) return;

        const [taskToMove] = this.#boardTasks.splice(oldIndex, 1);
         taskToMove.status = newStatus;
        const tasksInNewStatus = this.#boardTasks.filter(t => t.status === newStatus);
        const elementAfter = tasksInNewStatus[newIndex];

        let insertIndex;

        if (!elementAfter) { 

            this.#boardTasks.push(taskToMove);
            this._notifyObservers();
            return;
        } 

        else {
            insertIndex = this.#boardTasks.findIndex(t => t.id === elementAfter.id);

            if (insertIndex === -1) {
                this.#boardTasks.push(taskToMove);
            } else {
                this.#boardTasks.splice(insertIndex, 0, taskToMove);
             }
         }

         this._notifyObservers();
    }

}