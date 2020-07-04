import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VaieNavbar from "../components/navbars/VaieNavbar";
import VaieSidebar from "../components/sidebars/VaieSidebar";
import Loader from "../components/elements/Loader";

const VaieMap = React.lazy(() => import("../components/maps/VaieMap"));

interface IVaiePage {}

const Vaie:React.FC<IVaiePage> = (props:IVaiePage): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <VaieNavbar />
      <div className={classes.root}>
          <VaieSidebar />
          <Suspense fallback={<Loader />}>
            <div className={classes.map}>
                <VaieMap /> 
            </div>
          </Suspense>
        </div>
    </>
  );
}

export default Vaie;

const useStyles = makeStyles(() => ({
  root: {
    top: 50,
    left: -5,
    flexGrow: 1,
    zIndex: 100,
    overflowY: "auto",
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
