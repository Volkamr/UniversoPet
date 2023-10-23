import React from "react";
import './App.css';
import Home from "./components/home/Home";
import Services from './components/services/Services';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login_SignUp/Login';
import Nosotros from './components/nosotros/Nosotros';
import Perfil from "./components/perfil/Perfil";
import { users } from "./Data";
import ServiceDetails from './components/services/serviceDetails/ServiceDetails';
import Citas from "./components/citas/Citas";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/UniversoPet" element={<Home />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/UniversoPet/Nosotros" element={<Nosotros />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/servicios/:idServicio" element={<ServiceDetails />} />
                <Route path="/perfil/:accessToken" element={<Perfil/>} />
                <Route path="/citas/:idCita" element={<Citas />} >  </Route>
            </Routes>

        </div>
    );
}

export default App;
