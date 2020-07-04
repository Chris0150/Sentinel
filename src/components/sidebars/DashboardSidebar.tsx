import React from 'react';
import { useToggleState } from "../../utils/utils";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import views from "../../assets/images/icons/views.png"
import edose from "../../assets/images/icons/edose.png"
import vaie from "../../assets/images/icons/vaie.png"

const DashboardSidebar = () => {
  const classes = useStyles();
  const [open1, toggleOpen1] = useToggleState(false);
  const [open2, toggleOpen2] = useToggleState(false);
  const [open3, toggleOpen3] = useToggleState(false);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" className={classes.subHeader}>
          Dashboard
        </ListSubheader>
      }
    >
      <ListItem className={classes.item} button onClick={toggleOpen1}>
        <ListItemIcon>
          <img src={views} style={{ filter: "grayscale(1)"}} alt="" width={30} height={30} />
        </ListItemIcon>
        <ListItemText primary="VIEWS" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <img src={views} style={{ filter: "grayscale(1)"}} alt="" width={30} height={30} />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem className={classes.item} button onClick={toggleOpen2}>
        <ListItemIcon>
          <img src={edose} style={{ filter: "grayscale(1)"}} alt="" width={30} height={30} />
        </ListItemIcon>
        <ListItemText primary="eDOSE" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <img src={edose} style={{ filter: "grayscale(1)"}} alt="" width={30} height={30} />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem className={classes.item} button onClick={toggleOpen3}>
        <ListItemIcon>
          <img src={vaie} style={{ filter: "grayscale(1)"}} alt="" width={30} height={30} />
        </ListItemIcon>
        <ListItemText primary="..." />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <img src={vaie} style={{ filter: "grayscale(1)"}} alt="" width={30} height={30} />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </List>
      </Collapse>

    </List>
  );
}

export default DashboardSidebar;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: 50,
      left: 0,
      zIndex: 2,
      width: '13.8%',
      height: '92.6%',
      borderStyle: "solid",
      borderColor: "black",
      position: "absolute",
      fontFamily: "Segoe UI",
      backgroundColor: "#404243", 
      color: "hsla(0,0%,100%,0.6)"
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    subHeader: {
      paddingLeft: 70,
      textAlign: "start",
      fontFamily: "Segoe UI",
      color: "hsla(0,0%,100%,0.6)"
    },
    item: {
      fontFamily: "Segoe UI"
    }
  })
);
