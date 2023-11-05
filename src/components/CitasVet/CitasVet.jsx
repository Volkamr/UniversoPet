import React from 'react'
import NavToggle from '../navToggle/NavToggle'
import img from '../../assets/davinky-r.png'
import './citasVet.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { getCitaRequest, getDiagnosticoxCitaRequest } from '../../api/vet'
import { useEffect } from 'react'

const CitasVet = () => {

    const idCita = useParams().idCita
    const [citaVet, setCitaVet] = useState([])
    const [diagnostico, setDiagnostico] = useState([])

    useEffect(() =>{
        async function loadCitaVet() {
            const response = await getCitaRequest(idCita)
            setCitaVet(response.data[0])
        }
        loadCitaVet()
    }, [citaVet.idCita])

    useEffect(() =>{
        async function loadDIagnostico(){
            const response = await getDiagnosticoxCitaRequest(idCita);
            setDiagnostico(response.data)
        }
        loadDIagnostico()
    }, [citaVet.idCita])

    console.log(diagnostico)

    const parseFecha = (fecha) => {
        const fechaP = new Date(fecha);
        const dia = fechaP.getDate();
        const mes = fechaP.getMonth();
        const year = fechaP.getFullYear();
        return dia + "/" + mes + "/" + year
    }

    const handleAgregarDiagnostico = () => {
        //Lógica de agregar diagnóstico
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
                    <img src={img} className='citasVet__img' alt="" />
                </div>
                <div className='citasVet__mascota__content'>
                    <div className='citasVet__mascota__top'>
                        <h1 className='citasVet__title__m text-cs'> {citaVet.mascota} </h1>
                        <h1 className='citasVet__subtitle text-cs'> Dueño: {citaVet.nombres_user + " " + citaVet.apellidos_user} </h1>
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
            
                    <div>
                        <div className='citasVet__info__cita grid'>
                            <div className='citasVet__comentario'>
                                <h1 className='citasVet__title text-cs'> Comentario </h1>
                                <p className='citasVet__comentario'> {diagnostico.length === 0 ? 'Aún no hay diagnóstico' : diagnostico[0].descDIagnostico} </p>
                            </div>
                            <div className='citasVet__diagnostico'>
                                <h1 className='citasVet__title text-cs'> Diagnostico </h1>
                                <p className='citasVet__comentario'> {diagnostico.length === 0 ? 'Aún no hay comentario' : diagnostico[0].comentario}</p>
                            </div>
                        </div>
                        <div className='citasVet__btn'>
                            <p  className="citasVet__btn__act btn text-cs"> Editar </p>
                        </div>
                    </div>
  
        </section>
    )
}

export default CitasVet