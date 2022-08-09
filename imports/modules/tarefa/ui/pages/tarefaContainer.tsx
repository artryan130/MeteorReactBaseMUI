import React from 'react';
import { TarefaListContainer } from './tarefaList';
import { TarefaDetailContainer } from './tarefaDetail';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';

export default (props: IDefaultContainerProps) => {
    const validState = ['view', 'edit', 'create'];

    let { screenState, tarefaId } = useParams();

    const state = screenState ? screenState : props.screenState;

    const id = tarefaId ? tarefaId : props.id;

    if (!!state && validState.indexOf(state) !== -1) {
        if (state === 'view' && !!id) {
            return <TarefaDetailContainer {...props} screenState={state} id={id} />;
        } else if (state === 'edit' && !!id) {
            return (
                <TarefaDetailContainer {...props} screenState={state} id={id} {...{ edit: true }} />
            );
        } else if (state === 'create') {
            return (
                <TarefaDetailContainer
                    {...props}
                    screenState={state}
                    id={id}
                    {...{ create: true }}
                />
            );
        }
    } else {
        return <TarefaListContainer {...props} />;
    }
};
