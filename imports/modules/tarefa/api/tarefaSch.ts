import { IDoc } from '/imports/typings/IDoc';

export const tarefaSch = {
    image: {
        type: String,
        label: 'Imagem',
        defaultValue: '',
        optional: true,
        isImage: true,
    },
    title: {
        type: String,
        label: 'Título',
        defaultValue: '',
        optional: false,
    },
    description: {
        type: String,
        label: 'Descrição',
        defaultValue: '',
        optional: true,
    },

    tasks: {
        type: [Object],
        label: 'Tarefas',
        defaultValue: '',
        optional: true,
        subSchema: {
            name: {
                type: String,
                label: 'Nome da Tarefa',
                defaultValue: '',
                optional: true,
            },
            description: {
                type: String,
                label: 'Descrição da Tarefa',
                defaultValue: '',
                optional: true,
            },
        },
    },
    status: {
        type: Boolean,
        label: 'Status',
        defaultValue: false,
        optional: true,
    },
    isPersonal: {
        type: Boolean,
        label: 'Tarefa pessoal?',
        defaultValue: false,
        optional: true,
    },
};

export interface ITarefa extends IDoc {
    image: string;
    title: string;
    description: string;
    status: Boolean;
    createdby: string;
    isPersonal: Boolean;
}
