import { AbstractComponent } from '../framework/AbstractComponent.js';

function createPlugComponentTemplate() {
    return (
        `<div class='nullTask'>   
            Нет задач
        </div>`
      );
}

export default class PlugComponent extends AbstractComponent{
  get template() {
    return createPlugComponentTemplate();
  }
}