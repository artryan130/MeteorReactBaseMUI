import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { taskApi } from '../../api/taskApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import CheckBoxField from '/imports/ui/components/SimpleFormFields/CheckBoxField/CheckBoxField';
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
import { ITask } from '../../api/taskSch';
import {
    IDefaultContainerProps,
    IDefaultDetailProps,
    IMeteorError,
} from '/imports/typings/BoilerplateDefaultTypings';
import { useTheme } from '@mui/material/styles';
import { showLoading } from '/imports/ui/components/Loading/Loading';
import { taskServerApi } from '../../api/taskServerApi';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface ITaskDetail extends IDefaultDetailProps {
    taskDoc: ITask;
    save: (doc: ITask, _callback?: any) => void;
}

const TaskDetail = (props: ITaskDetail) => {
    const { isPrintView, screenState, loading, taskDoc, save, navigate } = props;

    const theme = useTheme();

    const handleSubmit = (doc: ITask) => {
        save({ ...doc, status: !!doc.status ? doc.status : false });
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
            onBack={() => navigate('/task')}
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
                            navigate(`/task/printview/${taskDoc._id}`);
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
                            navigate(`/task/view/${taskDoc._id}`);
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
                schema={taskApi.getSchema()}
                doc={
                    screenState === 'create'
                        ? { ...taskDoc, status: false, isPersonal: false }
                        : taskDoc
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

                {/* <FormGroup>
                    <CheckBoxField 
                        name={'check'}
                    />
                </FormGroup> */}
                {/* <CheckBoxField 
                    valueTransformer={Boolean}
                    key={'f1-checkKEY'}
                /> */}

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
                </FormGroup> */}
                <FormGroup key={'fieldsFour'} {...{ formType: 'subformArray', name: 'tasks' }}>
                    <TextField key={'f4-nomeTarefaKEY'} placeholder="Nome da Tarefa" name="name" />
                    <TextField
                        key={'f4-descricaoTarefaKEY'}
                        placeholder="Descrição da Tarefa"
                        name="description"
                    />
                </FormGroup>

                {/* <RadioButtonField
                    key={'ExempleDetail-RadioKEY'}
                    placeholder="Opções da Tarefa"
                    name="statusRadio"
                    options={[
                        { value: false, label: 'Não concluida' },
                        { value: true, label: 'Concluida' },
                    ]}
                /> */}
                {/* <SelectField
                    placeholder="Selecionar"
                    name="isDone"
                    key={'eventTypeDetail-isDone'}
                /> */}
                <FormControlLabel control={<Switch name="status" />} label="Status" name="status" />

                <FormControlLabel
                    control={<Switch name="isPersonal" />}
                    label="Pessoal?"
                    name="isPersonal"
                />

                {/* <SliderField
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
                    doc={{ _id: taskDoc?._id }}
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
                                    ? () => navigate(`/task/view/${taskDoc._id}`)
                                    : () => navigate(`/task/list`)
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
                                navigate(`/task/edit/${taskDoc._id}`);
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

interface ITaskDetailContainer extends IDefaultContainerProps {}

export const TaskDetailContainer = withTracker((props: ITaskDetailContainer) => {
    const { screenState, id, navigate, showNotification } = props;

    const subHandle = !!id ? taskApi.subscribe('taskDetail', { _id: id }) : null;
    let taskDoc = id && subHandle?.ready() ? taskApi.findOne({ _id: id }) : {};

    return {
        screenState,
        taskDoc,
        save: (doc: ITask, _callback: () => void) => {
            const selectedAction = screenState === 'create' ? 'insert' : 'update';
            taskApi[selectedAction](doc, (e: IMeteorError, r: string) => {
                if (!e) {
                    navigate(`/task/view/${screenState === 'create' ? r : doc._id}`);
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
})(showLoading(TaskDetail));
