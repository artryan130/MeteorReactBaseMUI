import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { tarefaApi } from '../../api/tarefaApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import TextMaskField from '../../../../ui/components/SimpleFormFields/TextMaskField/TextMaskField';
import RadioButtonField from '../../../../ui/components/SimpleFormFields/RadioButtonField/RadioButtonField';
import SelectField from '../../../../ui/components/SimpleFormFields/SelectField/SelectField';
import UploadFilesCollection from '../../../../ui/components/SimpleFormFields/UploadFiles/uploadFilesCollection';
import ChipInput from '../../../../ui/components/SimpleFormFields/ChipInput/ChipInput';
import SliderField from '/imports/ui/components/SimpleFormFields/SliderField/SliderField';
import AudioRecorder from '/imports/ui/components/SimpleFormFields/AudioRecorderField/AudioRecorder';
import ImageCompactField from '/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField';
import Print from '@mui/icons-material/Print';
import Close from '@mui/icons-material/Close';
import { PageLayout } from '/imports/ui/layouts/pageLayout';
import { ITarefa } from '../../api/tarefaSch';
import {
    IDefaultContainerProps,
    IDefaultDetailProps,
    IMeteorError,
} from '/imports/typings/BoilerplateDefaultTypings';
import { useTheme } from '@mui/material/styles';
import { showLoading } from '/imports/ui/components/Loading/Loading';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface ITarefaDetail extends IDefaultDetailProps {
    tarefaDoc: ITarefa;
    save: (doc: ITarefa, _callback?: any) => void;
}

const TarefaDetail = (props: ITarefaDetail) => {
    const { isPrintView, screenState, loading, tarefaDoc, save, navigate } = props;

    const theme = useTheme();

    const handleSubmit = (doc: ITarefa) => {
        save(doc);
    };

    return (
        <PageLayout
            key={'ExemplePageLayoutDetailKEY'}
            title={
                screenState === 'view'
                    ? 'Visualizar exemplo'
                    : screenState === 'edit'
                    ? 'Editar Exemplo'
                    : 'Criar exemplo'
            }
            onBack={() => navigate('/tarefa')}
            actions={[
                !isPrintView ? (
                    <span
                        key={'ExempleDetail-spanPrintViewKEY'}
                        style={{
                            cursor: 'pointer',
                            marginRight: 10,
                            color: theme.palette.secondary.main,
                        }}
                        onClick={() => {
                            navigate(`/tarefa/printview/${tarefaDoc._id}`);
                        }}
                    >
                        <Print key={'ExempleDetail-spanPrintKEY'} />
                    </span>
                ) : (
                    <span
                        key={'ExempleDetail-spanNotPrintViewKEY'}
                        style={{
                            cursor: 'pointer',
                            marginRight: 10,
                            color: theme.palette.secondary.main,
                        }}
                        onClick={() => {
                            navigate(`/tarefa/view/${tarefaDoc._id}`);
                        }}
                    >
                        <Close key={'ExempleDetail-spanCloseKEY'} />
                    </span>
                ),
            ]}
        >
            <SimpleForm
                key={'ExempleDetail-SimpleFormKEY'}
                mode={screenState}
                schema={tarefaApi.getSchema()}
                doc={
                    screenState === 'create'
                        ? { ...tarefaDoc, status: false, isPersonal: false }
                        : tarefaDoc
                }
                onSubmit={handleSubmit}
                loading={loading}
            >
                <ImageCompactField
                    key={'ExempleDetail-ImageCompactFieldKEY'}
                    label={'Imagem Zoom+Slider'}
                    name={'image'}
                />

                <FormGroup key={'fieldsOne'}>
                    <TextField key={'f1-tituloKEY'} placeholder="Titulo" name="title" />
                    <TextField key={'f1-descricaoKEY'} placeholder="Descrição" name="description" />
                </FormGroup>

                <FormControlLabel control={<Switch name="status" />} label="Status" name="status" />

                <FormControlLabel
                    control={<Switch name="isPersonal" />}
                    label="Pessoal?"
                    name="isPersonal"
                />
                {/* <FormGroup key={'fieldsTwo'}>
                    <SelectField key={'f2-tipoKEY'} placeholder="Selecione um tipo" name="type" />
                    <SelectField
                        key={'f2-multiTipoKEY'}
                        placeholder="Selecione alguns tipos"
                        name="typeMulti"
                    />
                </FormGroup>
                <FormGroup key={'fieldsThree'} {...{ formType: 'subform', name: 'contacts' }}>
                    <TextMaskField key={'f3-TelefoneKEY'} placeholder="Telefone" name="phone" />
                    <TextMaskField key={'f3-CPFKEY'} placeholder="CPF" name="cpf" />
                </FormGroup>
                <FormGroup key={'fieldsFour'} {...{ formType: 'subformArray', name: 'tasks' }}>
                    <TextField key={'f4-nomeTarefaKEY'} placeholder="Nome da Tarefa" name="name" />
                    <TextField
                        key={'f4-descricaoTarefaKEY'}
                        placeholder="Descrição da Tarefa"
                        name="description"
                    />
                </FormGroup>

                <SliderField
                    key={'ExempleDetail-SliderFieldKEY'}
                    placeholder="Slider"
                    name="slider"
                />

                <RadioButtonField
                    key={'ExempleDetail-RadioKEY'}
                    placeholder="Opções da Tarefa"
                    name="statusRadio"
                    options={[
                        { value: 'valA', label: 'Valor A' },
                        { value: 'valB', label: 'Valor B' },
                        { value: 'valC', label: 'Valor C' },
                    ]}
                />

                <FormGroup key={'fieldsFifth'}>
                    <AudioRecorder key={'f5-audioKEY'} placeholder="Áudio" name="audio" />
                </FormGroup>

                <UploadFilesCollection
                    key={'ExempleDetail-UploadsFilesKEY'}
                    name="files"
                    label={'Arquivos'}
                    doc={{ _id: tarefaDoc?._id }}
                />
                <FormGroup key={'fieldsSixth'} {...{ name: 'chips' }}>
                    <ChipInput key={'f6-cipsKEY'} name="chip" placeholder="Chip" />
                </FormGroup> */}
                <div
                    key={'Buttons'}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'left',
                        paddingTop: 20,
                        paddingBottom: 20,
                    }}
                >
                    {!isPrintView ? (
                        <Button
                            key={'b1'}
                            style={{ marginRight: 10 }}
                            onClick={
                                screenState === 'edit'
                                    ? () => navigate(`/tarefa/view/${tarefaDoc._id}`)
                                    : () => navigate(`/tarefa/list`)
                            }
                            color={'secondary'}
                            variant="contained"
                        >
                            {screenState === 'view' ? 'Voltar' : 'Cancelar'}
                        </Button>
                    ) : null}

                    {!isPrintView && screenState === 'view' ? (
                        <Button
                            key={'b2'}
                            onClick={() => {
                                navigate(`/tarefa/edit/${tarefaDoc._id}`);
                            }}
                            color={'primary'}
                            variant="contained"
                        >
                            {'Editar'}
                        </Button>
                    ) : null}
                    {!isPrintView && screenState !== 'view' ? (
                        <Button
                            key={'b3'}
                            color={'primary'}
                            variant="contained"
                            {...{ submit: true }}
                        >
                            {'Salvar'}
                        </Button>
                    ) : null}
                </div>
            </SimpleForm>
        </PageLayout>
    );
};

interface ITarefaDetailContainer extends IDefaultContainerProps {}

export const TarefaDetailContainer = withTracker((props: ITarefaDetailContainer) => {
    const { screenState, id, navigate, showNotification } = props;

    const subHandle = !!id ? tarefaApi.subscribe('tarefaDetail', { _id: id }) : null;
    let tarefaDoc = id && subHandle?.ready() ? tarefaApi.findOne({ _id: id }) : {};

    return {
        screenState,
        tarefaDoc,
        save: (doc: ITarefa, _callback: () => void) => {
            const selectedAction = screenState === 'create' ? 'insert' : 'update';
            tarefaApi[selectedAction](doc, (e: IMeteorError, r: string) => {
                if (!e) {
                    navigate(`/tarefa/view/${screenState === 'create' ? r : doc._id}`);
                    showNotification &&
                        showNotification({
                            type: 'success',
                            title: 'Operação realizada!',
                            description: `O exemplo foi ${
                                doc._id ? 'atualizado' : 'cadastrado'
                            } com sucesso!`,
                        });
                } else {
                    console.log('Error:', e);
                    showNotification &&
                        showNotification({
                            type: 'warning',
                            title: 'Operação não realizada!',
                            description: `Erro ao realizar a operação: ${e.reason}`,
                        });
                }
            });
        },
    };
})(showLoading(TarefaDetail));
