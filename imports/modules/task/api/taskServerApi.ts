// region Imports
import { Recurso } from '../config/Recursos';
import { taskSch, ITask } from './taskSch';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { segurancaApi } from '/imports/seguranca/api/SegurancaApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { check } from 'meteor/check';
import { IContext } from '/imports/typings/IContext';
import { Meteor } from 'meteor/meteor';
import { getUser } from '/imports/libs/getUser';
// endregion
//methods
class TaskServerApi extends ProductServerBase<ITask> {
    constructor() {
        super('task', taskSch, {
            resources: Recurso,
        });

        this.addTransformedPublication(
            'taskList',
            (filter = {}) => {
                const user = getUser();
                const newFilter = {
                    ...filter,
                    $or: [{ isPersonal: false }, { createdby: user._id, isPersonal: true }],
                };
                return this.defaultListCollectionPublication(newFilter, {
                    projection: {
                        image: 1,
                        title: 1,
                        description: 1,
                        createdby: 1,
                        status: 1,
                        isPersonal: 1,
                    },
                });
            },
            (doc: ITask & { nomeUsuario: string }) => {
                const userProfileDoc = userprofileServerApi
                    .getCollectionInstance()
                    .findOne({ _id: doc.createdby });
                return { ...doc, nomeUsuario: userProfileDoc?.username };
            }
        );

        this.addPublication('taskDetail', (filter = {}) => {
            return this.defaultDetailCollectionPublication(filter, {});
        });

        this.registerMethod('MudartituloEDescricao', this.serverMudartituloEDescricao);

        this.registerMethod('GetAllTask', this._serverGetGetAllTask);
    }

    _serverGetGetAllTask() {
        const allTask: Partial<ITask>[] = taskServerApi
            .defaultCollectionPublication(
                {},
                {
                    fields: { image: 1, title: 1, description: 1 },
                    limit: 5,
                    sort: { createdat: 1 },
                }
            )
            .fetch();
        return allTask;
    }

    beforeInsert(_docObj: ITask, _context: IContext): boolean {
        segurancaApi.validarAcessoRecursos(_context.user, [Recurso.TASK_CREATE]);
        return super.beforeInsert(_docObj, _context);
    }

    beforeUpdate(_docObj: ITask, _context: IContext): boolean {
        segurancaApi.validarAcessoRecursos(_context.user, [Recurso.TASK_UPDATE]);

        const taskCompleta = taskServerApi.getCollectionInstance().findOne({ _id: _docObj._id });

        if (taskCompleta.createdby !== _context.user._id) {
            throw new Meteor.Error('erro.taskApi.operacaoNegada', 'Voce não tem permissão');
        }
        return super.beforeUpdate(_docObj, _context);
    }

    beforeRemove(_docObj: ITask, _context: IContext): boolean {
        segurancaApi.validarAcessoRecursos(_context.user, [Recurso.TASK_REMOVE]);

        const taskCompleta = taskServerApi.getCollectionInstance().findOne({ _id: _docObj._id });

        if (taskCompleta.createdby !== _context.user._id) {
            throw new Meteor.Error('erro.taskApi.operacaoNegada', 'Voce não tem permissão');
        }
        return super.beforeRemove(_docObj, _context);
    }

    serverMudartituloEDescricao = (id: string, context: IContext) => {
        check(id, String);
        const newDoc = {
            // title:'Alterei o titulo',
            // description:'Alterei a desrição'
            statusRadio: 'Concluida',
        };
        // return this.serverUpdate({_id: id, ...newDoc},context)
        return this.getCollectionInstance().update(
            id,
            {
                $set: {
                    ...newDoc,
                },
            },
            context
        );
    };
}

export const taskServerApi = new TaskServerApi();
