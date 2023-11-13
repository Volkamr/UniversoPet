import React, { useState } from 'react';
import { useEffect } from "react";
import './contact.css';
import { FaRegAddressBook, FaRegEnvelope, FaRegUser, FaRegMap } from 'react-icons/fa';
import { sendEmail } from '../../api/vet';
import Swal from "sweetalert2";
import { postPrueba } from '../../api/vet';
import { Link } from 'react-router-dom';

const Contact = () => {

    const [form, setForm] = useState({
        name: '', email: '', subject: '',
        message: '',
    });

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const response = await sendEmail(form)

    //     if (response.status < 200 || response.status >= 300) {
    //         throw new Error(`Error - ${response.status}`);
    //     }

    //     const data = response.data
    //     if (data.success) {
    //         Swal.fire({
    //             icon: 'success',
    //             title: data.message,
    //             text: "Email Enviado Exitosamente",
    //             showConfirmButton: false,
    //             timer: 1500
    //         })
    //         setForm({ name: '', email: '', subject: '', message: '' });
    //     } else {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Envio de Correo Fallido',
    //             text: data.message
    //         });
    //     }
    // }

    const handleSubmit = (e) => {

        e.preventDefault();
        setForm({ name: '', email: '', subject: '', message: '' });
    }

    const sendEmail = () => {

        if (form.email && form.name && form.subject && form.message) {
            const resp = postPrueba(form.name, form.email, form.subject, form.message);
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar el mensaje',
                text: "Faltan campos por llenar"
            });
        }

    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('UserToken');
        const local_data = JSON.parse(loggedUserJSON);
        if (loggedUserJSON != null && local_data.rol == "usuario") {
            form.email = local_data.email;
            document.getElementById('email').disabled = true;
            document.getElementById('email').placeholder = form.email;

        };
    }, [])

    return (

        <section className="contact " id="contact">
            <h2 className="section__title text-cs">
                Contactanos
            </h2>
            <p className="section__subtitle">
                Cuida <span> a tu mascota </span>
            </p>

            <div className="contact__container container grid">
                <div className="contact__content">

                    <div className="contact__card">
                        <span className="contact__card-icon">
                            <FaRegMap></FaRegMap>
                        </span>
                        <h3 className="contact__card-title"> Direccion </h3>
                        <p className="contact__card-data"> Circular 1a 70-01 </p>
                    </div>

                    <div className="contact__card">
                        <span className="contact__card-icon">
                            <FaRegUser></FaRegUser>
                        </span>
                        <h3 className="contact__card-title"> Persona Principal </h3>
                        <p className="contact__card-data"> UPB </p>
                    </div>

                    <div className="contact__card">
                        <span className="contact__card-icon">
                            <FaRegEnvelope></FaRegEnvelope>
                        </span>
                        <h3 className="contact__card-title"> Email</h3>
                        <p className="contact__card-data"> vetuniversopet@gmail.com </p>
                    </div>

                    <div className="contact__card">
                        <span className="contact__card-icon">
                            <FaRegAddressBook></FaRegAddressBook>
                        </span>
                        <h3 className="contact__card-title"> Telefono</h3>
                        <p className="contact__card-data">0123456789</p>
                    </div>
                </div>

                <form className="contact__form" onSubmit={handleSubmit}>
                    <div className="contact__form-group grid">
                        <div className="contact__form-div">
                            <label htmlFor="" className="contact__form-tag text-cs">
                                Tu nombre completo <b>*</b>
                            </label>
                            <input type="text" name='name' onChange={handleChange} value={form.name} className="contact__form-input" />
                        </div>

                        <div className="contact__form-div">
                            <label htmlFor="" className="contact__form-tag text-cs">
                                Tu correo electronico <b>*</b>
                            </label>
                            <input type="email" name='email' id="email" onChange={handleChange} value={form.email} className="contact__form-input" />
                        </div>
                    </div>

                    <div className="contact__form-div">
                        <label htmlFor="" className="contact__form-tag text-cs">
                            Tema <b>*</b>
                        </label>
                        <input type="text" name='subject' onChange={handleChange} value={form.subject} className="contact__form-input" />
                    </div>

                    <div className="contact__form-div contact__form-area">
                        <label htmlFor="" className="contact__form-tag text-cs">
                            Mensaje <b>*</b>
                        </label>
                        <textarea name='message' onChange={handleChange} value={form.message} className='contact__form-input'></textarea>
                    </div>

                    <div className="contact__submit">
                        <p>* Acepto los terminos y condiciones. </p>
                        <button type='submit' onClick={sendEmail} className='btn text-cs'>Enviar Mensaje</button>
                    </div>
                    <div>
                        <Link to="/UniversoPet/recuperar" className="nav_link text-cs">
                            <button type='submit' className='btn text-cs'>Enviar Mensaje</button>
                        </Link>
                    </div>

                </form>

            </div>
        </section>

    )
}


export default Contact