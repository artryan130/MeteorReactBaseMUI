import React from 'react';
import { TasksListContainer } from './tasksList';
import { TasksDetailContainer } from './tasksDetail';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';

export default (props: IDefaultContainerProps) => {
    const validState = ['view', 'edit', 'create'];

    let { screenState, tasksId } = useParams();

    const state = screenState ? screenState : props.screenState;

    const id = tasksId ? tasksId : props.id;

    if (!!state && validState.indexOf(state) !== -1) {
        if (state === 'view' && !!id) {
            return <TasksDetailContainer {...props} screenState={state} id={id} />;
        } else if (state === 'edit' && !!id) {
            return (
                <TasksDetailContainer {...props} screenState={state} id={id} {...{ edit: true }} />
            );
        } else if (state === 'create') {
            return (
                <TasksDetailContainer
                    {...props}
                    screenState={state}
                    id={id}
                    {...{ create: true }}
                />
            );
        }
    } else {
        return <TasksListContainer {...props} />;
    }
};
