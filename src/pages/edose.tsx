import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EdoseNavbar from "../components/navbars/EdoseNavbar";
import EdoseSidebar from "../components/sidebars/EdoseSidebar";
import Loader from "../components/elements/Loader";

const EdoseMap = React.lazy(() => import("../components/maps/EdoseMap"));

interface IEdosePage {}

const Edose:React.FC<IEdosePage> = (props:IEdosePage): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <EdoseNavbar />
      <div className={classes.root}>
          <EdoseSidebar />
          <Suspense fallback={<Loader />}>
            <div className={classes.map}>
                <EdoseMap /> 
            </div>
          </Suspense>
        </div>
    </>
  );
}

export default Edose;

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
