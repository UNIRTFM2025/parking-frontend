import { Route, Routes } from 'react-router-dom';
import MainMaps from '../views/MainMaps';
import { ParkingDetails } from '../views/ParkingDetails';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainMaps />}>
                    <Route index element={<MainMaps />} />                    
                </Route>
                <Route path="parkings/details/:spaceId" element={<ParkingDetails />} />
            </Routes>
        </>
    );
}

export default App;
