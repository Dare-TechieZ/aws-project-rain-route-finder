import { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

export default function SearchBar({ setRouteData }) {

    const [localRouteData, setLocalRouteData] = useState(null);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function findRoute() {

        setError("");
        setLoading(true);

        try {

            const res = await axios.post(
                "https://aws-project-rain-route-finder.onrender.com",
                {
                    source,
                    destination
                }
            );

            setRouteData(res.data);
            setLocalRouteData(res.data);

        } catch (err) {

            console.error(err);
            setError("Unable to find route. Please check the locations.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="sidebar">

            <div className="hero">

                <div className="logoCircle">
                    🌧️
                </div>

                <div>

                    <div className="logo">
                        RainSafe
                    </div>

                    <div className="subtitle">
                        AI-powered flood-aware navigation
                    </div>

                </div>

            </div>

            <div className="heroDescription">

                Helping commuters avoid flood-prone roads using
                historical flood hotspots, live rainfall, and smart
                risk analysis.

            </div>

            <div className="chips">

                <div className="chip">
                    🌧 Live Weather
                </div>

                <div className="chip">
                    📍 Flood Hotspots
                </div>

                <div className="chip">
                    🛣 Smart Routing
                </div>

            </div>

            <input
                className="input"
                placeholder="Enter Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
            />

            <input
                className="input"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />

            <button
                className="button"
                onClick={findRoute}
                disabled={loading}
            >
                {loading ? "Calculating Route..." : "🌧 Find Safe Route"}
            </button>

            {error && (

                <p className="error">
                    ⚠ {error}
                </p>

            )}

            {localRouteData && (

                <>

                    <div className="resultCard">

                        <div className="resultRow">
                            <span className="label">🛣 Distance</span>
                            <span className="value">
                                {(localRouteData.route.distance / 1000).toFixed(2)} km
                            </span>
                        </div>

                        <div className="resultRow">
                            <span className="label">⏱ ETA</span>
                            <span className="value">
                                {Math.round(localRouteData.route.duration / 60)} min
                            </span>
                        </div>

                        <div className="resultRow">
                            <span className="label">🌧 Rain</span>
                            <span className="value">
                                {localRouteData.weather?.rain ?? 0} mm
                            </span>
                        </div>

                        <div className="resultRow">
                            <span className="label">📍 Hotspots</span>
                            <span className="value">
                                {localRouteData.floodRisk.hotspotsFound}
                            </span>
                        </div>

                    </div>

                    <div
                        className={`riskCard ${
                            localRouteData.floodRisk.risk === "HIGH"
                                ? "high"
                                : localRouteData.floodRisk.risk === "MEDIUM"
                                ? "medium"
                                : "low"
                        }`}
                    >

                        <div style={{ fontSize: 22 }}>
                            🚨 {localRouteData.floodRisk.risk}
                        </div>

                        <div className="score">
                            Risk Score {localRouteData.floodRisk.score}/100
                        </div>

                    </div>

                    {localRouteData.floodRisk.reasons?.length > 0 && (

                        <>

                            <div className="recommendationCard">

                                <div className="recommendationTitle">
                                    🚦 Travel Recommendation
                                </div>

                                <div
                                    className={`recommendation ${
                                        localRouteData.floodRisk.recommendationColor === "green"
                                            ? "greenText"
                                            : localRouteData.floodRisk.recommendationColor === "orange"
                                            ? "orangeText"
                                            : "redText"
                                    }`}
                                >

                                    {localRouteData.floodRisk.recommendationColor === "green" && "✅"}

                                    {localRouteData.floodRisk.recommendationColor === "orange" && "⚠️"}

                                    {localRouteData.floodRisk.recommendationColor === "red" && "🚫"}

                                    {localRouteData.floodRisk.recommendation}

                                </div>

                                <p style={{ marginTop: "10px", color: "#555", lineHeight: "1.5" }}>
                                    {localRouteData.floodRisk.recommendationDetails}
                                </p>

                            </div>

                            <div className="reasonCard">

                                <h3>⚠ Why this route is risky</h3>

                                <ul>

                                    {localRouteData.floodRisk.reasons.map((reason, index) => (

                                        <li key={index}>
                                            {reason}
                                        </li>

                                    ))}

                                </ul>

                            </div>

                        </>

                    )}

                    <div className="legend">

                        <b>Map Legend</b>

                        <div className="legendRow">
                            <div className="dot blue"></div>
                            Safe Route
                        </div>

                        <div className="legendRow">
                            <div className="dot red"></div>
                            High Risk Flood Zone
                        </div>

                        <div className="legendRow">
                            <div className="dot orange"></div>
                            Medium Risk Flood Zone
                        </div>

                        <div className="legendRow">
                            <div className="dot green"></div>
                            Low Risk Flood Zone
                        </div>

                    </div>

                </>

            )}

        </div>

    );

}
