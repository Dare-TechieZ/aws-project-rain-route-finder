const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const routeRoute = require("./routes/routeRoute");
const geocodeRoute = require("./routes/geocodeRoute");

const testRoute = require("./routes/testRoute");
app.use("/test", testRoute);

app.use(cors());
app.use(express.json());
app.use("/route", routeRoute);
app.use("/geocode", geocodeRoute);

app.get("/", (req, res) => {
    res.send("RainSafe Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});