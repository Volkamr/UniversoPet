import React, { useEffect, useState } from "react";
import { GiDogHouse } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import './navbar.css'
import { Link, useActionData } from "react-router-dom"

export const NavBar = () => {

    const [estado, setEstado] = useState('');
    const [token, setToken] = useState('');
    const [rol, setRol] = useState('');

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('UserToken');
        const local_data = JSON.parse(loggedUserJSON)
        console.log(loggedUserJSON)
        if (loggedUserJSON != null) {
            setEstado('Loggeado');
            setToken(local_data.token)
            setRol(local_data.rol)
            console.log(token)
            console.log(estado)
        }
    }, [estado, token, rol])

    return (

        <section className="nav" id="nav">
            <div className="nav__left container">
                <Link to="/UniversoPet" className="nav_link text-cs">
                    <GiDogHouse className="nav_iconL"></GiDogHouse>
                </Link>
                <Link to="/UniversoPet" className="nav_link text-cs">
                    <h1 className="Nav_home text-cs"> Home </h1>
                </Link>
            </div>
            <div className="nav__right container">
                <Link to="/servicios" className="nav_link text-cs">
                    <p>
                        Servicios
                    </p>
                </Link>
                <Link to="/UniversoPet/nosotros" className="nav_link text-cs">
                    <p>
                        Nosotros
                    </p>
                </Link>
                {
                    estado === 'Loggeado' ? (
                        <Link to={rol === 'usuario' ? (`/perfil/${token}`)
                            : rol === 'veterinario' ? (`/Veterinario/${token}`) : (`/Administrador/${token}`)}>
                            <FaUserCircle className="nav_iconR"> </FaUserCircle>
                        </Link>
                    ) : (
                        <Link to="/login" className="nav_link text-cs">
                            <p>
                                Login
                            </p>
                        </Link>
                    )
                }
            </div>
        </section>
    )
}