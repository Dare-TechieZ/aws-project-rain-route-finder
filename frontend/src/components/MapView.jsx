import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    CircleMarker,
    useMap
} from "react-leaflet";
import { useEffect } from "react";

function FitBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (route.length > 0) {
      map.fitBounds(route, { padding: [50, 50] });
    }
  }, [route, map]);

  return null;
}
function getColor(severity){

    if(severity==="High") return "#DC2626";

    if(severity==="Medium") return "#EA580C";

    return "#16A34A";

}
export default function MapView({ routeData }) {
  const delhi = [28.6139, 77.2090];

  const polyline = routeData
    ? routeData.route.geometry.map(([lng, lat]) => [lat, lng])
    : [];

  return (
    <MapContainer
      key={polyline.length}
      center={delhi}
      zoom={11}
      style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0
}}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {routeData && (
        <>
          <Marker position={[routeData.start.lat, routeData.start.lon]}>
            <Popup>Source</Popup>
          </Marker>

          <Marker position={[routeData.end.lat, routeData.end.lon]}>
            <Popup>Destination</Popup>
          </Marker>

          <Polyline
  positions={polyline}
  pathOptions={{
    color: "blue",
    weight: 5,
  }}
/>

{routeData.floodRisk.hotspots.map((spot) => (

  <CircleMarker
    key={spot.id}
    center={[spot.latitude, spot.longitude]}
    radius={8}
    pathOptions={{
      color: getColor(spot.severity),
      fillColor: getColor(spot.severity),
      fillOpacity: 0.9,
    }}
  >

    <Popup>

      <h3>{spot.hotspot_name}</h3>

      <p>
        Severity: <b>{spot.severity}</b>
      </p>

      <p>
        Water Depth: <b>{spot.water_depth_cm} cm</b>
      </p>

    </Popup>

  </CircleMarker>

))}

<FitBounds route={polyline} />
        </>
      )}
    </MapContainer>
  );
}