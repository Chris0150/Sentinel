import React from 'react';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 5,
      borderRadius: 5,
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "rgb(99, 147, 193)"
    },
  }),
)(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CustomizedProgressBars(props) {
  const classes = useStyles();
  const { value } = props;

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={value} />
    </div>
  );
}
