import React from 'react'
import './cartaCitaUser.css'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { putCancelarCitaRequest } from '../../../api/vet';
import Swal from 'sweetalert2';

const CartaCitaUser = ({ setIsModalOpen, titulo, servicio, mascota, nombresVet, apellidosVet, fecha, hora, estado, sede, token, idCita }) => {

    const handleCancelarCita = async () =>{

        try{

            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: "¿Está seguro de agendar esta cita?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            })
    
            if (result.isConfirmed == true){
                
                const response = await putCancelarCitaRequest(idCita)
    
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(`Error - ${response.status}`);
                }

                const data = response.data;

                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Canceló su cita exitosamente',
                        text: data.message,
                        showConfirmButton: true,
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'No puede cancelar su cita',
                        text: data.message,
                        showConfirmButton: true,
                    });
                }
    
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'No canceló su cita',
                    text: 'No canceló su cita :)'
                });
            }

        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error en el servidor',
                text: 'error :('
            });
        }

    }


    return (

        <section>
            <div className="fondo">
                <div className="ventana">
                    <div className="header">
                        <Link to={`/perfil/${token}/${idCita}`}>
                            <h1 id="titulo">{titulo}</h1>
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
                    <div className="footer">
                    {
                            estado === 'agendada' ? (
                                <div onClick={handleCancelarCita} className="btn-cancelar">
                                    <h2 className="cancelar">Cancelar cita</h2>
                                </div>
                            ) : (

                                <div className="cancelar"></div>)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartaCitaUser;