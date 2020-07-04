import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const themeSelect = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: "transparent"
            }
        },
        MuiMenu: {
            list: {
                marginBottom: 60
            }
        },
        MuiListItem: {
            root: {
                "&:hover": {
                    color: "orange",
                    borderColor: "orange",
                    borderStyle: "solid",
                    borderWidth: 0.1,
                }
            }
        }
    }
});

const SimpleSelect = (props) => {
    const { initialState, states, title, fontSize, handleChange } = props;
    const [value, setValue] = React.useState(initialState);
    const classes = useStyles();

    const changeSelection = (event) => {
        event.preventDefault();
        setValue(event.target.value as string)
        handleChange(event);
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel style={{ color: "white" }}>{title}</InputLabel>
                <MuiThemeProvider theme={themeSelect}>
                    <Select className={classes.root} value={value} onChange={changeSelection} style={{ fontSize: fontSize }}>
                        {states.map((state: string) => {
                            return <MenuItem style={{ backgroundColor: "#333333e6", color: "white", fontFamily: "Segoe UI", fontSize: fontSize }} key={state} value={state}>{state}</MenuItem>
                        })}
                    </Select>

                </MuiThemeProvider>
            </FormControl>
        </div>
    );
}

export default SimpleSelect;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // position: "absolute",
            marginTop: 0,
            color: "white",
            fontFamily: "Segoe UI"
        },
        formControl: {
            marginTop: 0,
            marginLeft: 20,
            color: "white",
            fontFamily: "Segoe UI",
            backgroundColor: "transparent",
            minWidth: 120,
            width: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
            color: "white",
            fontFamily: "Segoe UI",
        },
    }),
);
