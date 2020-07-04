
//import loaderTrajectories from '../../../assets/data/Views/trajectories/trajectories.json'

 let features:any = []
 let flights = {
  features: [],
  type: "FeatureCollection"
}

async function loaderJSONTrajectories() {
     let loaderTrajectories:any = await import("../../../assets/data/Views/trajectories/trajectories.json");

    loaderTrajectories.default.features.forEach(function (lineFlight:any) {
         let featureCoords = lineFlight.geometry.coordinates[0];
         if (featureCoords) {
            //a feature is a polygon defined by m vertices (x,y coords)
            features.push({
             type: "Feature",
             geometry: {
               type: "LineString",
               coordinates: lineFlight.geometry.coordinates
             }
           })
         }
       });

       flights = {
        features: features,
        type: "FeatureCollection"
      }
      return flights;
 }

export default loaderJSONTrajectories;  