import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface IPropsModel {
  text: String
}

const DateAndTimePicker = (props:IPropsModel):JSX.Element => {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        label={props.text}
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{ shrink: true }}
      />
    </form>
  );
}

export default DateAndTimePicker;

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
     width: 225
  }
}));