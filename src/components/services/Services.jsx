import React from 'react'
import { NavBar } from '../nav/NavBar'
import './services.css'

export default function Services() {
    return (
        <section className="services_view">
            <container className="services_container">
                <NavBar className="nav_bar"></NavBar>
                <div className="services_title">
                    <h1 class="services_main_title">Nuestros servicios</h1>
                </div>

                <container className="servicios">
                    <div className="servicios_s" id="consulta">
                        <p className="servicios-p">Consulta general</p>
                    </div>


                    <div className="servicios_s" id="vacunación">
                        <p className="servicios-p">Vacunación</p>
                    </div>

                    <div className="servicios_s" id="urgencias">
                        <p className="servicios-p">Urgencias 24h</p>
                    </div>

                    <div className='servicios_s' id="laboratorio">
                        <p className="servicios-p">Laboratorio clínico</p>
                    </div>

                    <div className='servicios_s' id="cirugía">
                        <p className="servicios-p">Laboratorio clínico</p>
                    </div>

                    <div className='servicios_s' id="peluquería">
                        <p className="servicios-p">Laboratorio clínico</p>
                    </div>


                </container>

            </container>
        </section>
    )
}

