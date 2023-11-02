import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import './navToggle.css'

const NavToggle = () => {
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        document.body.classList.toggle('no-scroll', showMenu);
    }, [showMenu]);

    return (
        <header className="NavToggle">
            <nav className="nav">
                <Link to="/UniversoPet" className="nav__logo text-cs">
                    <h1 className="Nav_home text-cs"> Home </h1>
                </Link>
                <div className={`${showMenu ? 'nav__menu show-menu' : 'nav__menu'}`}>
                    <div className="nav__data">
                        <ul className="nav_list">
                            <li>
                                <Link to="/UniversoPet" className="nav__link text-cs">
                                    <h1 className="Nav_home text-cs"> Perfil </h1>
                                </Link>
                            </li>
                            <li>
                                <Link to="/UniversoPet" className="nav__link text-cs">
                                    <h1 className="Nav_home text-cs"> Mascotas </h1>
                                </Link>
                            </li>
                            <li>
                                <Link to="/UniversoPet" className="nav__link text-cs">
                                    <h1 className="Nav_home text-cs"> Citas </h1>
                                </Link>
                            </li>
                            <li>
                                <Link to="/UniversoPet" className="nav__link text-cs">
                                    <h1 className="Nav_home text-cs"> Datos </h1>
                                </Link>
                            </li>
                            <li>
                                <Link to="/UniversoPet" className="nav_link text-cs" onClick={() => {
                                    localStorage.removeItem('UserToken');
                                    window.location.href('/UniversoPet');
                                }}>
                                    <h1 className="Nav_home text-cs">Cerar sesión</h1>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="nav__btns">
                    <div className={`${showMenu ? 'nav__toggle animate-toggle' : 'nav__toggle'}`} onClick={() => setShowMenu(!showMenu)}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavToggle