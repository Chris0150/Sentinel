import * as React from "react";
import ReactMapboxGl, {
  Feature,
  Popup,
  Layer,
  GeoJSONLayer,
  ZoomControl,
  RotationControl,
} from "react-mapbox-gl";
import {
  loaderContours50,
  loaderContoursUNION,
  loaderContoursVAAC,
} from "../../utils/loaders/Views/loaderJSONContours";
import { mapStyles, configJSONMap } from "../../utils/utils";
import loaderTrajectories from "../../utils/loaders/Views/loaderJSONTrajectories";
import loaderAirports from "../../utils/loaders/Views/loaderJSONAirports";
import loaderAreas from "../../utils/loaders/Views/loaderJSONAreas";
import AnimationPlayer from "../elements/AnimationPlayer";
import TableFilter from "../elements/TableFilter";
import Button from "@material-ui/core/Button";
import Point from "@material-ui/icons/FiberManualRecord";

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// INTERFACES ////////////////////////////////////

export interface MapMouseEvent extends React.MouseEvent<HTMLElement> {
  features: {
    properties: {
      lon: any;
      lat: any;
      place: any;
      iata?: any;
      elevation?: any;
      country?: any;
      type?: any;
    };
  }[];
}
export interface IState {
  popup: any;
  zoom: [number];
  pitch: [number];
  terrain: string;
  customLayers: [];
  trajectories: any;
  showPopup: boolean;
  renderLayer: boolean;
  showAirports: boolean;
  flightLevels: string[];
  center: [number, number];
  showVAACOverlay: boolean;
  showTrajectories: boolean;
  showPopup3DView: boolean;
  showPopupFlights: boolean;
}
export interface IProps {
  terrain: string;
  customLayers: any;
  flightLevels: string[];
  showAirports: boolean;
  showVAACOverlay: boolean;
  showTrajectories: boolean;
  onStyleLoad?: (map: any) => any;
}

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// COMPONENT /////////////////////////////////////

class ViewsMap extends React.Component<IProps, IState> {
  /**
   * Map state object.
   * @interface IState
   * @public
   */
  public state: IState = {
    pitch: [0],
    zoom: [1.6],
    center: center,
    showPopup: false,
    renderLayer: true,
    showPopup3DView: false,
    showPopupFlights: false,
    trajectories: undefined,
    terrain: this.props.terrain,
    customLayers: this.props.customLayers,
    flightLevels: this.props.flightLevels,
    showAirports: this.props.showAirports,
    showVAACOverlay: this.props.showVAACOverlay,
    showTrajectories: this.props.showTrajectories,
    popup: { coords: [0, 0], title: "", text: "" },
  };

  /**
   * Lifecycle method.
   * @param {}
   * @public
   */
  public async componentDidMount() {
    const jsonTrajectories = await loaderTrajectories();
    this.setState({ trajectories: jsonTrajectories });
  }

  /**
   * Load map internal styles.
   * @param {any} map The map object to style.
   * @private
   */
  private onMapStyleLoad = (map: any) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  /**
   * Select an aiport directly in map.
   * @param {MapMouseEvent} event The map click event.
   * @public
   */
  public onClickAirport = (event: MapMouseEvent) => {
    const airportProperties:any = event.features[0].properties;
    const airportLongitude:number = airportProperties.lon;
    const airportLatitude:number = airportProperties.lat;
    const airportName:string = airportProperties.place;
    const airportIata:string = airportProperties.iata;

    this.setState({
      zoom: [16],
      pitch: [60],
      center: [airportLongitude, airportLatitude],
      showPopup: true,
      popup: {
        type: "airport",
        coords: [airportLongitude, airportLatitude],
        title: "Aiport: " + airportName + " (" + airportIata + ")",
        text: "coordinates: [" + [airportLongitude, airportLatitude] + "]",
        text2: "Impact: ",
        text3: "(C = 0mg/m3)",
      },
    });
  };

  /**
   * Select a volcano directly in map.
   * @param {MapMouseEvent} event The map click event.
   * @public
   */
  public onClickVolcano = (event: MapMouseEvent) => {
    const volcanoProperties:any = event.features[0].properties;
    const volcanoElevation:number = volcanoProperties.elevation;
    const volcanoCountry:string = volcanoProperties.country;
    const volcanoLongitude:number = volcanoProperties.lon;
    const volcanoLatitude:number = volcanoProperties.lat;
    const volcanoName:string = volcanoProperties.place;
    const volcanoType:string = volcanoProperties.type;

    this.setState({
      zoom: [10],
      pitch: [45],
      showPopup: true,
      center: [volcanoLongitude, volcanoLatitude],
      popup: {
        type: "volcano",
        title: "Volcano: " + volcanoName,
        coords: [volcanoLongitude, volcanoLatitude],
        text: "coordinates: [" + [volcanoLongitude, volcanoLatitude] + "]",
        text2: "Type: " + volcanoType,
        text4: "Elevation: " + volcanoElevation + "m",
        text5: "Country: " + volcanoCountry,
      },
    });
  };

  /**
   * Click the button "Show 3D-View" in Volcano popup.
   * @param {React.MouseEvent} event The button click event.
   * @public
   */
  public onPopupShow3DView = (event: React.MouseEvent) => {
    this.setState({ showPopup3DView: true });
  };

  /**
   * Click the button "Show Flights" in Airport popup.
   * @param {React.MouseEvent} event The button click event.
   * @public
   */
  public onPopupShowFlights = (event: React.MouseEvent) => {
    this.setState({ showPopupFlights: true });
  };

  /**
   * Start the animation in AnimationPlayer component.
   * @param {React.MouseEvent} event The button click event.
   * @public
   */
  public onAnimate = (event: React.MouseEvent) => {
    // ...
  };

  /**
   * Lifecycle method.
   * @param {}
   * @public
   */
  public render() {
    let {
      center,
      zoom,
      pitch,
      trajectories,
      popup,
      showPopup,
      showPopup3DView,
    } = this.state;
    let {
      showTrajectories,
      showAirports,
      showVAACOverlay,
      terrain,
      flightLevels,
      // customLayers
    } = this.props;

    return (
      <div
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          position: "relative",
        }}
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
          {showPopup3DView ? <></> : null}

          {/* CUSTOM LAYERS */}
          {/* {customLayers} */}

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
        <AnimationPlayer animate={this.onAnimate} />
      </div>
    );
  }
}

export default ViewsMap;

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// CONSTANTS ////////////////////////////////////

const token = configJSONMap.config.mapboxAccessToken;
const Map = ReactMapboxGl({
  accessToken: token,
  attributionControl: false,
  minZoom: 1.6,
});
const styles = mapStyles;
const center = [41.38, 2.17] as [number, number];
const symbolPaint = { "text-color": "black" };
const circleLayout = { visibility: "visible" };
const symbolPaintVolcano = { "text-color": "black" };
const circleLayoutVolcano = { visibility: "visible" };
const symbolLayoutVolcano = {
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
const circlePaintVolcano = {
  "circle-color": "#ff7800",
  "circle-radius": 10,
  "circle-stroke-color": "white",
  "circle-stroke-width": 1,
  "circle-opacity": 0.5,
};
const symbolLayout = {
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
const circlePaint = {
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
  // "fill-color": "blue",
  "fill-color": "#dacea9",

  // "fill-opacity": 0.1,
  "fill-opacity": 0.5,
};
const contoursPaintUNION = {
  "fill-color": "red",
  // "fill-opacity": 0.05,
  "fill-opacity": 0.2,
};
const contoursPaintVAAC = {
  // "fill-color": "purple",
  "fill-color": "#cfbdbd",
  "fill-opacity": 0.3,
  // 'line-dasharray': [2, 1],
  // "fill-opacity": 0.05,
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
