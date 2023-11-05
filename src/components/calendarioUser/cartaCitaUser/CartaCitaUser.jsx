import React from 'react'
import './cartaCitaUser.css'
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const CartaCitaUser = ({setIsModalOpen,titulo, servicio, mascota, nombresVet, apellidosVet, fecha, hora, estado, sede, token, idCita}) => {

    return (

        <section>
            <div className="fondo">
                <div className="ventana">
                    <div className="header">
                        <Link to={`/perfil/${token}/${idCita}`}>
                            <h1 id ="titulo">{titulo}</h1>
                        </Link>
                        <div onClick={setIsModalOpen.bind(this, false)}>
                            <AiOutlineCloseCircle className="cerrar"></AiOutlineCloseCircle>
                        </div>
                    </div>
                    <div className="body">
                        <div className="servicio">
                            <h2 className="titulos">Servicio:</h2>
                            <p>{servicio}</p>
                        </div>
                        <div className="mascota">
                            <h2 className="titulos">Mascota:</h2>
                            <p>{mascota}</p>
                        </div>
                        <div className="veterinario">
                            <h2 className="titulos">Veterinario encargado:</h2>
                            <p>{nombresVet + " " + apellidosVet}</p>
                        </div>
                        <div className="fecha">
                            <h2 className="titulos">Fecha:</h2>
                            <p>{fecha}</p>
                            <h2 className="titulos">Hora:</h2>
                            <p>{hora}</p>
                        </div>
                        <div className="sede">
                            <h2 className="titulos">Sede:</h2>
                            <p>{sede}</p>
                        </div>
                        <div className="estado">
                            <h2 className="titulos">Estado:</h2>
                            <p>{estado}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartaCitaUser;