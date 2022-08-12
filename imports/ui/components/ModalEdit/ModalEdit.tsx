import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { ITarefa } from '/imports/modules/tarefa/api/tarefaSch';
import { ModalEditStyle } from './ModalEditStyle';
// import TextField from '@mui/material/TextField';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

interface IModalEdit {
    openModal: boolean;
    handleCloseModal: () => void;
    tarefa: ITarefa;
    // callAlterarStatus: (tarefa: ITarefa) => void;
    // callAlterarPersonal: (tarefa: ITarefa) => void;
    callSave: (tarefa: ITarefa) => void;
}

export const ModalEdit = (props: IModalEdit): JSX.Element => {
    const {
        openModal,
        handleCloseModal,
        tarefa,
        // callAlterarStatus,
        // callAlterarPersonal,
        callSave,
    } = props;

    const [novaTarefa, setNovaTarefa] = useState({
        title: tarefa.title,
        description: tarefa.description,
        status: tarefa.status,
        isPersonal: tarefa.isPersonal,
    });

    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setNovaTarefa({ ...novaTarefa, title: e.target.value });
            console.log({ ...novaTarefa, title: e.target.value });
            console.log(tarefa);
        } else if (e.target.name === 'description') {
            setNovaTarefa({ ...novaTarefa, description: e.target.value });
        } else {
            setNovaTarefa({ ...novaTarefa, [e.target.name]: e.target.value });
        }
    };

    return (
        <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalEditStyle.modal}>
                <Box sx={ModalEditStyle.header}>
                    <Tooltip title={'Fechar'}>
                        <IconButton onClick={() => handleCloseModal()}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={ModalEditStyle.conteudo}>
                    <TextField
                        defaultValue={tarefa.title}
                        label="Titulo"
                        name="title"
                        onChange={handleChange}
                    />
                    <TextField
                        defaultValue={tarefa.description}
                        label="Descrição"
                        name="description"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={novaTarefa.status}
                                onChange={() => {
                                    // callAlterarStatus(novaTarefa)
                                    setNovaTarefa({ ...novaTarefa, status: !novaTarefa.status });
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                        }
                        label="Status"
                        name="status"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={novaTarefa.isPersonal}
                                onChange={() => {
                                    // callAlterarPersonal(novaTarefa)
                                    setNovaTarefa({
                                        ...novaTarefa,
                                        isPersonal: !novaTarefa.isPersonal,
                                    });
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                        }
                        label="Pessoal?"
                        name="pessoal"
                    />
                    <Button
                        onClick={() => {
                            callSave(novaTarefa), handleCloseModal();
                        }}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
