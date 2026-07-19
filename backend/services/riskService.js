const haversineDistance = require("./distanceService");

function analyzeRoute(routeCoordinates, hotspots, currentRain = 0) {

    const found = [];
    let score = 0;

    for (const point of routeCoordinates) {

        const lon = point[0];
        const lat = point[1];

        for (const hotspot of hotspots) {

            const distance = haversineDistance(
                lat,
                lon,
                hotspot.latitude,
                hotspot.longitude
            );

            if (distance <= 150) {

                if (!found.find(h => h.id === hotspot.id)) {

                    found.push(hotspot);

                    // Severity Score
                    if (hotspot.severity === "High")
                        score += 50;

                    else if (hotspot.severity === "Medium")
                        score += 30;

                    else
                        score += 15;

                    // Water depth contribution
                    score += (hotspot.water_depth_cm || 0) * 0.5;

                }

            }

        }

    }

    // Rain contribution
    score += currentRain * 10;

    let risk = "LOW";

    if (score >= 70)
        risk = "HIGH";

    else if (score >= 40)
        risk = "MEDIUM";

    const reasons = [];

    if (currentRain > 2)
        reasons.push("Heavy rainfall detected");

    found.forEach(h => {
        reasons.push(`${h.hotspot_name} (${h.severity})`);
    });

    let recommendation = "";
let recommendationColor = "";

if (risk === "LOW") {

    recommendation = "Safe to travel";
    recommendationColor = "green";

}
else if (risk === "MEDIUM") {

    recommendation = "Travel with caution";
    recommendationColor = "orange";

}
else {

    recommendation = "Avoid this route if possible";
    recommendationColor = "red";

}

return {

    risk,

    score: Math.round(score),

    hotspotsFound: found.length,

    hotspots: found,

    reasons,

    recommendation,

    recommendationColor

};

}

module.exports = analyzeRoute;