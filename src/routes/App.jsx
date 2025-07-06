import { Route, Routes } from 'react-router-dom';
import Landing from '../views/Landing';
import { ParkingsDetails } from '../views/parkingsDetails';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />}>
                    <Route index element={<Landing />} />                    
                </Route>
                <Route path="parkings/details/:spaceId" element={<ParkingsDetails />} />
            </Routes>
        </>
    );
}

export default App;
