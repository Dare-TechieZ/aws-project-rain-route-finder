const express = require("express");

const router = express.Router();

const getFloodHotspots = require("../services/floodService");

router.get("/", async (req, res) => {

    try {

        const hotspots = await getFloodHotspots();

        res.json(hotspots);

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

});

module.exports = router;