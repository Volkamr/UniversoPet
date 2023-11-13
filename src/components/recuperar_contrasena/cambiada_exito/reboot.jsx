import React from "react";
import { NavBar } from "../../nav/NavBar";
import './reboot.css';
import capy from '../../../assets/capy.png';
import le_cate from '../../../assets/le_cat2.png';
import visto from '../../../assets/visto.png';
import { Link } from "react-router-dom";


const Reboot = () => {
    return (
        <div className="principal_reboot">
            <img className="capybara" src={capy}></img>
            <img className="visto" src={visto}></img>
            <img className="cate" src={le_cate}></img>
            <div className="texto">
                <h1>Su contraseña ha sido cambiada con éxito!! </h1>
            </div>
            <div className='div_btn_busc'>
                <Link to={'/Login'}>
                    <button className="btn_redireccion">Iniciar sesión</button>
                </Link>
            </div>
        </div>


    )
}

export default Reboot