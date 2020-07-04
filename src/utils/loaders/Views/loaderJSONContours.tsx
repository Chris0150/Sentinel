
import geojsonContours50 from '../../../assets/data/Views/contours/50.json'
import geojsonContoursUNION from '../../../assets/data/Views/contours/UNION.json'

let contours50 = geojsonContours50;
let contoursUNION = geojsonContoursUNION;
let loaderContours50 = []
let loaderContoursUNION = []

contours50.features.forEach(function(feature){
    loaderContours50.push(feature.features[0].geometry.coordinates[0])
})

contoursUNION.features.forEach(function(feature){
    loaderContoursUNION.push(feature.features[0].geometry.coordinates[0])
})

export { loaderContours50, loaderContoursUNION };