import React from 'react'
import NavToggle from '../navToggle/NavToggle'
import img from '../../assets/davinky-r.png'
import './citasVet.css'

const CitasVet = () => {
    return (
        <section className='citasVet__setion section'>
            <NavToggle></NavToggle>
            <div className="citasVet__container container">
                <div className='citasVet__top grid'>
                    <h1 className='citasVet__num text-cs'> cita # </h1>
                    <div className='citasVet__top__info grid'>
                        <div className='citasVet__fecha'>
                            <h1 className='citasVet__subtitle text-cs'> Fecha </h1>
                            <p> dd/mm/aaaa </p>
                        </div>
                        <div className='citasVet__sede'>
                            <h1 className='citasVet__subtitle text-cs'> Sede </h1>
                            <p> sede </p>
                        </div>
                        <div className='citasVet__estado'>
                            <h1 className='citasVet__subtitle text-cs'> Estado </h1>
                            <p> estado </p>
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
                        <h1 className='citasVet__title__m text-cs'> Nombre Mascota </h1>
                        <h1 className='citasVet__subtitle text-cs'> Nombre Dueño </h1>
                    </div>
                    <div className='citasVet__mascota__bott'>
                        <div className='citasVet__mascota__info grid'>
                            <h1 className='citasVet__subtitle text-cs'> Peso </h1>
                            <p> Peso </p>
                        </div>
                        <div className='citasVet__mascota__info grid'>
                            <h1 className='citasVet__subtitle text-cs'> Raza </h1>
                            <p> Raza </p>
                        </div>
                        <div className='citasVet__mascota__info grid'>
                            <h1 className='citasVet__subtitle text-cs'> Tipo Animal </h1>
                            <p> Tipo Animal </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='citasVet__info__cita grid'>
                <div className='citasVet__comentario'>
                    <h1 className='citasVet__title text-cs'> Comentario </h1>
                    <p className='citasVet__comentario'> Lorem ipsum dolor sit amet </p>
                </div>
                <div className='citasVet__diagnostico'>
                    <h1 className='citasVet__title text-cs'> Diagnostico </h1>
                    <p className='citasVet__comentario'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod </p>
                </div>
            </div>
            <div className='citasVet__btn'>
                <p className="citasVet__btn__act btn text-cs"> Actualizar </p>
            </div>
        </section>
    )
}

export default CitasVet