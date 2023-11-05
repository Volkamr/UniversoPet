import React from 'react'
import './cartaCitaVet.css'
import {AiOutlineCloseCircle} from 'react-icons/ai';

const CartaCitaVet = ({setIsModalOpen,titulo, servicio, mascota, fecha, hora, estado, sede, userEmail}) =>{
    return(
        <section>
            <div className="fondo">
                <div className="ventana">
                    <div className="header">
                        <h1 id ="titulo">{titulo}</h1>
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
                            <h2 className="titulos">Paciente:</h2>
                            <p>{mascota}</p>
                        </div>
                        <div className="usuario">
                            <h2 className="titulos">Usuario asociado:</h2>
                            <p>{userEmail}</p>
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
    );
}

export default CartaCitaVet;