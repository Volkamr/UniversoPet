import React from "react";
import { NavBar } from "../nav/NavBar";
import './rec_cont.css';
import { useState } from "react";
import { postPrueba } from "../../api/vet";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { RecoveryContext } from "./main_recuperar";
import Swal from "sweetalert2";
import { recuperar_cont } from "../../api/vet";


export default function Recuperar() {

    const [email, setEmail] = useState();

    const calc_otp = () => {
        if (email) {
            const OTP = Math.floor(Math.random() * (9999 - 1000) + 1000);
            const info_recuperar = { correo: email, otp: OTP };
            window.localStorage.setItem("Info_recuperar", JSON.stringify(info_recuperar));
            const resp = recuperar_cont(email, OTP);
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar el mensaje',
                text: "Por favor, ingrese su correo asociado"
            });
        }
    }

    return (
        <section className="recuperar" id="recuperar">
            <div className="carta_principal_1">
                <div className="xd"></div>
                <h1 className="titulo_rec">Recupere su contraseña</h1>
                <div className="descripcion">
                    <span>Para proteger tu cuenta, UniversoPet quiere verificar que eres tú quien está intentando iniciar sesión.
                        <br />
                        <br />
                        Indica la dirección de correo electrónico a la que UniversoPet puede enviarte un código de verificación</span>
                </div>
                <div className='texto_carta_1'>
                    <input type='text' name='search' required="required" placeholder='   '
                        onChange={(event) => setEmail(event.target.value)}></input>
                    <span>Ingrese su correo electrónico</span>
                    <div className='div_btn_busc'>
                    </div>
                </div>
                <div className='div_btn_busc'>
                    <Link to="/UniversoPet/otp">
                        <button onClick={calc_otp} className="btn_sig" >Siguiente</button>
                    </Link>

                </div>
                <div className="xd"></div>
            </div>

        </section >
    )
}
