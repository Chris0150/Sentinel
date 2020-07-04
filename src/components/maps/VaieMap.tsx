import React, { Suspense } from "react";
import * as Utils from "../../utils/utils";
import Plot from "react-plotly.js";
import Loader from "../elements/Loader";
import Popover from "../elements/Popover";
import TableInfo from "../elements/TableDetails";
import TableFilter from "../elements/TableFilter";

const chartConfig = Utils.configJSONMap.config;
const colorsHigh = Object.values(Utils.constants.colors);
const colorsLow = Object.values(Utils.constants.colorsFaded);

interface IVaieMap {
  layers?: []
  airports?: []
  flightlevels?: []
  vaac?: string
  source?: string
  volcano?: string
  topography?: string
  showFlights?: boolean
  showAirports?: boolean
  showVaacOverlay?: boolean
  preloadedData?: {
    arrayJSONAirports: []
    arrayJSONContours: {
      data: any[]
      height: string
    }[]
    arrayJSONFlightsList: {
      geometry: {
        coordinates: {}[]
      }
    }[]
  }
}

const Map = (props: IVaieMap): JSX.Element => {
  const {
    vaac,
    source,
    layers,
    volcano,
    topography,
    flightlevels,
    preloadedData,
    showVaacOverlay,
    showAirports,
    showFlights
  } = props;

  const [data, setData] = React.useState([]);
  const [config, setConfig] = React.useState({});
  const [layout, setLayout] = React.useState({});
  const [mapLayers, setMapLayers] = React.useState([]);
  const [showFlightDetailsPopover, setShowFlightDetailsPopover] = React.useState(false);
  const arrayJSONAirports = preloadedData.arrayJSONAirports;
  const arrayJSONContours = preloadedData.arrayJSONContours;
  const arrayJSONFlightsList = preloadedData.arrayJSONFlightsList;

  
  ///////////////////////// Config hook /////////////////////////////////////
  React.useEffect(() => {
    setConfig(chartConfig);
  }, [])
  ////////////////////////// Layout hook ///////////////////////////////////
  React.useEffect(() => {
    var chartLayout = {
      height: window.innerHeight - 50,
      width: window.innerWidth,
      margin: {
        r: 0,
        t: 0,
        b: 0,
        l: 0
      },
      mapbox: {
        style: topography,
        center: {
          lon: 112.90,
          lat: -8.15
        },
        zoom: 6,
        pitch: 30,
        layers: mapLayers
      }
    };
    setLayout(chartLayout);
  }, [topography, mapLayers])
  ///////////////////////// Airports hook ///////////////////////////////////
  React.useEffect(() => {
    setData(arrayJSONAirports);
  }, [arrayJSONAirports])
  ///////////////////////// Show VAAC Overlay hook /////////////////////////
  React.useEffect(() => {
  }, [showVaacOverlay])
  ///////////////////////// Show Flights hook //////////////////////////////
  React.useEffect(() => {
  }, [showFlights])
  ///////////////////////// Show Airports hook /////////////////////////////
  React.useEffect(() => {
  }, [showAirports])
  ///////////////////////// Layers hook //////////////////////////////////////
  React.useEffect(() => {

    async function setChart() {
      let counter = 0;
      let featuresFL = []
      let featuresFlight = []

      ///////////////////////////////////// Flights List /////////////////////////////
        
      arrayJSONFlightsList.forEach(function (lineFlight) {
        let featureCoords = lineFlight.geometry.coordinates[0];
        if (featureCoords) {
          // a feature is a polygon defined by m vertices (x,y coords)
          featuresFlight.push({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: lineFlight.geometry.coordinates
            }
          })
        }
      });

      // each Flight Level has n features -> 1layer for all flight lines
      let flightsLayer = {
        sourceType: "geojson",
        source: {
          type: "FeatureCollection",
          features: featuresFlight
        },

        fill: "none",
        type: "line",
        color: "grey",
        line: {
          dash: [1, 1, 1]
        }
      }

      var layerFlights: any = layers;
      layerFlights.push(flightsLayer)
      setMapLayers(layerFlights)

      ////////////////////////////////// Contours List ////////////////////////////////
      arrayJSONContours.forEach(function (JSONflightLevel) {
        counter++;

        flightlevels.forEach(function (flightLevel) {

          if (flightLevel === JSONflightLevel.height) {

            // each height level has n features 
            JSONflightLevel.data.forEach(function (feature) {
              let featureCoords = feature.default.features[0].geometry.coordinates[0];
              if (featureCoords) {
                // a feature is a polygon defined by m vertices (x,y coords)
                featuresFL.push({
                  type: "Feature",
                  geometry: {
                    type: "MultiPolygon",
                    coordinates: [[featureCoords[0]]]
                  }
                })
              }
            });

            // each Flight level has n features
            let contoursLayer = {
              source: {
                type: "FeatureCollection",
                features: featuresFL
              },
              type: "fill",
              fill: { outlinecolor: colorsLow[counter - 1] },
              color: colorsLow[counter - 1],
              colorLegend: colorsHigh[counter - 1],
              height: JSONflightLevel.height
            }
            var layerContours: any = layers;
            layerContours.push(contoursLayer)
            setMapLayers(layerContours)
          }
        });
      });

    }
    setChart();
  }, [vaac, source, layers, volcano, topography, flightlevels, arrayJSONContours, arrayJSONFlightsList]);

  return (
    <>
      <Suspense fallback={<Loader />}>

        {/* Map */}
        <Plot style={{ margin: 0, cursor: "grab" }} data={data} layout={layout} config={config} />

        {/* Flights Table popover (right) */}
        <Popover
          top={25}
          right={15}
          width={450}
          backgroundColor={"#454545a8"}
          height={window.innerHeight - 125}
          children={<TableFilter onSelectRow={() => setShowFlightDetailsPopover(true)} />}
        />

        {/* Flight Details Table popover (left) */}
        {showFlightDetailsPopover ?
          <Popover
            left={10}
            top={440}
            width={672}
            height={373}
            children={<TableInfo />}
            backgroundColor={"red"}
          />
          : null}

      </Suspense>
    </>
  )

};

export default Map;