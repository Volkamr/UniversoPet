import React from "react";
import './App.css';
import Home from "./components/home/Home";
import Services from './components/services/Services';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login_SignUp/Login';
import Nosotros from './components/nosotros/Nosotros';
import Perfil from "./components/perfil/Perfil";
import ServiceDetails from './components/services/serviceDetails/ServiceDetails';
import Citas from "./components/citas/Citas";
import Veterinario from "./components/Veterinario/Veterinario";
import CitasVet from "./components/CitasVet/CitasVet";
import Administrador from "./components/administrador/Administrador";


function App() {
    return (
        <div>
            <Routes>
                <Route path="/UniversoPet" element={<Home />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/UniversoPet/Nosotros" element={<Nosotros />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/servicios/:idServicio" element={<ServiceDetails />} />
                <Route path="/perfil/:accessToken" element={<Perfil />} />
                <Route path="/citas/:idCita" element={<Citas />} >  </Route>
                <Route path="/Veterinario/:vetToken" element={<Veterinario />}></Route>
                <Route path="/Veterinario/:vetToken/:idCita" element={<CitasVet />}></Route>
                <Route path="/Administrador/:adminToken" element={<Administrador/>}></Route>
            </Routes>

        </div>
    );
}

export default App;
