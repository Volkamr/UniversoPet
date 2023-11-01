import React, { useState } from 'react'
import NavToggle from '../navToggle/NavToggle'
import vet from '../../assets/veterinario.jpg'
import { Form, Formik } from 'formik'
import { BsSearchHeart } from 'react-icons/bs'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './veterinario.css'
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import { getVetRequest } from '../../api/vet'
import { BiSolidUser } from 'react-icons/bi'


const Veterinario = () => {

    let token = useParams().vetToken;

    const [veterinario, setVeterinario] = useState('')

    useEffect(() => {
        async function loadVet(token) {
            const response = await getVetRequest(token);
            setVeterinario(response.data)
        }
        loadVet(token)
    }, [])


    return (
        <section className='veterinario__section section'>
            <NavToggle></NavToggle>
            <div className="veterinario__container container">
                <div className="vet__info grid">
                    <div className='vet__foto'>
                    {
                    veterinario.fotoPerfil != null ? <img src={veterinario.fotoPerfil} alt="" className="perfil__img" /> : <BiSolidUser className='icon__default'></BiSolidUser>
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
                <div className='btn__info'>
                    <p className="vet__btn__info btn text-cs"> editar </p>
                </div>

                <h2 className='section__title text-cs'>
                    Mascotas
                </h2>
                <p className='section__subtitle'>
                    Mirar <span> Mascotas </span>
                </p>
                <div className='vet__finder'>
                    <Formik
                        initialValues={{
                            nombreMascota: null
                        }}
                    >{({ handleChange, handleSubmit }) => (
                        <Form className='vet__finder__form grid'>
                            <div className='vet__finder__bar'>
                                <BsSearchHeart className='vet__finder__icon'></BsSearchHeart>
                                <input type="text" name="nombreMascota" className='vet__bar' placeholder='Nombre Mascota' id="nombreMascota" onChange={handleChange} onSubmit={handleSubmit} />
                            </div>
                            <p className="vet__btn__finder btn text-cs"> Buscar </p>
                        </Form>
                    )}
                    </Formik>
                </div>
                <h2 className='section__title text-cs'>
                    Calendario
                </h2>
                <p className='section__subtitle'>
                    Tus <span> Citas </span>
                </p>
                <div className='calendario__vet'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                    />
                </div>
            </div>

        </section>
    )
}

export default Veterinario