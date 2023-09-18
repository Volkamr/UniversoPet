import React from "react";
import './App.css'
import Home from "./components/home/Home";
import Services from './components/services/Services';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login_SignUp/Login'
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
                <Route path="/UniversoPet" element={<Home />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/login" element={<Login />} />
            </Routes>
           
        </div>
    );
}

export default App;
