import React from "react";
import { GiDogHouse } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import './navbar.css'
import { Link } from "react-router-dom"

export const NavBar = () => {
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
                <Link to="nosotros" className="nav_link text-cs">
                    <p>
                        Nosotros
                    </p>
                </Link>
                <Link to="/login" className="nav_link text-cs">
                    <p>
                        Login
                    </p>
                </Link>
                <Link to="/login">
                    <FaUserCircle className="nav_iconR"> </FaUserCircle>
                </Link>
            </div>
        </section>
    )
}