
import loaderAreas from '../../../assets/data/Views/areas/areas.json'

let features = []

// area: {min_lon: 60, min_lat: 20, max_lon: 160, max_lat: 86}
// country: "Ryukyu Is"
// elevation: 799
// latitude: 29.635
// longitude: 129.716
// name: "Suwanose-jima"
// sources: [{_id: "vaac", desc: "Volcanic Ash Advisory for volcano: 282030", name: "vaac",…}]
// type: "Stratovolcanoes"
// _id: 282030

loaderAreas.forEach(function (area) {

    if (area.volcanoes.length > 0) {
        area.volcanoes.forEach(function (volcano) {

            features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [volcano.longitude, volcano.latitude]
                },
                properties: {
                    id: volcano._id,
                    type: volcano.type,
                    lon: volcano.longitude,
                    lat: volcano.latitude,
                    country: volcano.country,
                    place: volcano.name,
                    elevation: volcano.elevation,
                    sources: volcano.sources
                }
            })
        })
    }
})

let volcanoes = {
    features: features,
    type: "FeatureCollection"
}


export default volcanoes;