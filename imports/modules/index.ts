import userprofile from '../userprofile/config';
import example from './example/config';
import task from './task/config';
import pages from '../ui/config/index';
import tarefa from './tarefa/config';
import { IAppMenu, IModules, IRoute } from './modulesTypings';

class Modules implements IModules {
    modulesRouterList: (IRoute | null)[] = [null];
    modulesAppMenuItemList: (IAppMenu | null)[] = [null];

    constructor() {
        // Create modules router list
        this.modulesRouterList = [
            ...pages.pagesRouterList,
            ...userprofile.userProfileRouterList,
            ...example.exampleRouterList,
            ...task.taskRouterList,
            ...tarefa.tarefaRouterList,
        ];

        // Create modules App Menu Item list
        this.modulesAppMenuItemList = [
            ...pages.pagesMenuItemList,
            ...userprofile.userProfileMenuItemList,
            ...example.exampleMenuItemList,
            ...task.taskMenuItemList,
            ...tarefa.tarefaMenuItemList,
        ];
    }

    /**
     * Retonar a rota de todos os módulos
     * registrados na pasta modules
     * @returns {Array}
     */
    getListOfRouterModules = () => {
        return this.modulesRouterList;
    };

    /**
     * Retorna todos os items de menu lateral para os módulos
     * retistrados na pasta modules
     * @returns {Array}
     */
    getAppMenuItemList = () => {
        return this.modulesAppMenuItemList;
    };
}

export default new Modules();
