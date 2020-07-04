import React from "react";
import { Icons } from "../Icons";
import { Flags } from "../Dashboard/dashboardFlags";
import Progress from "../../../components/elements/Progress";

function createData(icon: any, name: string, location: any, locationName: string, date: string, progress: any, details: any) {
  return { icon, name, location, locationName, date, progress, details };
}

const rows: any = [
  createData(Icons.views, 'Volcanic activity', Flags.uk, "Essex, UK", "05/29/2020 01:07:36 PM", <Progress value={75} />, "See report"),
  createData(Icons.edose, 'Duststorm detected', Flags.spain, "Madrid, Spain", "05/12/2020 11:49:34 PM", <Progress value={30} />, "See report"),
  createData(Icons.edose, 'Duststorm detected', Flags.canada, "Stuttgart, Germany", "05/01/2020 09:30:36 AM", <Progress value={15} />, "See report"),
  createData(Icons.views, 'Flight dosage exceeded', Flags.sweden, "Stockholm, Sweden", "05/10/2020 07:31:02 AM", <Progress value={95} />, "See report"),
  createData(Icons.views, 'Volcanic activity', Flags.uk, "Essex, UK", "05/29/2020 01:07:36 PM", <Progress value={75} />, "See report"),
  createData(Icons.edose, 'Flight dosage exceeded', Flags.japan, "Nara, Japan", "03/28/2020 07:45:52 PM", <Progress value={60} />, "See report"),
  createData(Icons.views, 'Flight dosage exceeded', Flags.japan, "Nara, Japan", "03/28/2020 07:45:52 PM", <Progress value={60} />, "See report"),
  createData(Icons.edose, 'Duststorm detected', Flags.germany, "Stuttgart, Germany", "05/01/2020 09:30:36 AM", <Progress value={15} />, "See report"),
  createData(Icons.edose, 'Volcanic activity', Flags.canada, "Stuttgart, Germany", "05/01/2020 09:30:36 AM", <Progress value={15} />, "See report"),
 ];

export default rows;