import MapComponent from "../components/mapView";
import HeaderComponent from "../components/header";
import { MarkersProvider } from "../contexts/MarkersContext";


function Landing () {
    return (
       <>
            <MarkersProvider>
                <HeaderComponent />
                <MapComponent />
            </MarkersProvider>
        </>
    );

}

export default Landing;
