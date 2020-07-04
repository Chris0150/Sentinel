import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface IPropsModel {
  text: String
}

const BasicTextFields = (props:IPropsModel):JSX.Element => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField label={props.text} />
    </form>
  );
}

export default BasicTextFields;

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      width: '25ch'
    }
  }
}));