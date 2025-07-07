import MapComponent from "../components/mapView";
import HeaderComponent from "../components/header";
import { MarkersProvider } from "../contexts/MarkersContext";


export default function MainMaps() {
    return (
       <>
            <MarkersProvider>
                <HeaderComponent />
                <MapComponent />
            </MarkersProvider>
        </>
    );

}
