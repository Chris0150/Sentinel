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
import HomeIcon from '@material-ui/icons/Home';
import logo from "../../assets/images/logo.png";
import { colors } from "../../utils/constants/colors";

const homeColor = colors.GREY_COLOR;

interface IPropsModel {
  
}

const DashboardNavbar = (props: IPropsModel): JSX.Element => {
  const classes = useStyles();
  var history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar variant="dense" className={classes.toolbar} style={{background: homeColor}}>

        <div style={{ height: 30, marginRight: 200, marginLeft: 30 }}></div>
          {/* <img alt="" style={{ height: 30, marginRight: 76, marginLeft: 30 }} src={logo} /> */}

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
            <HomeIcon className={classes.backButton} />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Typography className={classes.typoDashboard}>Dashboard</Typography>
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
      <div className={classes.submenu}>
        <Typography className={classes.submenuTypo}>Home / Dashboard</Typography>
      </div>
    </div>
  );
};

export default withRouter(DashboardNavbar);

const useStyles = makeStyles(() => ({
  submenuTypo: {
    fontSize: 14,
    marginRight: 7,
    paddingLeft: 25,
    position: "absolute",
    fontFamily: "Segoe UI"
  },
  submenu: {
    top: 0,
    zIndex: 1,
    height: 33,
    left: "14%",
    marginTop: 50,
    paddingTop: 15,
    borderWidth: 1,
    width: "85.9%",
    color: "wheat",
    borderColor: "black",
    borderStyle: "solid",
    position: "absolute",
    display: "inline-flex",
    backgroundColor: "#191919",
    textDecorationLine: "underline"
  },
  badge: {
    marginLeft: 25
  },
  badges: {
    flexGrow: 1,
    zIndex: 100,
    marginRight: 35,
    textAlign: "right"
  },
  root: {
    flexGrow: 1,
    zIndex: 100
  },
  typoDashboard: {
    fontFamily: "Segoe UI"
  },
  toolbar: {
    top: 0,
    left: 0,
    zIndex: 100,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    position: "absolute",
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
    color: "#F9D158",
    marginRight: 10
  },
  backButton: {   
    color: "#F9D158",
    marginRight: 10
  }
}));
