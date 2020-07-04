async function loaderJSON() {

    let dataHeights = ["50","100", "150"]
    // let dataHeights = ["50","100","150","200","250","300","350","400"]
    let heights = [];

    for (var k = 0; k < dataHeights.length; k++) {

        const initialFilename = dataHeights[k] + ".000000-0.200000-20200603000000-0none"
        const commonString = dataHeights[k] + ".000000-0.200000-2020"
        const initialDate = initialFilename.split("2020")[1].split("-0none")[0].substring(0, 4) //0603
        const initialMonth = initialDate.substring(0, 2) //06
        const initialDay = initialDate.substring(2, 4) // 03
        const initialTime = initialFilename.split("2020")[1].split("-0none")[0].substring(4, 10) // 010000
        const initialHour = initialTime.substring(0, 2) // 01
        const initialMin = initialTime.substring(2, 4) // 01
        const initialSec = initialTime.substring(4, 6) // 01
        let array = [];

        // 2days measurements
        for (var j = 0; j < 2; j++) {
            // 24h/day measurements
            for (var i = 0; i < 24; i++) {
                var currentDay = "0" + (parseInt(initialDay) + j).toString();
                var currentHour = (i < 10 ? "0" : "") + (parseInt(initialHour) + i).toString();
                var ID = commonString + initialMonth + currentDay + currentHour + initialMin + initialSec

                if (j === 1 && i === 23) {}
                else {
                    const geoJSON = await import("../../../assets/data/Volcanic/contours/" + ID + "-0none.json")
                    array.push(geoJSON)
                }
            }
        }
      
        heights.push({height: dataHeights[k], data: array});
    }

    return heights;
}

export default loaderJSON;