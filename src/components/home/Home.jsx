import React from "react";
import ProfilerImg from '../../assets/profile-img.png'
import shapeOne from '../../assets/shape-1.png'
import shapeTwo from '../../assets/shape-2.png'
import { FaTwitter, FaDribbble, FaBehance } from 'react-icons/fa'
import './home.css'
import '../nav/NavBar'
import { NavBar } from "../nav/NavBar";
import "../services/Services";
import { Services } from "../services/Services";
import Ubc from "../ubc/Ubc";
import Contact from "../contact/Contact";

const Home = () => {
    return (
        <section className="home" id="home">
            <NavBar></NavBar>
            <div className="home__container container">
                <p className="home__subtitle text-cs">
                    Clinica <span> Veterinaria </span>
                </p>

                <h1 className="home__title text-cs">
                    <span>UNIVERSO</span> <span className="otro"> PET </span>
                </h1>

                <p className="home__job">
                    <span className="texto-cs"> SOMOS LA MEJOR </span> <b> Veterinaria </b>
                </p>

                <div className="home__img-wrapper">
                    <div className="home__banner">
                        <img src={ProfilerImg} alt="" className="home__profile" />
                    </div>
                    <p className="home__data home__data-one">
                        <span className="text-lg">
                            12 <b>+</b>
                        </span>
                        <span className="text-sm text-cs">
                            Years of <span>Expirience</span>
                        </span>
                    </p>

                    <p className="home__data home__data-two">
                        <span className="text-lg"> 160</span>
                        <span className="text-sm text-cs">
                            Sedes <span>Abiertas</span>
                        </span>
                    </p>

                    <img src={shapeOne} alt="" className="shape shape__1" />
                    <img src={shapeTwo} alt="" className="shape shape__2" />
                    <img src={shapeTwo} alt="" className="shape shape__3" />

                </div>

                <p className="home__text">
                    Nos enfocamos en el asesoramiento y equipos de alta tecnología para que tus mascotas tengan una vida saludable y más duradera.
                </p>

                <div className="home__socials">
                    <a href="https://www.upb.edu.co/es/home" className="home_social-link">
                        <FaTwitter />
                    </a>

                    <a href="https://www.upb.edu.co/es/home" className="home_social-link">
                        <FaDribbble />
                    </a>

                    <a href="https://www.upb.edu.co/es/home" className="home_social-link">
                        <FaBehance />
                    </a>
                </div>

                <div className="home__btns">
                    <a href="https://www.upb.edu.co/es/home" className="btn text-cs"> Agenda Ya! </a>
                    <a href="https://www.upb.edu.co/es/home" className="hero__link text-cs"> Servicios </a>
                </div>

            </div>
            <Services></Services>
            <Ubc></Ubc>
            <Contact></Contact>
        </section>
    );
};

export default Home;