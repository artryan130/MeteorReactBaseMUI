import React from 'react';
import TarefaContainer from '../ui/pages/tarefaContainer';
import { Recurso } from './Recursos';
import { IRoute } from '/imports/modules/modulesTypings';

export const tarefaRouterList: IRoute[] = [
    {
        path: '/tarefa/:screenState/:tarefaId',
        component: TarefaContainer,
        isProtected: true,
        resources: [Recurso.TAREFA_VIEW],
    },
    {
        path: '/tarefa/:screenState',
        component: TarefaContainer,
        isProtected: true,
        resources: [Recurso.TAREFA_CREATE],
    },
    {
        path: '/tarefa',
        component: TarefaContainer,
        isProtected: true,
        resources: [Recurso.TAREFA_VIEW],
    },
];
