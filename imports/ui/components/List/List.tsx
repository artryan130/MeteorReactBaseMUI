import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListStyle } from './ListStyle';
import { taskApi } from '/imports/modules/task/api/taskApi';
import { ITask } from '/imports/modules/task/api/taskSch';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { useMethod } from '/imports/hooks/useMethod';
import { useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { getUser } from '/imports/libs/getUser';
import Checkbox from '@mui/material/Checkbox';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const Lista = () => {
    const [task]: [Partial<ITask>[] | null, boolean, IMeteorError | null] = useMethod<ITask>(
        taskApi,
        'GetAllTask'
    );

    const isWD1286 = useMediaQuery('(max-width:1286px)');
    const isWD550 = useMediaQuery('(max-width:550px)');
    const isWD510 = useMediaQuery('(max-width:510px)');
    const isWD471 = useMediaQuery('(max-width:471px)');
    const isWD380 = useMediaQuery('(max-width:380px)');

    const navigate = useNavigate();
    const user = getUser();
    return (
        <Box sx={ListStyle.container}>
            <Typography
                variant="h2"
                sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
            >
                Atividades recentes
            </Typography>
            <Typography
                variant="h4"
                sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}
            >
                Bem vindo {user.username}, essas são as atividades adicionadas recentemente no
                nossos sistema!
            </Typography>

            <Box sx={ListStyle.tarefas}>
                {task?.map((task, index) => (
                    <Box key={index}>
                        <List
                            sx={{
                                width: '100%',
                                maxWidth: '100vw',
                                bgcolor: 'background.paper',
                                marginBottom: '0.5rem',
                            }}
                        >
                            <ListItem
                                alignItems="flex-start"
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        checked={task.status}
                                        icon={<RadioButtonUncheckedIcon />}
                                        checkedIcon={<TaskAltIcon />}
                                        disabled
                                    />
                                }
                                disablePadding
                            >
                                <ListItemAvatar>
                                    <Avatar alt="image" src={task.image} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={task.title}
                                    secondary={task.description}
                                    sx={{ maxWidth: { xs: '65vw', sm: '75vw', md: '80vw' } }}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip title="Acessar Minhas Tarefas">
                    <Button variant="contained" onClick={() => navigate('/task')}>
                        Ir para tarefas
                    </Button>
                </Tooltip>
            </Box>
        </Box>
    );
};
