const axios = require("axios");

async function getWeather(lat, lon) {

    const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
            params: {
                latitude: lat,
                longitude: lon,
                current: "rain",
                hourly: "precipitation"
            }
        }
    );

    return response.data.current;

}

module.exports = getWeather;