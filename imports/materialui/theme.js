import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {isMobile} from "/imports/libs/deviceVerify";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: purple[500],
        },
    },
    props: {
        MuiButton: {
            size: 'small',
        },
        MuiFilledInput: {
            margin: 'dense',
        },
        MuiFormControl: {
            margin: 'dense',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiListItem: {
            dense: true,
        },
        MuiOutlinedInput: {
            margin: 'dense',
        },
        MuiFab: {
            size: 'small',
        },
        MuiTable: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'normal',
        },
        MuiToolbar: {
            variant: 'dense',
        },
    },
    overrides: {
        MuiButton: { // Name of the component ⚛️ / style sheet
            root: {
                margin: isMobile?0:4,
            },
            text: { // Name of the rule
                color: '#FFF', // Some CSS
            },
        },
        MuiIconButton: {
            root: {
                // Ajusta o espaçamento para atingir o mínimo de toque
                marginLeft: 4,
                marginRight: 4,
                padding: 12,
            },
        },
    },
});



