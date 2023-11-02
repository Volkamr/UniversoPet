import React from "react";
import { NavBar } from "../nav/NavBar";
import './administrador.css';
import usuarios from '../../assets/usuarios_ad.png';
import adminImg from '../../assets/perro_admin.png';
import Cartas from "./Cartas_administrador/cartas_admin";
import PersonalSwiper from "./swiper_administrador/s_administrador";
import estado from '../../assets/estado_pagina_ad.png';
import mascotas from '../../assets/mascotas_ad.png';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import  {useEffect }   from 'react'
import { getAdminRequest } from "../../api/vet";

const Administrador = () => {


    const [admin, setAdmin] = useState('')

    const[token, setToken] = useState(useParams().adminToken)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('UserToken');
        const local_data = JSON.parse(loggedUserJSON)
        if(loggedUserJSON != null && loggedUserJSON.token == token){
            setToken(JSON.stringify(local_data.token));
        }
        
    }, [token])

    useEffect(() => {
        async function loadAdmin(token) {
            const response = await getAdminRequest(token);
            setAdmin(response.data)
        }
        loadAdmin(token)
    }, [])

    return (
        <section className="nosotros" id="nosotros">
            <NavBar></NavBar>
            <div className="nosotros__container container grid">
                <img src={adminImg} alt="" className="admin__img" />

                <div className="nosotros__data container">

                    <h1 className="nosotros__title text-cs">
                        <span>Modo<br />Administrador</span>
                    </h1>

                    <p className="nosotros__text">
                        Usted acaba de entrar en el modo administrador de la aplicación web de la veterinaria Universo Pets, recuerde que toda acción será monitoreada con cuidado y se tomarán las respectivas aacciones de ser necesario.
                    </p>

                    <p className="nosotros__job">
                        <b>Veterinaria Universo Pets </b>
                    </p>

                    <br/>
                    <Link to = "/UniversoPet" onClick={() => {
                                    localStorage.removeItem('UserToken');
                                }}>
                        <p className = "nosotros_text" id = "salir"> Salir </p>
                    </Link>

                </div>
            </div>
            <br />
            <br />
            <h2 className="empleados__title"> Empleados</h2>
            <Cartas></Cartas>
            <h3 className="sede__title"> Sede 1</h3>
            <PersonalSwiper></PersonalSwiper>
            <h3 className="sede__title"> Sede 2</h3>
            <PersonalSwiper></PersonalSwiper>
            <h2 className="empleados__title"> General</h2>
            <div className="general">
                <div className="separacion">
                    <div className="usuarios">
                        <img src={usuarios} alt="" className="usu__img" />
                    </div>
                    <h2 className="num_us"> 82633</h2>
                    <h3 className="m_us"> Usuarios al mes</h3>
                </div>
                <div className="separacion">
                    <div className="usuarios">
                        <img src={estado} alt="" className="usu__img" />
                    </div>
                    <h3 className="p_us"> La página se encuentra actualmente</h3>
                    <h2 className="act_pag"> Activa</h2>

                </div>
                <div className="separacion_der">
                    <div className="usuarios">
                        <img src={mascotas} alt="" className="usu__img" />
                    </div>
                    <h2 className="num_us"> 172633</h2>
                    <h3 className="m_us"> Mascotas registradas</h3>
                </div>
            </div>

        </section >
    )
}

export default Administrador