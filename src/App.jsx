
import {Route, Routes} from 'react-router-dom';
import Home from '/src/page/Home.jsx';
import DisplayGold from './page/Gold/DisplayGold.jsx';
function App(){
    return <Routes>
        <Route path="/Gold" element={<DisplayGold />} />
        <Route path="/Home" element=<Home /> />
    </Routes>

export default App;
