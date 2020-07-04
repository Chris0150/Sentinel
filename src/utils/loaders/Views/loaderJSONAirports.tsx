
import loaderAirports from '../../../assets/data/Views/airports/airports.json'

let features = []

loaderAirports.forEach(function (airportCoords) {
  features.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [ airportCoords.lon, airportCoords.lat ]
    },
    properties: {
      id: airportCoords._id,
      lon: airportCoords.lon,
      lat: airportCoords.lat,
      iata: airportCoords.iata,
      place: airportCoords.name
    }
  })
})

let airports = {
  features: features,
  type: "FeatureCollection"
}


export default airports;