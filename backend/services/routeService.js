const axios = require("axios");

async function getRoute(start, end) {

    const response = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",

        {
            coordinates: [
                [start.lon, start.lat],
                [end.lon, end.lat]
            ]
        },

        {
            headers: {
                Authorization: process.env.ORS_API_KEY,
                "Content-Type": "application/json"
            }
        }
    );

    const feature = response.data.features[0];

    return {

        geometry: feature.geometry.coordinates,

        distance: feature.properties.summary.distance,

        duration: feature.properties.summary.duration

    };

}

module.exports = getRoute;