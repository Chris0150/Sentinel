import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Loader from "../components/elements/Loader";
import ViewsNavbar from "../components/navbars/ViewsNavbar";
import ViewsSidebar from "../components/sidebars/ViewsSidebar";
const ViewsMap: React.LazyExoticComponent<any> = React.lazy(() => import("../components/maps/ViewsMap"));

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// INTERFACES ////////////////////////////////////

interface IViews { }

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// JSDOC ///////////////////////////////////////

/**
 * VIEWS module
 *
 * Description: 
 *
 * @since 07.2020
 * @access public
 *
 * @interface IViews
 * 
 * @listens handleAddLayer add custom layer to map (.csv files).
 * @listens handleSelectSource select data source (Forecast, VAAC). 
 * @listens handleSelectTerrain select map terrain style (light, dark, etc.)
 * @listens handleShowAirports display airports in map.
 * @listens handleShowVAACOverlay add VAAC contours overlay to map.
 * @listens handleShowTrajectories display flight trajectories in map.
 * @listens handleSelectFlightLevels select Flight Levels to display in map.
 * 
 * @fires setSource set map source (Forecast, VAAC).
 * @fires setTerrain set map terrain style.
 * @fires setCustomLayers set custom layers in map.
 * @fires setFlightLevels set Flight Levels in map.
 * @fires setShowAirports set airports in map.
 * @fires setShowVaacOverlay set VAAC contours overlay in map.
 * @fires setShowTrajectories set Flight Levels to display in map.
 *
 * @return {JSX.Element} Views module.
 */

 ////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// COMPONENT /////////////////////////////////////

const Views: React.FC<IViews> = (props: IViews): JSX.Element => {
  const classes = useStyles();

  // Initial settings
  const initialSettings = {
    showTrajectories: false,
    showVaacOverlay: false,
    showAirports: false,
    customLayers: [],
    terrain: "light",
    source: "Forecast",
    volcanoes: ["All"],
    flightLevels: ["50"],
    possibleFlightLevels: ["50", "100", "150", "200", "UNION"]
  }

  // hooks
  let [source, setSource] = React.useState(initialSettings.source)
  let [terrain, setTerrain] = React.useState(initialSettings.terrain)
  let [possibleFlightLevels] = React.useState(initialSettings.possibleFlightLevels)
  let [flightLevels, setFlightLevels] = React.useState(initialSettings.flightLevels)
  let [customLayers, setCustomLayers] = React.useState(initialSettings.customLayers)
  let [showAirports, setShowAirports] = React.useState(initialSettings.showAirports)
  let [showVaacOverlay, setShowVaacOverlay] = React.useState(initialSettings.showVaacOverlay)
  let [showTrajectories, setShowTrajectories] = React.useState(initialSettings.showTrajectories)

  // handlers
  const handleAddLayer = (event: React.ChangeEvent<{ value: unknown }>) => setCustomLayers([event] as any);
  const handleShowAirports = (event: React.ChangeEvent<{ value: unknown }>) => setShowAirports(!showAirports as boolean)
  const handleShowVAACOverlay = (event: React.ChangeEvent<{ value: unknown }>) => setShowVaacOverlay(!showVaacOverlay as boolean)
  const handleShowTrajectories = (event: React.ChangeEvent<{ value: unknown }>) => setShowTrajectories(!showTrajectories as boolean)
  const handleSelectTerrain = (event: React.ChangeEvent<{ value: unknown }>) => setTerrain(event.target.value as string)
  const handleSelectFlightLevels = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (flightLevels.includes(event.target.value as string)) {
      flightLevels.splice(flightLevels.indexOf(event.target.value as string), 1);
      flightLevels = [Object.values({ ...flightLevels })][0] as any;
      setFlightLevels(flightLevels);
    }
    else {
      flightLevels = flightLevels.concat(event.target.value as string)
      setFlightLevels(flightLevels);
    }
  }
  const handleSelectSource = (event: React.ChangeEvent<{ value: unknown }>) => {
    if(event.target.value === "VAAC") {
      setShowVaacOverlay(true)
      setFlightLevels([]);
    }
    else{
      setShowVaacOverlay(false)
      setFlightLevels(["UNION"]);
    }
    setSource(event.target.value as string)
  }

  return (
    <>
      <ViewsNavbar />
      <div className={classes.root}>
        <ViewsSidebar
          source={source}
          terrain={terrain}
          customLayers={customLayers}
          flightLevels={flightLevels}
          showAirports={showAirports}
          showVAACOverlay={showVaacOverlay}
          showTrajectories={showTrajectories}
          possibleFlightLevels={possibleFlightLevels}
          handleSelectFlightLevels={handleSelectFlightLevels}
          handleSelectTerrain={handleSelectTerrain}
          handleSelectSource={handleSelectSource}
          handleAddLayer={handleAddLayer}
          handleShowAirports={handleShowAirports}
          handleShowVAACOverlay={handleShowVAACOverlay}
          handleShowTrajectories={handleShowTrajectories}
        />
        <Suspense fallback={<Loader />}>
          <div className={classes.map}>
            <ViewsMap
              terrain={terrain}
              flightLevels={flightLevels}
              customLayers={customLayers}
              showAirports={showAirports}
              showVAACOverlay={showVaacOverlay}
              showTrajectories={showTrajectories}
            />
          </div>
        </Suspense>
      </div>
    </>
  );
}

export default Views;

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// STYLES //////////////////////////////////////

const useStyles = makeStyles(() => ({
  root: {
    top: 50,
    left: -5,
    flexGrow: 1,
    zIndex: 100,
    overflowY: "hidden",
    textAlign: "center",
    position: "absolute",
    backgroundColor: "#1a1a1b",
    width: window.innerWidth + 5,
    height: window.innerHeight - 50
  },
  map: {
    top: "0%",
    left: "14.3%",
    width: "85.5%",
    borderWidth: 1,
    height: "99.5%",
    overflowY: "hidden",
    textAlign: "center",
    borderStyle: "solid",
    position: "absolute",
    borderColor: "#6f7172"
  }
}));
