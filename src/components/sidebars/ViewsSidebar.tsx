import React from "react";
import { useToggleState } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { mapStyles } from "../../utils/constants/mapStyles";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import TerrainIcon from "@material-ui/icons/Terrain";
import LayersIcon from "@material-ui/icons/Layers";
import CloudIcon from "@material-ui/icons/Cloud";
import LinesIcon from "@material-ui/icons/LineWeight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// INTERFACES ////////////////////////////////////

type TSelectEvent = (event: React.ChangeEvent<{ value: unknown }>) => void;

interface IProps {
  source: string;
  terrain: string;
  flightLevels: string[];
  showAirports: boolean;
  showVAACOverlay: boolean;
  showTrajectories: boolean;
  possibleFlightLevels: string[];
  handleSelectSource: TSelectEvent;
  handleSelectTerrain: TSelectEvent;
  handleSelectFlightLevels: TSelectEvent;
  handleshowTrajectories: TSelectEvent;
  handleShowVAACOverlay: TSelectEvent;
  handleShowAirports: TSelectEvent;
}

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// COMPONENT /////////////////////////////////////

const ViewsSidebar = (props: IProps): JSX.Element => {
  const classes = useStyles();

  // hooks
  const [open2, toggleOpen2] = useToggleState(false);
  const [open3, toggleOpen3] = useToggleState(true);
  const [open4, toggleOpen4] = useToggleState(true);
  const [open5, toggleOpen5] = useToggleState(true);
  const {
    source,
    terrain,
    flightLevels,
    showAirports,
    showVAACOverlay,
    showTrajectories,
    possibleFlightLevels,
    handleSelectSource,
    handleSelectTerrain,
    handleShowAirports,
    handleShowVAACOverlay,
    handleshowTrajectories,
    handleSelectFlightLevels,
  } = props;

  // Sidebar items
  const aItemsFlightLevels = possibleFlightLevels;
  const aItemsTerrains = mapStyles;
  const aItemsSources = [
    {
      text: "Forecast",
      onClick: handleSelectSource,
    },
    {
      text: "VAAC",
      onClick: handleSelectSource,
    },
  ];
  const aItemsLayers = [
    {
      text: "VAAC overlay",
      onClick: handleShowVAACOverlay,
      checked: showVAACOverlay,
    },
    {
      text: "Trajectories",
      onClick: handleshowTrajectories,
      checked: showTrajectories,
    },
    {
      text: "Airports",
      onClick: handleShowAirports,
      checked: showAirports,
    },
  ];

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      subheader={
        <ListSubheader
          className={classes.subHeader}
          component="div"
          id="nested-list-subheader"
        >
          VIEWS
        </ListSubheader>
      }
    >

      {/* TERRAIN */}
      <ListItem className={classes.item} button onClick={toggleOpen2}>
        <ListItemIcon>
          <TerrainIcon />
        </ListItemIcon>
        <ListItemText primary="Terrain" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto">
        <List component="div" disablePadding>
          {Object.keys(aItemsTerrains).map((item, index) => {
            return (
              <ListItem
                key={index}
                style={{ marginTop: 0 }}
                className={classes.nested}
              >
                <Checkbox
                  value={item}
                  checked={item === terrain}
                  onChange={handleSelectTerrain}
                />
                <Typography variant="body2">{item}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Collapse>

      {/* SOURCE */}
      <ListItem className={classes.item} button onClick={toggleOpen3}>
        <ListItemIcon>
          <CloudIcon />
        </ListItemIcon>
        <ListItemText primary="Source" />
      </ListItem>
      <Collapse in={open3} timeout="auto">
        <List component="div" disablePadding>
          {aItemsSources.map((item, index) => {
            return (
              <ListItem
                key={index}
                style={{ marginTop: 0 }}
                className={classes.nested}
              >
                <Checkbox
                  value={item.text}
                  checked={item.text === source}
                  onChange={item.onClick}
                />
                <Typography variant="body2">{item.text}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Collapse>

      {/* LAYERS */}
      <ListItem className={classes.item} button onClick={toggleOpen4}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Layers" />
      </ListItem>
      <Collapse in={open4} timeout="auto">
        <List component="div" disablePadding>
          {aItemsLayers.map((item, index) => {
            return (
              <ListItem
                key={index}
                style={{ marginTop: 0 }}
                className={classes.nested}
              >
                <Checkbox
                  value={item.text}
                  onChange={item.onClick}
                  checked={item.checked}
                />
                <Typography variant="body2">{item.text}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Collapse>

      {/* FLIGHT LEVELS */}
      <ListItem className={classes.item} button onClick={toggleOpen5}>
        <ListItemIcon>
          <LinesIcon />
        </ListItemIcon>
        <ListItemText primary="Flight Levels" />
      </ListItem>
      <Collapse in={open5} timeout="auto">
        <List component="div" disablePadding>
          {aItemsFlightLevels.map((item, index) => {
            return (
              <ListItem
                key={index}
                style={{ marginTop: 0 }}
                className={classes.nested}
              >
                <Checkbox
                  disabled={index === 1 || index === 2 ? true : false}
                  value={item}
                  onChange={handleSelectFlightLevels}
                  checked={flightLevels.includes(item) ? true : false}
                />
                <Typography variant="body2">{item}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    
    </List>
  );
};

export default ViewsSidebar;

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    left: 0,
    zIndex: 2,
    width: "14%",
    scroll: "auto",
    height: "98.3%",
    borderColor: "black",
    borderStyle: "solid",
    position: "absolute",
    fontFamily: "Segoe UI",
    backgroundColor: "#404243",
    color: "hsla(0,0%,100%,0.6)",
  },
  subHeader: {
    paddingLeft: 70,
    textAlign: "start",
    fontFamily: "Segoe UI",
    color: "hsla(0,0%,100%,0.6)",
  },
  item: {
    fontFamily: "Segoe UI",
  },
  nested: {
    height: 45,
    paddingLeft: theme.spacing(5),
  },
}));
