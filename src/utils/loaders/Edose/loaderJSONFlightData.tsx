
async function loaderJSONFlightData(fileName) {
    return await import("../../../assets/data/flights" + fileName + ".json");
}

export default loaderJSONFlightData;