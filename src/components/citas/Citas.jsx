import React from 'react'
import NavToggle from '../navToggle/NavToggle'
import { citas } from '../../Data'
import { useParams } from 'react-router-dom'
import { veterinario } from '../../Data'
import { pets } from '../../Data'
import './citas.css'


const Citas = () => {
    let { idCita } = useParams()
    let Cita = citas.find(cita => cita.idCita === idCita)
    let Veterinario = veterinario.find(vet => vet.idVeterinario === Cita.idVeterinario)
    let Mascota = pets.find(pet => pet.idMascota === Cita.idMascota)
    return (
        <div className='citas__section section' id='citas'>
            <NavToggle></NavToggle>
            <div className="">
                <h1 className='section__title'> Cita {Cita.idCita}</h1>
                <p className='section__subtitle'> Mascota:  <span> {Mascota.nombre} </span> </p>
            </div>
            <div className='citas__content container grid'>
                <div className='citas__info__info container grid'>
                    <div className="">
                        <h1 className='citas__content__titulo'>
                            FECHA
                        </h1>
                        <p className='citas__content__content '>
                            {Cita.fecha}
                        </p>
                    </div>
                    <div>
                        <h1 className='citas__content__titulo'>
                            SEDE
                        </h1>
                        <p className='citas__content__content '>
                            {Cita.sede}
                        </p>
                    </div>
                    <div>
                        <h1 className='citas__content__titulo '>
                            ESTADO
                        </h1>
                        <p className='citas__content__content '>
                            {Cita.estado}
                        </p>
                    </div>
                </div>
                <div className="citas__info__comentario">
                    <h1 className='citas__content__titulo'>
                        COMENTARIO
                    </h1>
                    <p className='citas__content__content '>
                        {Cita.comentario}
                    </p>
                </div>
                <div className="citas__info__diagnostico">
                    <h1 className='citas__content__titulo '>
                        DIAGNOSTICO
                    </h1>
                    <p className='citas__content__content '>
                        {Cita.diagnostico}
                    </p>
                </div>
            </div>
            <img src={Veterinario.avatar} alt="" />
        </div>
    )
}

export default Citas