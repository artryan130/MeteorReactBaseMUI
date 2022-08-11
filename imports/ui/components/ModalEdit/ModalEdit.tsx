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
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

interface IModalEdit {
    openModal: boolean;
    handleCloseModal: () => void;
    tarefa: ITarefa;
    callAlterarStatus: (tarefa: ITarefa) => void;
    callAlterarPersonal: (tarefa: ITarefa) => void;
    callSave: (tarefa: ITarefa) => void;
}

export const ModalEdit = (props: IModalEdit): JSX.Element => {
    const {
        openModal,
        handleCloseModal,
        tarefa,
        callAlterarStatus,
        callAlterarPersonal,
        callSave,
    } = props;

    const [novaTarefa, setNovaTarefa] = useState({});

    const handleChange = (e) => {
        // setDados({...dados,
        //     [e.target.name]: e.target.value
        // })
        if (e.target.name === 'title') {
            // const novaTarefa = {...tarefa, title: e.target.value}
            setNovaTarefa({ ...tarefa, title: e.target.value });
        } else if (e.target.name === 'description') {
            // const novaTarefa = {...tarefa, description: e.target.value}
            setNovaTarefa({ ...tarefa, description: e.target.value });
        } else {
            // const novaTarefa = {...tarefa, [e.target.name]: e.target.value}
            setNovaTarefa({ ...tarefa, [e.target.name]: e.target.value });
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
                                checked={tarefa.status}
                                onChange={() => callAlterarStatus(tarefa)}
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
                                checked={tarefa.isPersonal}
                                onChange={() => callAlterarPersonal(tarefa)}
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
