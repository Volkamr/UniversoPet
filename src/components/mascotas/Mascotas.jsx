import React, { useState } from 'react'
import "./mascotas.css";
import { pets } from '../../Data'
import { HiPlus } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { citas } from '../../Data'
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import img from '../../assets/default.png'
import { CgSoftwareUpload } from 'react-icons/cg'

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

    const [carta, setCarta] = useState({})
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("Imagen sin seleccionar")

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
                            <img src={avatar} onClick={() => {
                                setCarta({ avatar, nombre, fechaNac, peso, tipoAnimal, raza, idMascota })
                                toggleTab(idMascota)
                            }} className="mascotas__img" alt="" />
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
                                    <div className='carta__btn'>
                                        <button onClick={() => {
                                            toggleTab(-2)
                                            setImage(carta.avatar)
                                        }
                                        } className='btn text-cs h'> Editar Mascota </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className={toggleState === -2 ? "mascotas__edt active-mascotas__edt" : "mascotas__edt"}>
                    <div className='mascotas__edt__content'>
                        <AiOutlineClose onClick={() => {
                            toggleTab(carta.idMascota)
                            setImage(img)
                        }} className='mascotas__carta__close'> </AiOutlineClose>
                        <h1 className='mascota__nombre text-cs'> Editar Mascota </h1>
                        <Formik>
                            <Form >
                                <div className='form__mas grid'>
                                    <div className='form__img'>
                                        <button type='button' onClick={() => { document.querySelector(".input-field").click() }}> <CgSoftwareUpload className='mascotas__icon__form' /> </button>
                                        <input type="file" accept='image/*' className='input-field' hidden onChange={({ target: { files } }) => {
                                            files[0] && setFileName(files[0].name)
                                            if (files) {
                                                setImage(URL.createObjectURL(files[0]));
                                            }
                                        }} />
                                        {
                                            image !== null ?
                                                <img src={image} alt={fileName} className='img__form' /> : <img src={carta.avatar} alt="" className='img__form' />
                                        }
                                    </div>

                                    <div className='form__content'>
                                        <div className='form__pri grid'>
                                            <div className='form__sep'>
                                                <label htmlFor="nombre" className='label__form__mas text-cs'> Nombre </label>
                                                <input type="text" name='nombre' className='form__input' placeholder={carta.nombre} />
                                            </div>
                                            <div className='form__sep'>
                                                <label htmlFor="peso" className='label__form__mas text-cs'> Peso </label>
                                                <input type="number" name='peso' className='form__input' placeholder={carta.peso} />
                                            </div>
                                            <div className='form__sep'>
                                                <label htmlFor="fechaNac" className='label__form__mas text-cs'> Fecha de Nacimiento </label>
                                                <input type="date" name='fechaNac' className='form__input' placeholder={carta.fechaNac} />
                                            </div>
                                        </div>

                                        <div className='form__sec grid'>
                                            <div className='form__sep'>
                                                <label htmlFor="tipoAnimal" className='label__form__mas text-cs'> Tipo de Animal </label>
                                                <input type="text" name='tipoAnimal' className='form__input' placeholder={carta.tipoAnimal} />
                                            </div>
                                            <div className='form__sep'>
                                                <label htmlFor="raza" className='label__form__mas text-cs'> Raza </label>
                                                <input type="text" name='raza' className='form__input' placeholder={carta.raza} />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='form__btn'>
                                    <button className="btn text-cs h"> Actualizar </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className="mascotas__plus">
                    <button onClick={() => toggleTab(-1)}> <HiPlus className='mascotas__icon' /> </button>
                    <div className={toggleState === -1 ? "mascotas__plus__content active-mascotas__plus" : "mascotas__plus__content "}>
                        <div className='mascotas__plus__form'>
                            <AiOutlineClose onClick={() => {
                                toggleTab(0)
                                setImage(img)
                            }} className='mascotas__carta__close'> </AiOutlineClose>
                            <h1 className='mascota__nombre text-cs'> Agregar Mascota </h1>
                            <Formik>
                                <Form >
                                    <div className='form__mas grid'>
                                        <div className='form__img'>
                                            <button type='button' onClick={() => { document.querySelector(".input-field").click() }}> <CgSoftwareUpload className='mascotas__icon__form' /> </button>
                                            <input type="file" accept='image/*' className='input-field' hidden onChange={({ target: { files } }) => {
                                                files[0] && setFileName(files[0].name)
                                                if (files) {
                                                    setImage(URL.createObjectURL(files[0]));
                                                }
                                            }} />
                                            {
                                                image !== null ?
                                                    <img src={image} alt={fileName} className='img__form' /> : <img src={img} alt="" className='img__form' />
                                            }
                                        </div>

                                        <div className='form__content'>
                                            <div className='form__pri grid'>
                                                <div className='form__sep'>
                                                    <label htmlFor="nombre" className='label__form__mas text-cs'> Nombre </label>
                                                    <input type="text" name='nombre' className='form__input' />
                                                </div>
                                                <div className='form__sep'>
                                                    <label htmlFor="peso" className='label__form__mas text-cs'> Peso </label>
                                                    <input type="number" name='peso' className='form__input' />
                                                </div>
                                                <div className='form__sep'>
                                                    <label htmlFor="fechaNac" className='label__form__mas text-cs'> Fecha de Nacimiento </label>
                                                    <input type="date" name='fechaNac' className='form__input' />
                                                </div>
                                            </div>

                                            <div className='form__sec grid'>
                                                <div className='form__sep'>
                                                    <label htmlFor="tipoAnimal" className='label__form__mas text-cs'> Tipo de Animal </label>
                                                    <input type="text" name='tipoAnimal' className='form__input' />
                                                </div>
                                                <div className='form__sep'>
                                                    <label htmlFor="raza" className='label__form__mas text-cs'> Raza </label>
                                                    <input type="text" name='raza' className='form__input' />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className='form__btn'>
                                        <button className="btn text-cs h"> Agregar Mascota </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Mascotas