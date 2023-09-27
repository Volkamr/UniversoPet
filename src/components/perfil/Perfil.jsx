import React from 'react'
import NavToggle from '../navToggle/NavToggle'
import { useParams } from 'react-router-dom'
import "./perfil.css"
import Mascotas from '../mascotas/Mascotas'
import { useState } from "react";

const Perfil = ({ users }) => {

    let { idUsuario } = useParams();
    let user = users.find(user => user.idUsuario === idUsuario);
    let [action, setAction] = useState("Normal");


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
                            {
                                action === "Editar" 
                                ?
                                <form className="form-editar">
                                    <input className="input-editar" type="text" name = "nombres" id="editar-nombre" defaultValue=
                                    {user.nombres + "" + user.apellidos}>                                       
                                    </input>
                                </form>
                                :
                                <p className="perfil__content">
                                {user.nombres} {user.apellidos}
                                </p>
                            }

                        </div>
                        <div className='perfil__info'>
                            <p className='perfil_subtitle'>
                                CORREO
                            </p>
                            {
                                action === "Editar" ?
                                <form className="form-editar">
                                    <input className="input-editar" type="email" name="email" id="editar-email" defaultValue=
                                    {user.email}>                                       
                                    </input>
                                </form>
                                :
                                <p className="perfil__content">
                                {user.email}
                                </p>
                            }
                           
                        </div>
                        <div className='perfil__info'>
                            <p className='perfil_subtitle'>
                                CELULAR
                            </p>
                            {
                                action === "Editar" ?
                                <form className="form-editar">
                                    <input className="input-editar" type="number" name="celular" id="editar-celular" defaultValue=
                                    {user.celular}>                                       
                                    </input>
                                </form>
                                :
                                <p className="perfil__content">
                                {user.celular}
                                </p> 
                            }
                        </div>

                    </div>

                    {
                        action === "Editar"
                        ?
                        <form className="form-editar">
                            <container className="editar-btn">
                                <input className="perfil__btn_editar btn text-cs" type="submit" id="guardar" value="Guardar"
                                onClick={()=>{
                                    setAction("Normal");
                                    }}>   
                                </input>
                                <div className="perfil__btn_editar">
                                    <p className="btn text-cs" id="cancelar" onClick={() => { setAction("Normal") }}> Cancelar </p>
                                </div>
                            </container>
                            
                        </form>
                        :
                        <div className='perfil__btn'>
                            <p className="btn text-cs" onClick={() => { setAction("Editar") }}> Editar </p>
                    </div>
                    }

                </div>
            </div>
            <Mascotas usuario={idUsuario}></Mascotas>
        </section>
    )
}

export default Perfil;