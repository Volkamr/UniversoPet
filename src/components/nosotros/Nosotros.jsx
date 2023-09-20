import React from "react";
import { NavBar } from "../nav/NavBar";
import './nosotros.css';
import nosotrosImg from '../../assets/pexels-mithul-varshan-11927589-removebg-preview.png';
import { FaTwitter, FaDribbble, FaBehance } from 'react-icons/fa';
import Cartas from "../Cartas/Cartas";
import Contact from "../contact/Contact";
import PersonalPrincipal from "../PersonalPrincipal/PersonalPrincipal";
import PersonalSwiper from "../PersonalSwiper/PersonalSwiper";

const Nosotros = () => {
    return (
        <section className="nosotros" id="nosotros">
            <NavBar></NavBar>
            <div className="nosotros__container container grid">
                <img src={nosotrosImg} alt="" className="nosotros__img" />

                <div className="nosotros__data container">

                    <h1 className="nosotros__title text-cs">
                        <span>NOSOTROS</span>
                    </h1>

                    <p className="nosotros__job">
                        <span className="texto-cs"> BIENVENIDOS A </span> <b> Universo Pet </b>
                    </p>

                    <p className="nosotros__text">
                        Nuestro compromiso con brindar la mejor experiencia nos ha llevado a convertirnos en la solución anhelada para mejorar y alargar la vida de nuestros perros y gatos.
                    </p>

                    <div className="nosotros__socials">
                        <a href="https://www.upb.edu.co/es/home" className="nosotros_social-link">
                            <FaTwitter />
                        </a>

                        <a href="https://www.upb.edu.co/es/home" className="nosotros_social-link">
                            <FaDribbble />
                        </a>

                        <a href="https://www.upb.edu.co/es/home" className="nosotros_social-link">
                            <FaBehance />
                        </a>
                    </div>
                </div>
            </div>
            <Cartas></Cartas>
            <PersonalPrincipal></PersonalPrincipal>
            <PersonalSwiper></PersonalSwiper>
            <Contact></Contact>
        </section >
    )
}

export default Nosotros