import React from 'react';
import Class from '@mui/icons-material/Class';
import { IAppMenu } from '/imports/modules/modulesTypings';

export const tarefaMenuItemList: (IAppMenu | null)[] = [
    {
        path: '/tarefa',
        name: 'Lista de tarefas',
        icon: <Class />,
    },
];
