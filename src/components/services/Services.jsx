import React from 'react'
import { NavBar } from '../nav/NavBar'
import './services.css'
import { Link } from 'react-router-dom'
import { getServicesRequest } from "../../api/vet.js";
import { useEffect, useState } from "react";
import ser from '../../assets/ser def.png';
import Swal from 'sweetalert2'


export default function Services() {

    const [services, setServices] = useState([])

    useEffect(() => {
        async function loadServices() {
            const response = await getServicesRequest();
            setServices(response.data)
        }
        loadServices()
    }, [])

    const [estado, setEstado] = useState('');
    const [token, setToken] = useState('');
    const [rol, setRol] = useState('');

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('UserToken');
        const local_data = JSON.parse(loggedUserJSON)
        if (loggedUserJSON != null) {
            setEstado('Loggeado');
            setToken(local_data.token)
            setRol(local_data.rol)
        }
    }, [estado, token, rol])

    return (
        <section className="services_view section">
            <NavBar></NavBar>
            <div className="services_container container">
                <div className="services_title">
                    <h1 class="services_main_title text-cs">Nuestros servicios</h1>
                </div>

                <div className="servicios">

                    {
                        services.map(service => (

                            <div key={service.idServicio} className="servicios_s" id={service.idName}>
                                <p className="servicios-p">{service.nombre}</p>
                                {
                                    service.imgVista ? <img src={"data:image/png;base64," + service.imgVista} alt="" className="services_img" /> : <img src={ser} alt="" className="services_img sd" />
                                }
                                <div className="div-btn">
                                    <Link to={`/servicios/${service.idServicio}`}>
                                        <button className="btn-servicios" id="conoce-mas">Conoce más</button>
                                    </Link>
                                    {
                                        estado === 'Loggeado' && rol === 'usuario' ? (
                                        <Link to={`/perfil/${token}`}>
                                             <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                                        </Link>
                                        ) : (
                                        <Link onClick={() => {
                                            Swal.fire({
                                                icon: 'info',
                                                title: 'Tiene que iniciar sesión',
                                                text: 'Debe iniciar sesión para poder agendar una cita',
                                            })
                                                .then(() => {
                                                    localStorage.removeItem('UserToken');
                                                    window.location.href = '/login';
                                                });
                                        }}>
                                            <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                                       </Link>
                                        )


                                    }
                                </div>
                            </div>

                        ))
                    }

                </div>

            </div>
        </section>
    )
}
