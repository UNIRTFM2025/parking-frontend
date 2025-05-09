import MapComponent from './components/mapView';
import { MapProvider, MapContext } from './contexts/MapContext';
import { MarkersProvider } from './contexts/MarkersContext';
import Header from './components/Header';

function App() {
    return (
        <>
            <MarkersProvider>
                <Header />
                <MapComponent />
            </MarkersProvider>
        </>
    );
}

export default App;
