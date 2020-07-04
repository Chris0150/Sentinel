import React from 'react';
import Plot from "react-plotly.js";
// import flightDetails from "../../assets/data/Views/flights/flightDetail.json";
import configurationJSON from "../../utils/loaders/config.json";

const TableDetails: React.FC = (): JSX.Element => {
  const [data, setData] = React.useState([]);
  const [layout, setLayout] = React.useState({});
  const [config, setConfig] = React.useState({});
  
  React.useEffect(() => {
    const chartConfig = configurationJSON.config;

    async function setChart() {

      // function unpack(rows, key) {
      //   return rows.map(function (row) { return row[key]; });
      // }

      var chartData = [{
        // type: "scatter",
        // mode: "lines",
        // name: 'Trajectory Analysis',
        // x: unpack(flightDetails, 'x'),
        // y: unpack(flightDetails, 'y'),
        // line: { color: '#F9D158' }
      }]

      var chartLayout = {
        title: {
          text: "Trajectory Analysis",
          font: {
            color: "#F9D158"
          }
        },
        height: 350,
        textfont: {
          color: "#F9D158",
          family: "Segoe UI",
        },
        width: 650,
        plot_bgcolor: "transparent",
        paper_bgcolor: "rgba(69, 69, 69, 0.86)"
      };

      setData(chartData);
      setLayout(chartLayout);
      setConfig(chartConfig);
    }
    setChart();
  }, []);

  return <Plot data={data} layout={layout} config={config}/>
};

export default TableDetails;