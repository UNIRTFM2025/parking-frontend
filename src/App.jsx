import { Route, Routes } from 'react-router-dom';
import Landing from './views/landing';
import { MarkerDetail } from './components/markerDetail';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />}>
                    <Route index element={<Landing />} />                    
                </Route>
                <Route path="detail/:spaceId" element={<MarkerDetail />} />
            </Routes>
        </>
    );
}

export default App;
