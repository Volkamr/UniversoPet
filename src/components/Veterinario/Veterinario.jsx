import React, { useState } from 'react'
import NavToggle from '../navToggle/NavToggle'
import vet from '../../assets/veterinario.jpg'
import { Form, Formik } from 'formik'
import { BsSearchHeart } from 'react-icons/bs'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './veterinario.css'
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import { getVetRequest } from '../../api/vet'
import { BiSolidUser } from 'react-icons/bi'
import CalendarioVet from '../calendarioVet/CalendarioVet'

const Veterinario = () => {

    const [veterinario, setVeterinario] = useState('')

    const [token, setToken] = useState(useParams().vetToken)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('UserToken');
        const local_data = JSON.parse(loggedUserJSON)
        if (loggedUserJSON != null && local_data.token == token) {
            setToken(local_data.token);
        }

    }, [token])

    useEffect(() => {
        async function loadVet(token) {
            const response = await getVetRequest(token);
            setVeterinario(response.data)
        }
        loadVet(token)
    }, [veterinario])


    return (
        <section className='veterinario__section section'>
            <NavToggle></NavToggle>
            <div className="veterinario__container container">
                <div className="vet__info grid">
                    <div className='vet__foto'>
                        {
                            veterinario.fotoPerfil !== '' ? <img src={"data:img/png;base64," + veterinario.fotoPerfil} alt="" className="perfil__img" /> : <BiSolidUser className='icon__default'></BiSolidUser>
                        }
                    </div>
                    <div className="vet__info__content">
                        <h1 className='vet__tittle text-cs'> {"Dr. " + veterinario.nombres} </h1>
                        <div className='vet__all__info grid'>
                            <div className='vet__cedula'>
                                <p className='vet__subtitle text-cs'>
                                    cedula
                                </p>
                                <p className='vet__p'>
                                    {veterinario.cedula}
                                </p>
                            </div>
                            <div className='vet__nombre'>
                                <p className='vet__subtitle text-cs'>
                                    nombre
                                </p>
                                <p className='vet__p'>
                                    {veterinario.nombres + " " + veterinario.apellidos}
                                </p>
                            </div>
                            <div className='vet__email'>
                                <p className='vet__subtitle text-cs'>
                                    Correo
                                </p>
                                <p className='vet__p'>
                                    {veterinario.email}
                                </p>
                            </div>
                        </div>
                        <p className='vet__description'>
                            {veterinario.profesion}
                        </p>
                    </div>
                </div>
                <h2 className='section__title text-cs'>
                    Calendario
                </h2>
                <p className='section__subtitle'>
                    Tus <span> Citas </span>
                </p>
                <div className='calendario__vet'>
                    <CalendarioVet cedula={veterinario.cedula} token={token}></CalendarioVet>
                </div>
            </div>

        </section>
    )
}

export default Veterinario