// import airportsJSON from "../../assets/data/airports/airports.json";

async function loaderJSON() {
    // const rows: any = airportsJSON;
    var data = []
  
    //  function unpack(row, key) {
    //    return [row].map(function (row) { return row[key]; });
    //  }
  
    //   rows.airports.map(function (row) {
    //     data.push({
    //        showLegend: false,
    //        type: 'scattermapbox',
    //        name: unpack(row, 'name'),
    //         lat: unpack(row, 'lat'),
    //         lon: unpack(row, 'lon')
    //     });
    //   });

      data = [{
      type: 'scattermapbox'
      }]
     
    return data
}

export default loaderJSON;