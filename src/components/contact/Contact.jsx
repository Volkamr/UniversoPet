import React, { useState } from 'react';
import './contact.css';
import { FaRegAddressBook, FaRegEnvelope, FaRegUser, FaRegMap } from 'react-icons/fa';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setForm({ name: '', email: '', subject: '', message: '' });
    }

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
                        <p className="contact__card-data"> Direccion Principal</p>
                    </div>

                    <div className="contact__card">
                        <span className="contact__card-icon">
                            <FaRegUser></FaRegUser>
                        </span>
                        <h3 className="contact__card-title"> Persona Principal </h3>
                        <p className="contact__card-data"> Nombre Cuenta </p>
                    </div>

                    <div className="contact__card">
                        <span className="contact__card-icon">
                            <FaRegEnvelope></FaRegEnvelope>
                        </span>
                        <h3 className="contact__card-title"> Email</h3>
                        <p className="contact__card-data">Correo Electronico</p>
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
                            <input type="email" name='email' onChange={handleChange} value={form.email} className="contact__form-input" />
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
                        <button type='submit' className='btn text-cs'>Enviar Mensaje</button>
                    </div>

                </form>

            </div>
        </section>
    )
}

export default Contact