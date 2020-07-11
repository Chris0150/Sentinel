
import geojsonContours50 from '../../../assets/data/Views/contours/50.json'
import geojsonContoursUNION from '../../../assets/data/Views/contours/UNION.json'
import geojsonContoursVAAC from '../../../assets/data/Views/contours/VAAC.json'

let contours50 = geojsonContours50;
let contoursUNION = geojsonContoursUNION;
let contoursVAAC = geojsonContoursVAAC;
let loaderContoursVAAC = []
let loaderContours50 = []
let loaderContoursUNION = []

// Contours FL-50
// contours50.features.forEach(function(feature){
//     loaderContours50.push(feature.features[0].geometry.coordinates[0])
// })

let feature = contours50.features[0];
    loaderContours50.push(feature.features[0].geometry.coordinates[0])

// Contours FL-100
// contoursUNION.features.forEach(function(feature){
//     loaderContoursUNION.push(feature.features[0].geometry.coordinates[0])
// })

let feature2 = contoursUNION.features[0];
    loaderContoursUNION.push(feature2.features[0].geometry.coordinates[0])


// FL-70 (VAAC)
contoursVAAC.features.forEach(function(feature){
    loaderContoursVAAC.push(feature.features[0].geometry.coordinates[0])
})

export { loaderContours50, loaderContoursUNION, loaderContoursVAAC };