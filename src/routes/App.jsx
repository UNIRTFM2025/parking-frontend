import { Route, Routes } from 'react-router-dom';
import MainMaps from '../views/MainMaps';
import { ParkingsDetails } from '../views/ParkingsDetails';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainMaps />}>
                    <Route index element={<MainMaps />} />                    
                </Route>
                <Route path="parkings/details/:spaceId" element={<ParkingsDetails />} />
            </Routes>
        </>
    );
}

export default App;
