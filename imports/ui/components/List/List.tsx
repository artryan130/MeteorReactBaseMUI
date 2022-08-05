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

    return (
        <Box>
            <Typography variant="h3" sx={{ display: 'flex', justifyContent: 'center' }}>
                Atividades recentes
            </Typography>
            <Box>
                {task?.map((task, index) => (
                    <Box key={index}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="image" src={task.image} />
                                </ListItemAvatar>
                                <ListItemText primary={task.title} secondary={task.description} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    </Box>
                ))}
            </Box>
            <Box>
                <Tooltip title="Acessar Minhas Tarefas">
                    <Button onClick={() => navigate('/task')}>Minhas Tarefas</Button>
                </Tooltip>
            </Box>
        </Box>
    );
};
