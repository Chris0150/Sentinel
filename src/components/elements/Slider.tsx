import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 25,
      bottom: 50,
      width: "100%",
      zIndex: 10000,
      position: "absolute",
      background: "#111111"
    },
  })
);

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

function ValueLabelComponent(props: Props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider defaultValue={0} ValueLabelComponent={ValueLabelComponent} />
    </div>
  );
}
