import React from "react";
import { NavBar } from "../../nav/NavBar";
import './confirmar_nueva.css';
import { useState } from "react";
import { cambiar_contrasena, postPrueba } from "../../../api/vet";
import Swal from "sweetalert2";



export default function Confirmar() {

    const recJSON = window.localStorage.getItem('Info_recuperar');
    const local_data = JSON.parse(recJSON);
    const [contrasena, setContrasena] = useState("");
    const [confirm, setConfirm] = useState("");

    const cambiar = async (event) => {
        if (contrasena === confirm) {
            const correo = local_data.correo;
            console.log(correo);

            Swal.fire({
                icon: 'success',
                title: "Código correcto",
                text: "Será redireccionado",
                showConfirmButton: false,
                timer: 2000
            })

                .then(() => {
                    window.location.href = `/UniversoPet/reboot`;
                });
            const response = await cambiar_contrasena(correo, contrasena);
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error al cambiar contraseña',
                text: "Las contraseñas en los campos no son iguales"
            });
        }
    }

    return (
        <section className="cambiar_con" id="cambiar_con">
            <div className="carta_principal">
                <div className="xd"></div>
                <h1 className="titulo_cam">Cambiar contraseña</h1>
                <div className='texto_carta'>
                    <input type='text' name='search' required="required" placeholder='   '
                        onChange={(event) => { setContrasena(event.target.value) }}></input>
                    <span>Ingrese la nueva contraseña</span>
                </div>
                <div className='texto_carta'>
                    <input type='text' name='search' required="required" placeholder='   '
                        onChange={(event) => { setConfirm(event.target.value) }}></input>
                    <span>Confirme la nueva contraseña</span>
                </div>
                <div className='div_btn_busc'>
                    <button className="btn_cambiar" onClick={cambiar}>Cambiar contraseña</button>
                </div>
                <div className="xd"></div>
            </div>

        </section >
    )
}
