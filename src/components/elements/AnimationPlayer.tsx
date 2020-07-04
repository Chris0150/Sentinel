import React from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

export default function AnimationPlayer(props) {


  return (
    <div style={{ backgroundColor: "#454545a8", right: "0.8%", bottom: "3.5%", width: 460, height: 75, position: "absolute" }}>
      <FastRewindIcon style={{ color: "#3e3e3e", height: 40, marginTop: 30, width: 50 }} />
      <SkipPreviousIcon style={{ color: "#3e3e3e", height: 40, marginTop: 30, width: 50 }} />
      <PlayCircleFilledIcon style={{ color: "#3e3e3e", height: 40, marginTop: 30, width: 50 }} />
      <SkipNextIcon style={{ color: "#3e3e3e", height: 40, marginTop: 30, width: 50 }} />
      <FastForwardIcon style={{ color: "#3e3e3e", height: 40, marginTop: 30, width: 50 }} />
    </div>
  );
}
