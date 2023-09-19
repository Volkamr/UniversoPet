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
                        <img src={Consulta} alt="" className="services_img" />
                        <div className="div-btn">
                            <button className="btn-servicios" id="conoce-mas">Conoce más</button>
                            <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                        </div>
                    </div>

                    <div className="servicios_s" id="vacunación">
                        <p className="servicios-p">Vacunación</p>
                        <img src={Vacuna} alt="" className="services_img" />
                        <div className="div-btn">
                            <button className="btn-servicios" id="conoce-mas">Conoce más</button>
                            <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                        </div>
                    </div>

                    <div className="servicios_s" id="urgencias">
                        <p className="servicios-p">Rayos-X</p>
                        <img src={Rayosx} alt="" className="services_img" />
                        <div className="div-btn">
                            <button className="btn-servicios" id="conoce-mas">Conoce más</button>
                            <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                        </div>
                    </div>

                    <div className='servicios_s' id="laboratorio">
                        <p className="servicios-p">Laboratorio clínico</p>
                        <img src={Laboratorio} alt="" className="services_img" />
                        <div className="div-btn">
                            <button className="btn-servicios" id="conoce-mas">Conoce más</button>
                            <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                        </div>
                    </div>

                    <div className='servicios_s' id="cirugía">
                        <p className="servicios-p">Cirugía</p>
                        <img src={Cirugia} alt="" className="services_img" />
                        <div className="div-btn">
                            <button className="btn-servicios" id="conoce-mas">Conoce más</button>
                            <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                        </div>
                    </div>

                    <div className='servicios_s' id="peluquería">
                        <p className="servicios-p">Peluquería</p>
                        <img src={Peluqueria} alt="" className="services_img" />
                        <div className="div-btn">
                            <button className="btn-servicios" id="conoce-mas">Conoce más</button>
                            <button className="btn-servicios" id="agendar">¡Agenda ya!</button>
                        </div>
                    </div>


                </container>

            </container>
        </section>
    )
}

