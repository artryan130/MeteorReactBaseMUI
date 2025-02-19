// region Imports
import { ProductBase } from '../../../api/productBase';
import { taskSch, ITask } from './taskSch';

class TaskApi extends ProductBase<ITask> {
    constructor() {
        super('task', taskSch, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true,
        });
    }

    mudarTituloeDescricao = (id: string, callback = () => {}) => {
        this.callMethod('MudartituloEDescricao', id, callback);
    };
}

export const taskApi = new TaskApi();
