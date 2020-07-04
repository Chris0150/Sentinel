import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ViewsNavbar from "../components/navbars/ViewsNavbar";
import Viewsidebar from "../components/sidebars/ViewsSidebar";
import Loader from "../components/elements/Loader";

const ViewsMap = React.lazy(() => import("../components/maps/ViewsMap"));

interface IViewsPage { }

const Views: React.FC<IViewsPage> = (props: IViewsPage): JSX.Element => {
  const classes = useStyles();

  // Initial settings
  const initialSettings = {
    terrain: "dark",
    source: "Forecast",
    showAirports: false,
    showVaacOverlay: false,
    showTrajectories: false,
    flightLevels: ["UNION"],
    possibleFlightLevels: ["50", "100", "150", "UNION"]
  }

  // hooks
  let [source, setSource] = React.useState(initialSettings.source)
  let [terrain, setTerrain] = React.useState(initialSettings.terrain)
  let [possibleFlightLevels] = React.useState(initialSettings.possibleFlightLevels)
  let [flightLevels, setFlightLevels] = React.useState(initialSettings.flightLevels)
  let [showAirports, setShowAirports] = React.useState(initialSettings.showAirports)
  let [showVaacOverlay, setShowVaacOverlay] = React.useState(initialSettings.showVaacOverlay)
  let [showTrajectories, setShowTrajectories] = React.useState(initialSettings.showTrajectories)

  // handlers
  const handleSelectTerrain = (event: React.ChangeEvent<{ value: unknown }>) => setTerrain(event.target.value as string)
  const handleShowAirports = (event: React.ChangeEvent<{ value: unknown }>) => setShowAirports(!showAirports as boolean)
  const handleShowVAACOverlay = (event: React.ChangeEvent<{ value: unknown }>) => setShowVaacOverlay(!showVaacOverlay as boolean)
  const handleshowTrajectories = (event: React.ChangeEvent<{ value: unknown }>) => setShowTrajectories(!showTrajectories as boolean)
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
        <Viewsidebar
          source={source}
          terrain={terrain}
          showAirports={showAirports}
          showVAACOverlay={showVaacOverlay}
          showTrajectories={showTrajectories}
          flightLevels={flightLevels}
          possibleFlightLevels={possibleFlightLevels}
          handleShowAirports={handleShowAirports}
          handleShowVAACOverlay={handleShowVAACOverlay}
          handleshowTrajectories={handleshowTrajectories}
          handleSelectFlightLevels={handleSelectFlightLevels}
          handleSelectTerrain={handleSelectTerrain}
          handleSelectSource={handleSelectSource}
        />
        <Suspense fallback={<Loader />}>
          <div className={classes.map}>
            <ViewsMap
              terrain={terrain}
              flightLevels={flightLevels}
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
