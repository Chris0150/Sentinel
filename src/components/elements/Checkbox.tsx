import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";

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
                    <Checkbox
                    name={label} 
                    checked={state} 
                    onChange={handleChangeCheckbox}
                     />
                }
            />
        </FormGroup>
    );
}

export default checkBoxStyled;