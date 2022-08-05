import React from 'react';
import Class from '@mui/icons-material/Class';
import { IAppMenu } from '/imports/modules/modulesTypings';

export const taskMenuItemList: (IAppMenu | null)[] = [
    {
        path: '/task',
        name: 'Minhas Tarefas',
        icon: <Class />,
    },
];
