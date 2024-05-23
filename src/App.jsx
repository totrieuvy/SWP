import { Route, Routes } from 'react-router-dom';
import DisplayGold from './page/Gold/DisplayGold.jsx';

function App() {
    return (
        <Routes>
            <Route path="/Gold" element={<DisplayGold />} />
            <Route path="/Home" element={<h1>Home</h1>} />
        </Routes>
    );
}

export default App;
