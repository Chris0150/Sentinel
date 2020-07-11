import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { mapStyles } from "../../utils/constants/mapStyles";
import { useToggleState } from "../../utils/utils";
import { Terrain, Layers, Cloud, LineWeight, ExpandMore, ExpandLess } from "@material-ui/icons";
import { Typography, List, ListItem, Collapse, Checkbox, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core";
import CSVParser from "../../utils/loaders/Views/loaderCSV";

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// INTERFACES ////////////////////////////////////

type TEvent = (event: React.ChangeEvent<{ value: unknown }>) => void;

interface IProps {
  source: string;
  terrain: string;
  customLayers: any
  flightLevels: string[];
  showAirports: boolean;
  showVAACOverlay: boolean;
  showTrajectories: boolean;
  possibleFlightLevels: string[];
  handleAddLayer: TEvent;
  handleSelectSource: TEvent;
  handleSelectTerrain: TEvent;
  handleSelectFlightLevels: TEvent;
  handleShowTrajectories: TEvent;
  handleShowVAACOverlay: TEvent;
  handleShowAirports: TEvent;
}

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// COMPONENT /////////////////////////////////////

const ViewsSidebar:React.FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();

  // hooks
  const [open2, toggleOpen2] = useToggleState(false);
  const [open3, toggleOpen3] = useToggleState(false);
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
    handleAddLayer,
    handleSelectSource,
    handleSelectTerrain,
    handleShowAirports,
    handleShowVAACOverlay,
    handleShowTrajectories,
    handleSelectFlightLevels,
  } = props;

  // Sidebar items
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
      onClick: handleShowTrajectories,
      checked: showTrajectories,
    },
    {
      text: "Airports",
      onClick: handleShowAirports,
      checked: showAirports,
    },
  ];
  const aItemsFlightLevels = possibleFlightLevels;

  return (
    <List
      component="nav"
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
          <Terrain />
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
          <Cloud />
        </ListItemIcon>
        <ListItemText primary="Source" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
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
          <Layers />
        </ListItemIcon>
        <ListItemText primary="Layers" />
        {open4 ? <ExpandLess /> : <ExpandMore />}
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
          <CSVParser onUploadFile={handleAddLayer}/>

        </List>
      </Collapse>

      {/* FLIGHT LEVELS */}
      <ListItem className={classes.item} button onClick={toggleOpen5}>
        <ListItemIcon>
          <LineWeight />
        </ListItemIcon>
        <ListItemText primary="Flight Levels" />
        {open5 ? <ExpandLess /> : <ExpandMore />}
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
                  disabled={index === 1 || index === 2 || index === 3 ? true : false}
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

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// STYLES //////////////////////////////////////

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
    // width: "14%",
    fontFamily: "Segoe UI",
  },
  nested: {
    height: 45,
    paddingLeft: theme.spacing(5),
  },
  addLayerButton: {
    width: "75%",
    height: 30,
    marginTop: 10,
    marginBottom: 15,
    textTransform: "initial",
    backgroundColor: "#5a5a5a",
  }
}));
