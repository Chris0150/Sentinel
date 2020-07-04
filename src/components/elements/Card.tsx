import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface IPropsModel {
  data: any
  onClick?: any
}

const SimpleCard = (props: IPropsModel): JSX.Element => {
  const classes = useStyles();
  const { data, onClick } = props;

  return (
    <Card className={classes.root} style={{ background: "url("+data.src+")", color: "white", backgroundSize: "cover" }} onClick={onClick}>
      <CardHeader className={classes.cardheader}
        title={data.title}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent className={classes.content}>
       {/* <img alt="" src={data.src} style={{ width: 65, height: 65, marginLeft: 250 }} /> */}
       <img alt="" src={""} style={{ width: 65, height: 65, marginLeft: 250 }} />
      </CardContent>
      <CardActions disableSpacing>
        <Typography className={classes.cardSub}>{data.text}</Typography>
      </CardActions>
    </Card>
  );
}

export default SimpleCard;

const useStyles = makeStyles({
  content: {
    display: "inline-flex"
  },
  cardSub: {
    fontSize: 14,
    fontWeight: 700,
    marginLeft: 10,
    marginTop: -65,
    color: "#c6c6c6",
    textAlign: "start",
    fontFamily: "Segoe UI"
  },
  cardheader: {
    color: "white",
    textAlign: "start",
    fontFamily: "Segoe UI"
  },
  text: {
    display: "flex"
  },
  root: {
    width: 375,
    height: 175,
    marginLeft: 25,
    marginRight: 25,
    paddingBottom: 5,
    cursor: "pointer",
    boxShadow: "1px 1px grey"
  },
  title: {
    fontSize: 20,
    textAlign: "start",
    fontFamily: "Segoe UI",
    textShadow: "1px 1px black"
  },
  pos: {
    marginBottom: 12
  },
});
