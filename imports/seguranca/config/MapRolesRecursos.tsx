import { Recurso as Exemplo } from '/imports/modules/example/config/Recursos';
import { Recurso as Task } from '/imports/modules/task/config/Recursos';
import { Recurso as Tarefa } from '/imports/modules/tarefa/config/Recursos';

import { RoleType } from '/imports/seguranca/config/RoleType';

type MapRolesRecursos = {
    [key: string]: string[];
};

// @ts-ignore
function obterStringsEnum(enumValue: { [s: number]: string | number }): [string] {
    // @ts-ignore
    return Object.values(enumValue).filter((value) => typeof value === 'string');
}

/**
 * Mapeamento entre as roles (perfil de usuário) e os recursos.
 * chave: role.
 * valores: recursos.
 *
 *
 * O nome do recurso deve ser prefixado com nome do módulo.
 *
 * Favor manter a ordem alfabética no nome dos módulos.
 *
 */
export const mapRolesRecursos: MapRolesRecursos = {
    [RoleType.ADMINISTRADOR]: [
        Exemplo.EXAMPLE_VIEW,
        Exemplo.EXAMPLE_CREATE,
        Exemplo.EXAMPLE_UPDATE,
        Exemplo.EXAMPLE_REMOVE,
        Task.TASK_VIEW,
        Task.TASK_CREATE,
        Task.TASK_UPDATE,
        Task.TASK_REMOVE,
        Tarefa.TAREFA_VIEW,
        Tarefa.TAREFA_CREATE,
        Tarefa.TAREFA_UPDATE,
        Tarefa.TAREFA_REMOVE,
    ],
    [RoleType.USUARIO]: [
        Exemplo.EXAMPLE_VIEW,
        Exemplo.EXAMPLE_CREATE,
        Exemplo.EXAMPLE_UPDATE,
        Exemplo.EXAMPLE_REMOVE,
        Task.TASK_VIEW,
        Task.TASK_CREATE,
        Task.TASK_UPDATE,
        Task.TASK_REMOVE,
        Tarefa.TAREFA_VIEW,
        Tarefa.TAREFA_CREATE,
        Tarefa.TAREFA_UPDATE,
        Tarefa.TAREFA_REMOVE,
    ],
    [RoleType.PUBLICO]: [],
};
