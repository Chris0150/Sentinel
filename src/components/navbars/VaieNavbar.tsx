import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import ReorderIcon from "@material-ui/icons/Reorder";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import logo from "../../assets/images/logo.png";
import { colors } from "../../utils/constants/colors";

const weatherColor = colors.BLUE_COLOR;

interface IPropsModel {
  color?: string
}

const VaieNavbar = (props: IPropsModel): JSX.Element => {
  const classes = useStyles();
  var history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar variant="dense" className={classes.toolbar} style={{background: weatherColor}}>

          <img alt="" style={{ height: 30, marginRight: 76, marginLeft: 30 }} src={logo} />

          <Divider className={classes.divider} orientation="vertical" flexItem />

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <ReorderIcon className={classes.menuButton} />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.backButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.push("/")}
          >
            <ArrowBackIcon className={classes.backButton}  />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.breadcrumbs1}
            color="inherit"
            aria-label="menu"
            onClick={() => history.push("/")}
          >
            <Typography className={classes.typoBreadcrumbs1}>Dashboard</Typography>
          </IconButton>
          <Typography className={classes.breadcrumbs1}>/</Typography>

          <IconButton
            edge="start"
            className={classes.breadcrumbs2}
            color="inherit"
            aria-label="menu"
          >
            <Typography className={classes.typoBreadcrumbs2}>weather Simulator</Typography>
          </IconButton>

          <div className={classes.badges}>
            <Badge className={classes.badge} badgeContent={4} color="primary">
              <MailIcon />
            </Badge>
            <Badge className={classes.badge} badgeContent={7} color="error">
              <NotificationsActiveIcon />
            </Badge>
            <Badge className={classes.badge}>
              <AccountCircleIcon />
            </Badge>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(VaieNavbar);

const useStyles = makeStyles(() => ({
  badge: {
    marginLeft: 25
  },
  badges: {
    flexGrow: 1,
    zIndex: 100,
    marginRight: 35,
    textAlign: "right",
  },
  root: {
    flexGrow: 1,
    zIndex: 100
  },
  typoBreadcrumbs1: {
    fontFamily: "Segoe UI"
  },  
  typoBreadcrumbs2: {
    fontFamily: "Segoe UI",
    textDecoration: "underline",
    color: "grey"
  },
  toolbar: {
    top: 0,
    left: 0,
    zIndex: 100,
    borderWidth: 1,
    position: "absolute",
    borderColor: "black",
    borderStyle: "solid",
    width: window.innerWidth - 50
  },
  divider: {
    width: 3,
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "black"
  },
  menuButton: {
    marginRight: 5,
  },
  backButton: {
    marginRight: 10,
  },
  breadcrumbs1: {
    marginRight: 0,
    marginLeft: 5
  },
  breadcrumbs2: {
    marginRight: 5,
    marginLeft: 5
  },
}));
