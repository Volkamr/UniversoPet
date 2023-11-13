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
import Recuperar from "./components/recuperar_contrasena/rec_cont";
import Reboot from "./components/recuperar_contrasena/cambiada_exito/reboot";
import Cod_otp from "./components/recuperar_contrasena/ingresar_codigo/cod_otp";
import Confirmar from "./components/recuperar_contrasena/confirmar_nueva/confirmar_nueva";


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
                <Route path="/perfil/:accessToken/:idCita" element={<Citas />} >  </Route>
                <Route path="/Veterinario/:vetToken" element={<Veterinario />}></Route>
                <Route path="/Veterinario/:vetToken/:idCita" element={<CitasVet />}></Route>
                <Route path="/Administrador/:adminToken" element={<Administrador />}></Route>
                <Route path="/UniversoPet/recuperar" element={<Recuperar />} />
                <Route path="/UniversoPet/reboot" element={<Reboot />} />
                <Route path="/UniversoPet/otp" element={<Cod_otp />} />
                <Route path="/UniversoPet/confirmar" element={<Confirmar />} />
            </Routes>

        </div>
    );
}

export default App;
