import React from 'react'
import { NavBar } from '../nav/NavBar'
import './services.css'
import Consulta from '../../assets/consulta.png'
import Shape2 from '../../assets/shape-2.png'
import Paw from '../../assets/paw.png'
import Rayosx from '../../assets/rayosx.png'
import Vacuna from '../../assets/vacunacion.png'
import Peluqueria from '../../assets/peluqueria.png'
import Laboratorio from '../../assets/laboratorio.png'
import Cirugia from '../../assets/cirugia.png'
import { services } from '../../ServicesMock'
import {Link} from 'react-router-dom' 


export default function Services() {

    console.log(services);

    return (
        <section className="services_view">
            <container className="services_container">
                <NavBar className="nav_bar"></NavBar>
                <div className="services_title">
                    <h1 class="services_main_title">Nuestros servicios</h1>
                </div>

                <container className="servicios">

                   {
                     services.map(service => (

                        <div key={service.id} className="servicios_s" id={service.idName}>
                        <p className="servicios-p">{service.name}</p>
                        <img src={service.img1_src} alt="" className="services_img" />
                        <div className="div-btn">
                            <Link to ={`/servicios/${service.id}`}>
                                <button className="btn-servicios" id="conoce-mas">Conoce más</button>
                            </Link>
                            <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                        </div>
                        </div>

                    ))
                   }

                </container>

            </container>
        </section>
    )
}
