import MapComponent from './components/mapView';
import { MapProvider, MapContext} from './contexts/MapContext';
import { MarkersProvider } from './contexts/MarkersContext';

function App() {

  return (
    <>
        <MarkersProvider>
            <MapComponent />
        </MarkersProvider>
    </>
  )
}

export default App
