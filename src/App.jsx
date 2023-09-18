import React from "react";
import './App.css'
import Home from "./components/home/Home";
import Services from './components/services/Services';
import { Routes, Route } from "react-router-dom";
function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/registro" element={<Services />} />
            </Routes>
            <p>{!data ? "Loading..." : data}</p>
        </div>
    );
}

export default App;
