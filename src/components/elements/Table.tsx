import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';

interface IRow {
  icon: string
  name: string
  date: string
  progress: any
  details: string
  location: string
  locationName: string
}

interface ITable {
  rows: IRow[]
}

const TableRows:React.FC<ITable> = (props:ITable):JSX.Element =>{
  const classes = useStyles();
  const { rows } = props;

  return (

    <MuiThemeProvider theme={themeTable}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: "10%" }}></StyledTableCell>
              <StyledTableCell style={{ width: "20%" }}>Last Events</StyledTableCell>
              <StyledTableCell style={{ width: "20%" }}>Location</StyledTableCell>
              <StyledTableCell style={{ width: "20%" }}>Event timestamp</StyledTableCell>
              <StyledTableCell style={{ width: "20%" }}>Threshold reached</StyledTableCell>
              <StyledTableCell style={{ width: "30%" }}>Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.body}>
            {rows.map((row) => (
              <StyledTableRow key={Math.random()}>
                <StyledTableCell>
                  <img src={row.icon} alt="" style={{width: 30, height: 30}} />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>
                  <img src={row.location} alt="" style={{ width: 20, height: 15, marginRight: 10 }} />
                  {row.locationName}
                </StyledTableCell>
                <StyledTableCell>
                  {row.date}
                </StyledTableCell>
                <StyledTableCell>
                  {row.progress}
                </StyledTableCell>
                <StyledTableCell>
                  {row.details}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MuiThemeProvider>
  );
}

export default TableRows;

const themeTable = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&:hover": {
          cursor: "pointer"
        }
      },
    },
    MuiPaper: {
      root: {
       backgroundColor: "#000000c2"
      },
    }
  }
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      fontWeight: 700,
      backgroundColor: "#404243",
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14,
      color: "wheat",
      fontFamily: "Segoe UI"
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "3px solid #404243"
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    border: "4px solid #404243",
  },
  body: {
    fontFamily: "Segoe UI",
  }
});