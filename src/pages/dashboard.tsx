import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, withRouter } from "react-router-dom";
import DashboardBackground from "../assets/images/background.png";
import DashboardSidebar from "../components/sidebars/DashboardSidebar";
import DashboardNavbar from "../components/navbars/DashboardNavbar";
import DashboardTable from "../components/elements/Table";
import Card from "../components/elements/Card";
import cardsData from "../utils/loaders/Dashboard/dashboardCards";
import tableData from "../utils/loaders/Dashboard/dashboardEvents";

interface IDashboardPage {}

const Dashboard: React.FC<IDashboardPage> = (props: IDashboardPage): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <DashboardNavbar />
      <DashboardSidebar />
      <div className={classes.root}>
          <div className={classes.cards}>
            <Card data={cardsData.cardViews} onClick={() => history.push({ pathname: "/Views" })} />
            <Card data={cardsData.cardEdose} onClick={() => history.push({ pathname: "/Edose" })} />
            <Card data={cardsData.cardVaie} onClick={() => history.push({ pathname: "/Vaie" })} />
            <div className={classes.table}>
             <DashboardTable rows={tableData}/> 
            </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Dashboard);

const useStyles = makeStyles(() => ({
  root: {
    top: 100,
    textAlign: "center",
    position: "absolute",
    backgroundSize: "cover",
    left: window.innerHeight*0.28,
    height: window.innerHeight - 100,
    width: window.innerWidth - window.innerHeight*0.28,
    background: "url(" + DashboardBackground + ")"
  },
  cards: {
    top: "3%",
    left: "10%",
    position: "absolute",
    display: "inline-flex"
  },
  table: {
    top: "25vh",
    left: "-3%",
    width: "70vw",
    position: "absolute",
    backgroundColor: "transparent"
  }
}));
