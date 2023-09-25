import React from 'react'
import NavToggle from '../navToggle/NavToggle'
import { useParams } from 'react-router-dom'
import "./perfil.css"

const Perfil = ({ users }) => {
    let { idUsuario } = useParams()
    let user = users.find(user => user.idUsuario === idUsuario)
    return (
        <section className="perfil__section section" id="perfil">
            <NavToggle></NavToggle>
            <div className="perfil__container container grid">
                <img src={user.avatar} alt="" className="perfil__img" />

                <div className="perfil__data container">

                    <h1 className="perfil__title text-cs">
                        {user.nombres} {user.apellidos}
                    </h1>

                    <div className='perfil__text container grid'>
                        <div className='perfil__info'>
                            <p className='perfil_subtitle'>
                                NOMBRE COMPLETO
                            </p>
                            <p className="perfil__content">
                                {user.nombres} {user.apellidos}
                            </p>
                        </div>
                        <div className='perfil__info'>
                            <p className='perfil_subtitle'>
                                CORREO
                            </p>
                            <p className="perfil__content">
                                {user.email}
                            </p>
                        </div>
                        <div className='perfil__info'>
                            <p className='perfil_subtitle'>
                                CELULAR
                            </p>
                            <p className="perfil__content">
                                {user.celular}
                            </p>
                        </div>
                    </div>

                    <div className='perfil__btn'>
                        <a href="https://www.upb.edu.co/es/home" className="btn text-cs"> Editar </a>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Perfil;