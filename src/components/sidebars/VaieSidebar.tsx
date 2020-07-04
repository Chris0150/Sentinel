import React from "react";
import { useToggleState } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../utils/constants/colors";
// import { mapStyles } from "../../utils/constants/mapStyles";
import { Typography } from "@material-ui/core";
import edose from "../../assets/images/icons/edose.png"
// import areas from "../../assets/data/Edose/areas/areas.json";
import List from "@material-ui/core/List";
import Cloud from "@material-ui/icons/Cloud";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const EdoseColor = colors.BROWN_COLOR;

type TSelectEvent = (event: React.ChangeEvent<{ value: unknown }>) => void

interface IPropsModel {
  // handleSelectVAAC: TSelectEvent
  // handleShowFlights: TSelectEvent
  // handleSelectSource: TSelectEvent
  // handleSelectLayers: TSelectEvent
  // handleShowAirports: TSelectEvent
  // handleSelectVolcano: TSelectEvent
  // handleShowVAACOverlay: TSelectEvent
  // handleSelectTopography: TSelectEvent
  // handleSelectFlightLevels: TSelectEvent
}

const EdoseSidebar = (props): JSX.Element => {
  const classes = useStyles();
  // const [open1, toggleOpen1] = useToggleState(false);
  const [open2, toggleOpen2] = useToggleState(false);
  const [open3, toggleOpen3] = useToggleState(false);
  const [open4, toggleOpen4] = useToggleState(false);
  const [open5, toggleOpen5] = useToggleState(true);
  const [open6, toggleOpen6] = useToggleState(true);
  const {
    // handleSelectVAAC,
    handleSelectVolcano,
    handleSelectSource,
    // handleSelectTopography,
    handleSelectLayers,
    handleSelectFlightLevels
  } = props;

  // let aItems = [];
  // areas.forEach(function (area) {
  //   aItems.push(area.name)
  // })

  // Sidebar listitems
  // const aItemsVAAC = aItems
  // const aItemsTopography = mapStyles
  const aItemsVolcano = ["Etna"]
  const aItemsSource = ["Forecast", "VAAC"]
  const aItemsLayers = ["VAAC overlay", "Flights", "Airports"]
  const aItemsFlightLevels = ["50", "100", "150", "200", "250"]

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      subheader={
        <div style={{ display: "inline-flex", height: 50, marginTop: 10, marginLeft: 10 }}>
          <img src={edose} alt="" height={35} width={35} />
          <ListSubheader className={classes.subHeader} component="div" id="nested-list-subheader">
            Edose Simulator
        </ListSubheader>
        </div>
      }
    >

      {/* VAAC
      <ListItem button onClick={toggleOpen1}>
        <ListItemIcon>
          <Cloud />
        </ListItemIcon>
        <ListItemText primary="VAAC" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            aItemsVAAC.map((item, index) => {
              return (
                <ListItem key={index}
                  style={{ marginTop: 0 }}
                  className={classes.nested}>
                  <Checkbox value={item} onChange={handleSelectVAAC} />
                  <Typography>{item}</Typography>
                </ListItem>
              )
            })
          }
        </List>
      </Collapse> */}

      {/* VOLCANO */}
      <ListItem button onClick={toggleOpen2}>
        <ListItemIcon>
          <Cloud />
        </ListItemIcon>
        <ListItemText primary="Volcano" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            aItemsVolcano.map((item, index) => {
              return (
                <ListItem key={index}
                  style={{ marginTop: 0 }}
                  className={classes.nested}>
                  <Checkbox value={item} onChange={handleSelectVolcano} />
                  <Typography>{item}</Typography>
                </ListItem>
              )
            })
          }
        </List>
      </Collapse>

      {/* SOURCE */}
      <ListItem button onClick={toggleOpen3}>
        <ListItemIcon>
          <Cloud />
        </ListItemIcon>
        <ListItemText primary="Source" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            aItemsSource.map((item, index) => {
              return (
                <ListItem key={index}
                  style={{ marginTop: 0 }}
                  className={classes.nested}>
                  <Checkbox value={item} onChange={handleSelectSource} />
                  <Typography>{item}</Typography>
                </ListItem>
              )
            })
          }
        </List>
      </Collapse>

      {/* TOPOGRAPHY */}
      <ListItem button onClick={toggleOpen4}>
        <ListItemIcon>
          <Cloud />
        </ListItemIcon>
        <ListItemText primary="Terrain" />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        {/* <List component="div" disablePadding>
          {
            aItemsTopography.map((item, index) => {
              return (
                <ListItem key={index}
                  style={{ marginTop: 0 }}
                  className={classes.nested}>
                  <Checkbox value={item} onChange={handleSelectTopography} />
                  <Typography>{item}</Typography>
                </ListItem>
              )
            })
          }
        </List> */}
      </Collapse>

      {/* LAYERS */}
      <ListItem button onClick={toggleOpen5}>
        <ListItemIcon>
          <Cloud />
        </ListItemIcon>
        <ListItemText primary="Layers" />
      </ListItem>
      <Collapse in={open5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            aItemsLayers.map((item, index) => {
              return (
                <ListItem key={index}
                  style={{ marginTop: 0 }}
                  className={classes.nested}>
                  <Checkbox value={item} onChange={handleSelectLayers} />
                  <Typography>{item}</Typography>
                </ListItem>
              )
            })
          }
        </List>
      </Collapse>

      {/* FLIGHT LEVELS */}
      <ListItem button onClick={toggleOpen6}>
        <ListItemIcon>
          <Cloud />
        </ListItemIcon>
        <ListItemText primary="Flight Levels" />
      </ListItem>
      <Collapse in={open6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            aItemsFlightLevels.map((item, index) => {
              return (
                <ListItem key={index}
                  style={{ marginTop: 0 }}
                  className={classes.nested}>
                  <Checkbox value={item} onChange={handleSelectFlightLevels} />
                  <Typography>{item}</Typography>
                </ListItem>
              )
            })
          }
        </List>
      </Collapse>

    </List>
  );
}

export default EdoseSidebar;

const useStyles = makeStyles((theme) => ({
  root: {
    top: 40,
    left: -8,
    zIndex: 1,
    width: 270,
    maxWidth: 270,
    overflowY: "hidden",
    fontFamily: "Segoe UI",
    color: "hsla(0,0%,100%,0.6)",
    height: window.innerHeight - 65,
    backgroundColor: "rgba(69, 69, 69, 0.66)",
  },
  subHeader: {
    fontFamily: "Segoe UI",
    color: "hsla(0,0%,100%,0.6)"
  },
  nested: {
    height: 30,
    paddingLeft: 40
  },
  button: {
    width: 215,
    height: 50,
    margin: 15,
    marginTop: 50,
    fontFamily: "Segoe UI",
    background: EdoseColor,
    color: "hsla(0,0%,100%,0.6)"
  }
}));