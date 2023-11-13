import React from "react";
import { NavBar } from "../../nav/NavBar";
import './cod_otp.css';
import capy from '../../../assets/capy.png';
import le_cate from '../../../assets/le_cat2.png';
import visto from '../../../assets/visto.png';
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { recuperar_cont } from "../../../api/vet";

const Cod_otp = () => {

    const loggedUserJSON = window.localStorage.getItem('Info_recuperar');
    const local_data = JSON.parse(loggedUserJSON);

    const reenviar = () => {

        const resp = recuperar_cont(local_data.correo, local_data.otp);
        Swal.fire({
            icon: 'success',
            title: 'El código fue reenviado',
            text: "Por favor, revise su correo"
        });
    }


    const verificar_otp = () => {
        if (parseInt(OTPinput.join("")) === local_data.otp) {
            Swal.fire({
                icon: 'success',
                title: "Código correcto",
                text: "Será redireccionado",
                showConfirmButton: false,
                timer: 2000
            })

                .then(() => {
                    window.location.href = `/UniversoPet/confirmar`;
                });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error al verificar correo',
                text: "El código ingresado no es el correcto"
            });
        }
    }

    const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);

    return (
        <div className="principal_otp">
            <div className="divft"></div>
            <h1>Verificación de Email</h1>
            <span className="sub">Le hemos enviado un código a su correo</span>

            <div className="inputs">
                <input className="in1" maxLength={1} onChange={(event) => setOTPinput([event.target.value, OTPinput[1], OTPinput[2], OTPinput[3]])}></input>
                <input className="in2" maxLength={1} onChange={(event) => setOTPinput([OTPinput[0], event.target.value, OTPinput[2], OTPinput[3]])}></input>
                <input className="in3" maxLength={1} onChange={(event) => setOTPinput([OTPinput[0], OTPinput[1], event.target.value, OTPinput[3]])}></input>
                <input className="in4" maxLength={1} onChange={(event) => setOTPinput([OTPinput[0], OTPinput[1], OTPinput[2], event.target.value])}></input>
            </div>

            <div className='div_btn_busc'>
                <button className="btn_verificar" onClick={verificar_otp}>Verificar correo</button>
            </div>

            <span className="ft">No recibiste el código? <a className="reenviar" onClick={reenviar}>Envia otro</a></span>
            <div className="divft"></div>


        </div>


    )
}

export default Cod_otp