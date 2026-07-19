const express = require("express");
const getFloodHotspots = require("../services/floodService");
const analyzeRoute = require("../services/riskService");
const router = express.Router();

const geocode = require("../services/geocodeService");
const getRoute = require("../services/routeService");
const getWeather = require("../services/weatherService");

router.post("/", async (req, res) => {

    try {

        const { source, destination } = req.body;

        const start = await geocode(source);

        const end = await geocode(destination);

        const route = await getRoute(start, end);
        const hotspots = await getFloodHotspots();


        const weather = await getWeather(
            start.lat,
            start.lon
        );
        const floodRisk = analyzeRoute(
            route.geometry,
            hotspots,
            weather.rain || 0 
        );
        res.json({

            start,

            end,

            route,

            weather,
            
            floodRisk
        });

    }

    catch (err) {

        console.log(err.response?.data || err.message);

        res.status(500).json({

            error: "Unable to fetch route"

        });

    }

});

module.exports = router;