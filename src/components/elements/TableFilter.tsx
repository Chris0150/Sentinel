import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const themeTable = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&:hover": {
          color: "orange",
          borderColor: "orange",
          borderStyle: "solid",
          borderWidth: 0.1,
        }
      }
    }
  }
});

interface Row {
  icao: string;
  date: string;
  dosage: any;
  impacted: any;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function MaterialTableDemo(props) {
  const { onSelectRow } = props;
  const redPoint = <FiberManualRecordIcon style={{ width: 15, height: 15, color: "red" }} />
  const orangePoint = <FiberManualRecordIcon style={{ width: 15, height: 15, color: "orange" }} />
  const greenPoint = <FiberManualRecordIcon style={{ width: 15, height: 15, color: "green" }} />
  const [state] = React.useState<TableState>({
    columns: [
      { title: 'Icao', field: 'icao', cellStyle: { fontSize: 12, borderWidth: 0, width: 20, minWidth: 20, paddingLeft: 30, paddingRight: 0 } },
      { title: 'Date', field: 'date', cellStyle: { fontSize: 12, borderWidth: 0, width: 125, minWidth: 125, paddingLeft: 10, paddingRight: 0 } },
      { title: 'Dosage (g/cm2)', field: 'dosage', cellStyle: { fontSize: 12, borderWidth: 0, width: 20, minWidth: 20, paddingLeft: 40, paddingRight: 0 } },
      { title: 'Impacted \n(C>0.2mg/m3)', field: 'impacted', cellStyle: { fontSize: 12, borderWidth: 0, paddingLeft: 50, paddingRight: 0 } },

    ],
    data: [
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 3.125, impacted: redPoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 4.575, impacted: redPoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 4.159, impacted: orangePoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 8.465, impacted: redPoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 5.728, impacted: greenPoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 8.155, impacted: orangePoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 3.425, impacted: orangePoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 8.625, impacted: redPoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 6.165, impacted: greenPoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 7.125, impacted: redPoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 8.125, impacted: orangePoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 3.189, impacted: redPoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 9.895, impacted: greenPoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 6.725, impacted: orangePoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 9.165, impacted: greenPoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 9.105, impacted: redPoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 9.195, impacted: orangePoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 6.725, impacted: redPoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 9.165, impacted: greenPoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 9.105, impacted: orangePoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 9.195, impacted: redPoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 6.725, impacted: orangePoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 9.165, impacted: orangePoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 9.105, impacted: redPoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 9.195, impacted: greenPoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 6.725, impacted: orangePoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 9.165, impacted: redPoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 9.105, impacted: redPoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 9.195, impacted: greenPoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 6.725, impacted: orangePoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 9.165, impacted: orangePoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 9.105, impacted: greenPoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 9.195, impacted: greenPoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 6.725, impacted: orangePoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 9.165, impacted: greenPoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 9.105, impacted: greenPoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 9.195, impacted: orangePoint },
      { icao: 'QFA41', date: '14-02-20 07:05:10', dosage: 6.725, impacted: redPoint },
      { icao: 'QFA9-i', date: '14-02-20 07:05:10', dosage: 9.165, impacted: orangePoint },
      { icao: 'QFA42', date: '14-02-20 07:05:10', dosage: 9.105, impacted: greenPoint },
      { icao: 'QFA38', date: '14-02-20 07:05:10', dosage: 9.195, impacted: redPoint },
    ],
  });

  return (
    <div style={{ right: "0.8%", top: "10%", width: 460, position: "absolute" }}>
      <MuiThemeProvider theme={themeTable}>
        <MaterialTable
          title={
            <Typography style={{
              width: 120,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "Segoe UI"
            }}>
              Filter by Nº Flight
               </Typography>
          }
          data={state.data}
          columns={state.columns}
          onRowClick={onSelectRow}
          style={{
            overflowY: "auto",
            color: "lightgrey",
            fontFamily: "Segoe UI",
            backgroundColor: "#454545a8",
            height: window.innerHeight - 260
          }}
          options={{
            paging: false,
            padding: "dense",
            exportButton: false,
            searchAutoFocus: false,
            'rowStyle': {
              cursor: "pointer"
            },
            'headerStyle': {
              fontSize: 12,
              paddingLeft: 30,
              paddingRight: 0,
              color: "lightgrey",
              fontFamily: "Segoe UI",
              backgroundColor: 'transparent'
            },
            'searchFieldStyle': {
              width: 200,
              fontSize: 14,
              color: "white",
              fontFamily: "Segoe UI"
            }
          }}
        />
      </MuiThemeProvider>
    </div>
  );
}
