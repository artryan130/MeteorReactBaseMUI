import React from 'react';
import TasksContainer from '../ui/pages/tasksContainer';

export const tasksRouterList = [
    {
        path: '/tasks/:screenState/:tasksId',
        component: TasksContainer,
        isProtected: true,
    },
    {
        path: '/tasks/:screenState',
        component: TasksContainer,
        isProtected: true,
    },
    {
        path: '/tasks',
        component: TasksContainer,
        isProtected: true,
    },
];
