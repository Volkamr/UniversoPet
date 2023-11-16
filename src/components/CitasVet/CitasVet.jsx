import React from 'react'
import NavToggle from '../navToggle/NavToggle'
import img from '../../assets/davinky-r.png'
import './citasVet.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { getCitaRequest, getDiagnosticoxCitaRequest, postDiagnosticoRequest } from '../../api/vet'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const CitasVet = () => {

    const idCita = useParams().idCita
    const [citaVet, setCitaVet] = useState([])
    const [diagnostico, setDiagnostico] = useState([])
    const [modo, setModo] = useState('Normal')

    useEffect(() => {
        async function loadCitaVet() {
            const response = await getCitaRequest(idCita)
            setCitaVet(response.data[0])
        }
        loadCitaVet()
    }, [citaVet.idCita])

    useEffect(() => {
        async function loadDIagnostico() {
            const response = await getDiagnosticoxCitaRequest(idCita);
            setDiagnostico(response.data)
        }
        loadDIagnostico()
    }, [citaVet.idCita])

    console.log(diagnostico)

    const parseFecha = (fecha) => {
        const fechaP = new Date(fecha);
        const dia = fechaP.getDate();
        const mes = fechaP.getMonth() + 1;
        const year = fechaP.getFullYear();
        return dia + "/" + mes + "/" + year
    }

    let diagnostico_inicial
    let comentario_inicial

    if (diagnostico.length == 0) {
        diagnostico_inicial = '';
        comentario_inicial = '';
    } else {
        diagnostico_inicial = diagnostico[0].descDIagnostico;
        comentario_inicial = diagnostico[0].comentario;
    }

    const [diag, setDiag] = useState(diagnostico_inicial)
    const [comment, setComment] = useState(comentario_inicial)

    useEffect(() => {
        if (diagnostico.length === 0) {
            setDiag('');
            setComment('');
        } else {
            setDiag(diagnostico[0].descDIagnostico);
            setComment(diagnostico[0].comentario);
        }
    }, [diagnostico]);

    console.log(comment)

    const handleDiagnosticoChange = (e) => {
        setDiag(e.target.value)
    }

    const handleComentarioChange = (e) => {
        setComment(e.target.value)
    }

    const handleAgregarDiagnostico = async (event) => {
        event.preventDefault();

        try {
            const response = await postDiagnosticoRequest(idCita, comment, diag, citaVet.FechaInicio);

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error - ${response.status}`);
            }

            const data = response.data;

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: "Actualizó la cita exitosamente",
                    text: data.message,
                    showConfirmButton: true,
                })
                    .then(() => {
                        setModo('Normal')
                        window.location.reload()
                    });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No añadió el diagnóstico',
                    text: data.message
                });


            }

        } catch (error) {
            console.error('Diagnóstico error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Falló editar diagnóstico',
                text: 'Error'
            });
        }

    }

    return (
        <section className='citasVet__setion section'>
            <NavToggle></NavToggle>
            <div className="citasVet__container container">
                <div className='citasVet__top grid'>
                    <h1 className='citasVet__num text-cs'> cita # {idCita}</h1>
                    <div className='citasVet__top__info grid'>
                        <div className='citasVet__fecha'>
                            <h1 className='citasVet__subtitle text-cs'> Fecha </h1>
                            <p> {parseFecha(citaVet.FechaInicio)} </p>
                        </div>
                        <div className='citasVet__sede'>
                            <h1 className='citasVet__subtitle text-cs'> Sede </h1>
                            <p> {citaVet.sede} </p>
                        </div>
                        <div className='citasVet__estado'>
                            <h1 className='citasVet__subtitle text-cs'> Estado </h1>
                            <p> {citaVet.estadoCita} </p>
                        </div>
                        <div className='citasVet__servicio'>
                            <h1 className='citasVet__subtitle text-cs'> Servicio </h1>
                            <p> {citaVet.servicio} </p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='citasVet__mascota grid'>
                <div className='citasVet__fondo'>
                    <img src={"data:image/png;base64," + citaVet.pet_img} className='citasVet__img' alt="" />
                </div>
                <div className='citasVet__mascota__content'>
                    <div className='citasVet__mascota__top'>
                        <h1 className='citasVet__title__m text-cs'> {citaVet.mascota} </h1>
                        <h1 className='citasVet__subtitle text-cs'> {citaVet.nombres_user + " " + citaVet.apellidos_user} - {citaVet.email_usuario} </h1>
                    </div>
                    <div className='citasVet__mascota__bott'>
                        <div className='citasVet__mascota__info grid'>
                            <h1 className='citasVet__subtitle text-cs'> Peso </h1>
                            <p> {citaVet.peso} </p>
                        </div>
                        <div className='citasVet__mascota__info grid'>
                            <h1 className='citasVet__subtitle text-cs'> Raza </h1>
                            <p> {citaVet.raza} </p>
                        </div>
                        <div className='citasVet__mascota__info grid'>
                            <h1 className='citasVet__subtitle text-cs'> Tipo Animal </h1>
                            <p> {citaVet.tipoAnimal} </p>

                        </div>
                    </div>
                </div>
            </div>

            {
                modo === 'Normal' ? (
                    <div>
                        <div className='citasVet__info__cita grid'>
                            <div className='citasVet__comentario'>
                                <h1 className='citasVet__title text-cs'> Comentario </h1>
                                <p className='citasVet__comentario'> {diagnostico.length === 0 ? 'Aún no hay diagnóstico' : comment} </p>
                            </div>
                            <div className='citasVet__diagnostico'>
                                <h1 className='citasVet__title text-cs'> Diagnostico </h1>
                                <p className='citasVet__comentario'> {diagnostico.length === 0 ? 'Aún no hay comentario' : diag}</p>
                            </div>
                        </div>
                        <div className='citasVet__btn' >
                            <p className="citasVet__btn__act btn text-cs" onClick={() => { setModo('Editar') }}> Editar </p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleAgregarDiagnostico}>
                        <div className='citasVet__info__cita grid'>
                            <div className='citasVet__comentario'>
                                <h1 className='citasVet__title text-cs'> Comentario </h1>
                                <textarea className='area_texto' placeholder="Escriba el comentario de la cita" value={comment} onChange={handleComentarioChange}></textarea>
                            </div>
                            <div className='citasVet__diagnostico'>
                                <h1 className='citasVet__title text-cs'> Diagnostico </h1>
                                <textarea className='area_texto' placeholder='Escriba el diagnóstico de la cita' value={diag} onChange={handleDiagnosticoChange}></textarea>
                            </div>
                        </div>
                        <div className='citasVet__btn' >
                            <input type="submit" className="citasVet__btn__act btn text-cs" id="Actualizar" value="Actualizar" ></input>
                        </div>
                    </form>
                )
            }

        </section>
    )
}

export default CitasVet