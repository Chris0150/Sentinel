
import jsonTrajectories from '../../../assets/data/Views/trajectories/trajectories.json'

//TODO: lazy import of this..
// let trajectories = jsonTrajectories;
// let loadercontoursTrajectories = []

async function loaderJSONTrajectories() {
    let array = await import("../../../assets/data/Views/trajectories/trajectories.json");
    debugger
    
    // trajectories.features.forEach(function(feature:any){
    //     if(feature.features[0].geometry.coordinates && feature.features[0].geometry.coordinates[0]){
    //         loadercontoursTrajectories.push(feature.features[0].geometry.coordinates[0])
    //     }
    // });
}

export default loaderJSONTrajectories;  