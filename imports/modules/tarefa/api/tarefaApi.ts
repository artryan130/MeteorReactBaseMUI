// region Imports
import { ProductBase } from '../../../api/productBase';
import { tarefaSch, ITarefa } from './tarefaSch';

class TarefaApi extends ProductBase<ITarefa> {
    constructor() {
        super('tarefa', tarefaSch, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true,
        });
    }
}

export const tarefaApi = new TarefaApi();
