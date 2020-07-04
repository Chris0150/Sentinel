import * as React from "react";
import * as MapboxGL from "mapbox-gl";
import ReactMapboxGl, {
  Feature,
  Popup,
  Layer,
  GeoJSONLayer,
  ZoomControl,
  RotationControl,
} from "react-mapbox-gl";
import { mapStyles, configJSONMap } from "../../utils/utils";
import {
  loaderContours50,
  loaderContoursUNION,
  loaderContoursVAAC
} from "../../utils/loaders/Views/loaderJSONContours";
import loaderTrajectories from "../../utils/loaders/Views/loaderJSONTrajectories";
import loaderAirports from "../../utils/loaders/Views/loaderJSONAirports";
import loaderAreas from "../../utils/loaders/Views/loaderJSONAreas";
import AnimationPlayer from "../elements/AnimationPlayer";
import TableFilter from "../elements/TableFilter";
import Button from "@material-ui/core/Button";
import Point from "@material-ui/icons/FiberManualRecord";
// import Geo from "../elements/_geoView"

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// INTERFACES ////////////////////////////////////

export interface State {
  popup?: any
  zoom?: [number]
  pitch?: [number]
  terrain?: string
  trajectories?: any
  showPopup?: boolean
  renderLayer: boolean
  showAirports?: boolean
  flightLevels?: string[]
  center?: [number, number]
  showVAACOverlay?: boolean
  showTrajectories?: boolean
  showPopup3DView?: boolean
  showPopupFlights?: boolean
}
export interface Props {
  terrain?: string
  flightLevels?: string[]
  showAirports?: boolean
  showVAACOverlay?: boolean
  showTrajectories?: boolean
  onStyleLoad?: (map: any) => any
}

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// COMPONENT /////////////////////////////////////

class ViewsMap extends React.Component<Props, State> {
  public state: State = {
    zoom: [6],
    pitch: [0],
    center: center,
    showPopup: false,
    renderLayer: true,
    showPopup3DView: false,
    showPopupFlights: false,
    trajectories: undefined,
    terrain: this.props.terrain,
    flightLevels: this.props.flightLevels,
    showAirports: this.props.showAirports,
    showVAACOverlay: this.props.showVAACOverlay,
    showTrajectories: this.props.showTrajectories,
    popup: { coords: [0, 0], title: "", text: "" },
  };

  public async componentDidMount() {
    let jsonTrajectories = await loaderTrajectories();
    this.setState({ trajectories: jsonTrajectories });
  }

  private onMapStyleLoad = (map: any) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  public onClickAirport = (e: any) => {
    let airportProperties = e.features[0].properties;

    this.setState({
      zoom: [16],
      pitch: [60],
      center: [airportProperties.lon, airportProperties.lat],
      showPopup: true,
      popup: {
        type: "airport",
        title:
          "Aiport: " +
          airportProperties.place +
          " (" +
          airportProperties.iata +
          ")",
        text:
          "coordinates: [" +
          [airportProperties.lon, airportProperties.lat] +
          "]",
        coords: [airportProperties.lon, airportProperties.lat],
        text2: "Impact: ",
        text3: "(C = 0mg/m3)",
      },
    });
  };

  public onClickVolcano = (e: any) => {
    let volcanoProperties = e.features[0].properties;

    this.setState({
      zoom: [8],
      pitch: [60],
      center: [volcanoProperties.lon, volcanoProperties.lat],
      showPopup: true,
      popup: {
        type: "volcano",
        title: "Volcano: " + volcanoProperties.place,
        text:
          "coordinates: [" +
          [volcanoProperties.lon, volcanoProperties.lat] +
          "]",
        coords: [volcanoProperties.lon, volcanoProperties.lat],
        text2: "Type: " + volcanoProperties.type,
        text4: "Elevation: " + volcanoProperties.elevation + "m",
        text5: "Country: " + volcanoProperties.country,
      },
    });
  };

  public onPopupShow3DView = (e: any) => {
    this.setState({ showPopup3DView: true });
  };

  public onPopupShowFlights = (e: any) => {
    this.setState({ showPopupFlights: true });
  };

  public render() {
    let {showTrajectories,showAirports,showVAACOverlay, terrain,flightLevels} = this.props;
    let {center,zoom,pitch,trajectories,popup,showPopup,showPopup3DView} = this.state;

    return (
      <div
        style={{ position: "relative", flex: 1, height: "100%", width: "100%" }}
      >
        {/* MAIN MAP */}
        <Map
          zoom={zoom}
          pitch={pitch}
          center={center}
          style={styles[terrain]}
          containerStyle={{ height: "100%", width: "100%" }}
          onStyleLoad={this.onMapStyleLoad}
          onClick={() =>
            showPopup &&
            this.setState({
              showPopup: !showPopup,
              showPopup3DView: !showPopup3DView,
            })
          }
        >
          {/* MAP INFO POPUP */}
          {showPopup ? (
            <Popup
              coordinates={[popup.coords[0], popup.coords[1]]}
              offset={{
                "bottom-left": [12, -38],
                bottom: [0, -38],
                "bottom-right": [-12, -38],
              }}
            >
              <h2>{popup.title}</h2>
              <h3>{popup.text}</h3>
              {popup.type === "airport" ? (
                <div style={{ display: "inline-flex" }}>
                  <h3>{popup.text2}</h3>
                  <Point
                    style={{
                      width: 25,
                      height: 25,
                      color: "green",
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  />
                  <h3>{popup.text3}</h3>
                </div>
              ) : null}
              {popup.type === "volcano" ? (
                <div>
                  <h3>{popup.text2}</h3>
                  <h3>{popup.text4}</h3>
                  <h3>{popup.text5}</h3>
                </div>
              ) : null}
              {popup.type === "volcano" ? (
                <div>
                  {popup.actions}
                  <Button
                    onClick={this.onPopupShow3DView}
                    style={{
                      marginTop: 15,
                      textTransform: "inherit",
                      width: "100%",
                      background: "#ff780080",
                    }}
                  >
                    Show 3D-View
                  </Button>
                </div>
              ) : (
                <div>
                  {popup.actions}
                  <Button
                    onClick={this.onPopupShowFlights}
                    style={{
                      marginTop: 15,
                      textTransform: "inherit",
                      width: "100%",
                      background: "#00800080",
                    }}
                  >
                    Show Flights
                  </Button>
                </div>
              )}
            </Popup>
          ) : null}

          {/* 3D-VIEW POPUP */}
          {showPopup3DView ? 
          <>
            {/* <Geo /> */}
            <div id="canvas" />
          </>
           : null}

          {/* LAYER 3D-BUILDINGS */}
          <Layer
            minZoom={14}
            id="3d-buildings"
            sourceId="composite"
            type="fill-extrusion"
            sourceLayer="building"
            paint={buildingsPaint}
            filter={["==", "extrude", "true"]}
          />

          {/* LAYER CONTOURS FL-50 */}
          {flightLevels.includes("50") ? (
            <Layer type="fill" paint={contoursPaint50}>
              <Feature coordinates={loaderContours50} />
            </Layer>
          ) : null}

          {/* LAYER CONTOURS FL-UNION */}
          {flightLevels.includes("UNION") ? (
            <Layer type="fill" paint={contoursPaintUNION}>
              <Feature coordinates={loaderContoursUNION} />
            </Layer>
          ) : null}

          {/* LAYER CONTOURS FL-50 */}
          {showVAACOverlay ? (
            <Layer type="fill" paint={contoursPaintVAAC}>
              <Feature coordinates={loaderContoursVAAC} />
            </Layer>
          ) : null}

          {/* LAYER TRAJECTORIES */}
          {showTrajectories ? (
            <GeoJSONLayer
              data={trajectories}
              linePaint={trajectoriesPaint}
              lineLayout={trajectoriesLayout}
            />
          ) : null}

          {/* LAYER AIRPORTS */}
          {showAirports ? (
            <GeoJSONLayer
              data={loaderAirports}
              symbolPaint={symbolPaint}
              symbolLayout={symbolLayout}
              circlePaint={circlePaint}
              circleLayout={circleLayout}
              circleOnClick={this.onClickAirport}
            />
          ) : null}

          {/* LAYER VOLCANOES */}
          <GeoJSONLayer
            data={loaderAreas}
            symbolPaint={symbolPaintVolcano}
            symbolLayout={symbolLayoutVolcano}
            circlePaint={circlePaintVolcano}
            circleLayout={circleLayoutVolcano}
            circleOnClick={this.onClickVolcano}
          />

          {/* ZOOM AND ROTATION CONTROLS */}
          <ZoomControl />
          <RotationControl style={{ top: 10, right: 50 }} />
        </Map>

        {/* FLIGHTS LIST TABLE */}
        {showTrajectories ? <TableFilter /> : null}

        {/* ANIMATION PLAYER */}
          <AnimationPlayer />
      </div>
    );
  }
}

export default ViewsMap;

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// CONSTANTS ////////////////////////////////////

const styles = mapStyles;
const center = [127.72, 1.597] as [number, number];
const token = configJSONMap.config.mapboxAccessToken;
const Map = ReactMapboxGl({ accessToken: token });
const symbolPaint: MapboxGL.SymbolPaint = { "text-color": "black" };
const circleLayout: MapboxGL.CircleLayout = { visibility: "visible" };
const symbolPaintVolcano: MapboxGL.SymbolPaint = { "text-color": "black" };
const circleLayoutVolcano: MapboxGL.CircleLayout = { visibility: "visible" };
const symbolLayoutVolcano: MapboxGL.SymbolLayout = {
  "text-field": [
    "format",
    ["get", "place"],
    { "font-scale": 0.8 },
    "\n",
    {},
    ["get", "iata"],
    { "font-scale": 0.6 },
  ],
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 0.6],
  "text-anchor": "top",
};
const circlePaintVolcano: MapboxGL.SymbolPaint = {
  "circle-color": "#ff7800",
  "circle-radius": 10,
  "circle-stroke-color": "white",
  "circle-stroke-width": 1,
  "circle-opacity": 0.5,
};
const symbolLayout: MapboxGL.SymbolLayout = {
  "text-field": [
    "format",
    ["get", "place"],
    { "font-scale": 0.8 },
    "\n",
    {},
    ["get", "iata"],
    { "font-scale": 0.6 },
  ],
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 0.6],
  "text-anchor": "top",
};
const circlePaint: MapboxGL.CirclePaint = {
  "circle-color": "black",
  "circle-radius": 3,
  "circle-stroke-color": "white",
  "circle-stroke-width": 1,
  "circle-opacity": 0.5,
};
const buildingsPaint = {
  "fill-extrusion-color": "#aaa",
  "fill-extrusion-height": {
    type: "identity" as "identity",
    property: "height",
  },
  "fill-extrusion-base": {
    type: "identity" as "identity",
    property: "min_height",
  },
  "fill-extrusion-opacity": 0.6,
};
const contoursPaint50 = {
  "fill-color": "blue",
  "fill-opacity": 0.1,
};
const contoursPaintUNION = {
  "fill-color": "red",
  "fill-opacity": 0.05,
};
const contoursPaintVAAC= {
  "fill-color": "purple",
  "fill-opacity": 0.05,
};
const trajectoriesPaint = {
  "line-color": "#888",
  "line-width": 2,
  "line-dasharray": [0.1, 1.8],
};
const trajectoriesLayout = {
  "line-join": "round",
  "line-cap": "round",
};
