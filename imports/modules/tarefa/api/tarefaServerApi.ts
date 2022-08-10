// region Imports
import { Recurso } from '../config/Recursos';
import { tarefaSch, ITarefa } from './tarefaSch';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { segurancaApi } from '/imports/seguranca/api/SegurancaApi';
import { Meteor } from 'meteor/meteor';
import { getUser } from '/imports/libs/getUser';
import { check } from 'meteor/check';
import { IContext } from '/imports/typings/IContext';
// endregion

class TarefaServerApi extends ProductServerBase<ITarefa> {
    constructor() {
        super('tarefa', tarefaSch, {
            resources: Recurso,
        });

        this.addTransformedPublication(
            'tarefaList',
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
            (doc: ITarefa & { nomeUsuario: string }) => {
                const userProfileDoc = userprofileServerApi
                    .getCollectionInstance()
                    .findOne({ _id: doc.createdby });
                return { ...doc, nomeUsuario: userProfileDoc?.username };
            }
        );

        this.addPublication('tarefaDetail', (filter = {}) => {
            return this.defaultDetailCollectionPublication(filter, {});
        });
    }

    beforeInsert(_docObj: ITarefa, _context: IContext): boolean {
        segurancaApi.validarAcessoRecursos(_context.user, [Recurso.TAREFA_CREATE]);
        return super.beforeInsert(_docObj, _context);
    }

    beforeUpdate(_docObj: ITarefa, _context: IContext): boolean {
        segurancaApi.validarAcessoRecursos(_context.user, [Recurso.TAREFA_UPDATE]);

        const tarefaCompleta = tarefaServerApi
            .getCollectionInstance()
            .findOne({ _id: _docObj._id });

        if (tarefaCompleta.createdby !== _context.user._id) {
            throw new Meteor.Error('erro.tarefaApi.operacaoNegada', 'Voce não tem permissão');
        }
        return super.beforeUpdate(_docObj, _context);
    }

    beforeRemove(_docObj: ITarefa, _context: IContext): boolean {
        segurancaApi.validarAcessoRecursos(_context.user, [Recurso.TAREFA_REMOVE]);

        const tarefaCompleta = tarefaServerApi
            .getCollectionInstance()
            .findOne({ _id: _docObj._id });

        if (tarefaCompleta.createdby !== _context.user._id) {
            throw new Meteor.Error('erro.tarefaApi.operacaoNegada', 'Voce não tem permissão');
        }
        return super.beforeRemove(_docObj, _context);
    }
}

export const tarefaServerApi = new TarefaServerApi();
