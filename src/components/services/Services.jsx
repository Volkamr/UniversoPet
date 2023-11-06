import React from 'react'
import { NavBar } from '../nav/NavBar'
import './services.css'
import { Link } from 'react-router-dom'
import { getServicesRequest } from "../../api/vet.js";
import { useEffect, useState } from "react";
import ser from '../../assets/ser def.png'


export default function Services() {

    const [services, setServices] = useState([])

    useEffect(() => {
        async function loadServices() {
            const response = await getServicesRequest();
            setServices(response.data)
        }
        loadServices()
    }, [])

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
                                    <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                                </div>
                            </div>

                        ))
                    }

                </div>

            </div>
        </section>
    )
}
