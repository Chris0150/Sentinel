import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { constants } from '../../utils/utils';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const themeCheckbox = createMuiTheme({
    overrides: {
        MuiCheckbox: {
          colorSecondary: {
            color: '#24c92f',
            '&$checked': {
              color: '#24c92f',
            },
          },
        },
      },
});

const checkBoxStyled = (props) => {
    const { label, initialState } = props;
    const [state, setState] = React.useState(initialState);

    const handleChangeCheckbox = (event: any) => {
        setState(event.target.checked);
    };

    return (
        <FormGroup row>
            <FormControlLabel
                label={label}
                control={
                    <MuiThemeProvider theme={themeCheckbox}>
                    <Checkbox  
                    checked={state} 
                    name={label} 
                    onChange={handleChangeCheckbox}
                     />
                     </MuiThemeProvider>
                }
            />
        </FormGroup>
    );
}

export default checkBoxStyled;