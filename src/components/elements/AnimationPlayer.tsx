import React from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Slider from "./Slider";

export default function AnimationPlayer(props) {


  return (
    <>
    <div>
      <Slider />
    </div>

    <div style={{ zIndex: 10000, backgroundColor: "#404243", right: "0%", bottom: "0%", width: "100%", height: 50, position: "absolute" }}>
      <FastRewindIcon style={{ color: "#171717", height: 40, marginTop: 5, width: 50 }} />
      <SkipPreviousIcon style={{ color: "#171717", height: 40, marginTop: 5, width: 50 }} />
      <PlayCircleFilledIcon style={{ color: "#171717", height: 40, marginTop: 5, width: 50 }} />
      <SkipNextIcon style={{ color: "#171717", height: 40, marginTop: 5, width: 50 }} />
      <FastForwardIcon style={{ color: "#171717", height: 40, marginTop: 5, width: 50 }} />
    </div>
    </>
  );
}
