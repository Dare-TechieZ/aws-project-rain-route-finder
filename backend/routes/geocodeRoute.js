const express = require("express");
const router = express.Router();

const geocode = require("../services/geocodeService");

router.post("/", async (req, res) => {

    try {

        const { source, destination } = req.body;

        const sourceCoords = await geocode(source);
        const destinationCoords = await geocode(destination);

        res.json({
            source: sourceCoords,
            destination: destinationCoords
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Unable to geocode locations"
        });

    }

});

module.exports = router;