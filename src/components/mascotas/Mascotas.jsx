import React, { useState } from 'react'
import "./mascotas.css"
import { pets } from '../../Data'
import { HiPlus } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { citas } from '../../Data'
import { Link } from 'react-router-dom'

const Mascotas = ({ usuario }) => {
    var mascotas = pets.map(pet => {
        var mascotasUs

        if (pet.idUsuario === usuario) {
            mascotasUs = pet
        }

        return mascotasUs
    })

    var filtrado = mascotas.filter(x => {
        return x !== undefined
    })

    const [toggleState, setToggleState] = useState(0)
    const toggleTab = (index) => {
        setToggleState(index)
    }

    return (
        <section className="mascotas section" id='mascotas'>
            <h2 className='section__title text-cs'>
                Mascotas
            </h2>
            <p className='section__subtitle'>
                Tus <span> Mascotas </span>
            </p>
            <div className="mascotas__container container grid">
                {filtrado.map(({ avatar, nombre, fechaNac, peso, tipoAnimal, raza, idMascota }, index) => {
                    return (
                        < div className="mascotas__fondo" key={index} >
                            <img src={avatar} onClick={() => toggleTab(idMascota)} className="mascotas__img" alt="" />
                            <div className={toggleState === idMascota ? "mascotas__carta active-carta" : "mascotas__carta"}>
                                <div className='mascotas__cartas__content'>
                                    <AiOutlineClose onClick={() => toggleTab(0)} className='mascotas__carta__close'> </AiOutlineClose>
                                    <h1 className='mascota__nombre text-cs'> {nombre} </h1>
                                    <div className='mascota__info container grid'>
                                        <div className='mascota__info__div'>
                                            <h1 className='mascota__info__titulo text-cs'>
                                                FECHA DE NAC.
                                            </h1>
                                            <p className='mascota__info__content'>
                                                {fechaNac}
                                            </p>
                                        </div>
                                        <div className='mascota__info__div'>
                                            <h1 className='mascota__info__titulo text-cs'>
                                                TIPO ANIMAL
                                            </h1>
                                            <p className='mascota__info__content'>
                                                {tipoAnimal}
                                            </p>
                                        </div>
                                        <div className='mascota__info__div'>
                                            <h1 className='mascota__info__titulo text-cs'>
                                                RAZA
                                            </h1>
                                            <p className='mascota__info__content '>
                                                {raza}
                                            </p>
                                        </div>
                                        <div className='mascota__info__div'>
                                            <h1 className='mascota__info__titulo text-cs'>
                                                PESO
                                            </h1>
                                            <p className='mascota__info__content'>
                                                {peso}
                                            </p>
                                        </div>

                                    </div>
                                    <div className="mascota__adicional container grid">
                                        <div className='mascota__citas'>
                                            <h1 className='text-cs'>Citas</h1>
                                            {citas.map(cita => {
                                                var citasMas = []
                                                var link = '/citas/'
                                                if (cita.idMascota === idMascota) {
                                                    citasMas.push(cita)
                                                }
                                                citasMas.filter(x => x !== undefined)
                                                return citasMas.map(x => {
                                                    return <div className="" key={idMascota}>
                                                        <Link to={link + x.idCita} className='link__citas link'> Cita {x.idCita} </Link>
                                                        <p className='mascota__citas__content'> {x.comentario} </p>
                                                    </div>
                                                })
                                            })}
                                        </div>
                                        <div className="mascota__diagnostico">
                                            <h1 className='text-cs'>Diagnosticos</h1>
                                            {citas.map(cita => {
                                                var citasMas = []
                                                if (cita.idMascota === idMascota) {
                                                    citasMas.push(cita.diagnostico)
                                                }
                                                citasMas.filter(x => x !== undefined)
                                                return citasMas.map(x => {
                                                    return <p className='mascota__diagnostico__content' key={idMascota}> {x} </p>
                                                })
                                            })}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="mascotas__plus">
                    <HiPlus className='mascotas__icon' />
                </div>
            </div >
        </section >
    )
}

export default Mascotas