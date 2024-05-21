import {Route, Routes} from 'react-router-dom'
import Home from '/src/page/Home.jsx'

function App(){
    return <Routes>
        <Route path="/Gold" element="<h1> Hi </h1>" />
        <Route path="/Home" element=<Home /> />
    </Routes>
}

export default App