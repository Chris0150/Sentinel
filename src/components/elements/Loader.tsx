import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IPropsModel {}

const Loader = (props:IPropsModel) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>Loading.. please wait..</h3>
      <br />
      <CircularProgress size={80} />
    </div>
  );
}

export default Loader;

const useStyles = makeStyles(() => ({
  root: {
    top: 55,
    left: 300,
    zIndex: 50000,
    color: "white",
    textAlign: "center",
    position: "absolute",
    backgroundColor: "#0e0e0e",
    width: window.innerWidth - 320,
    height: window.innerHeight - 130
  }
}));