// region Imports
import { Recurso } from '../config/Recursos';
import { tarefaSch, ITarefa } from './tarefaSch';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
// endregion

import { getUser } from '/imports/libs/getUser';

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
}

export const tarefaServerApi = new TarefaServerApi();
