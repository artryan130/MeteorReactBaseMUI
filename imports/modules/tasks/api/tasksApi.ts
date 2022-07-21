// region Imports
import { ProductBase } from '../../../api/productBase';
import { tasksSch, ITasks } from './tasksSch';

class TasksApi extends ProductBase<ITasks> {
    constructor() {
        super('tasks', tasksSch, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true,
        });
    }
}

export const tasksApi = new TasksApi();
