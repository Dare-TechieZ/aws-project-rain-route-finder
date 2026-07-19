import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";

function App() {

    const [routeData, setRouteData] = useState(null);

    return (
        <>
            <SearchBar setRouteData={setRouteData} />
            <MapView routeData={routeData} />
        </>
    );
}

export default App;