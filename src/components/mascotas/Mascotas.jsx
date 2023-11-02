import React, { useState, useEffect } from 'react'
import "./mascotas.css";
import { HiPlus } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { citas } from '../../Data'
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import img from '../../assets/default.png'
import { CgSoftwareUpload } from 'react-icons/cg'
import { getUserPetsRequest } from '../../api/vet';
import { createMascota } from '../../api/vet';
import { updateMascota } from '../../api/vet';
import { eliMascota } from '../../api/vet';
import Swal from "sweetalert2";

const Mascotas = ({ idUsuario }) => {

    console.log(idUsuario)
    const [UserPets, setUserPets] = useState([])

    useEffect(() => {
        async function loadUserPets() {
            const response = await getUserPetsRequest(idUsuario);
            console.log(response.data)
            setUserPets(response.data)
        }
        loadUserPets()
    }, [UserPets])

    console.log(UserPets)

    const [toggleState, setToggleState] = useState(0)
    const toggleTab = (index) => {
        setToggleState(index)
    }

    const [carta, setCarta] = useState({})
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("Imagen sin seleccionar")
    const [imgForm, setImgForm] = useState("")

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };
        });
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
                {UserPets.map(pet => {
                    return (
                        < div className="mascotas__fondo" key={pet.idMascota} >
                            {
                                pet.imagen ? <img src={"data:image/png;base64," + pet.imagen} onClick={() => {
                                    setCarta({ avatar: "data:image/png;base64," + pet.imagen, imagen: pet.imagen, nombre: pet.nombre, fechaNac: pet.fechaNac, peso: pet.peso, tipoAnimal: pet.tipoAnimal, raza: pet.raza, idMascota: pet.idMascota })
                                    toggleTab(pet.idMascota)
                                }} className="mascotas__img" alt="" /> : <img src={img} onClick={() => {
                                    setCarta({ avatar: null, nombre: pet.nombre, fechaNac: pet.fechaNac, peso: pet.peso, tipoAnimal: pet.tipoAnimal, raza: pet.raza, idMascota: pet.idMascota })
                                    toggleTab(pet.idMascota)
                                }} className="mascotas__img" alt="" />
                            }

                            <div className={toggleState === pet.idMascota ? "mascotas__carta active-carta" : "mascotas__carta"}>
                                <div className='mascotas__cartas__content'>
                                    <AiOutlineClose onClick={() => toggleTab(0)} className='mascotas__carta__close'> </AiOutlineClose>
                                    <h1 className='mascota__nombre text-cs'> {pet.nombre} </h1>
                                    <div className='mascota__info container grid'>
                                        <div className='mascota__info__div'>
                                            <h1 className='mascota__info__titulo text-cs'>
                                                FECHA DE NAC.
                                            </h1>
                                            <p className='mascota__info__content'>
                                                {pet.fechaNac.substring(0, 10)}
                                            </p>
                                        </div>
                                        <div className='mascota__info__div'>
                                            <h1 className='mascota__info__titulo text-cs'>
                                                TIPO ANIMAL
                                            </h1>
                                            <p className='mascota__info__content'>
                                                {pet.tipoAnimal}
                                            </p>
                                        </div>
                                        <div className='mascota__info__div'>
                                            <h1 className='mascota__info__titulo text-cs'>
                                                RAZA
                                            </h1>
                                            <p className='mascota__info__content '>
                                                {pet.raza}
                                            </p>
                                        </div>
                                        <div className='mascota__info__div'>
                                            <h1 className='mascota__info__titulo text-cs'>
                                                PESO
                                            </h1>
                                            <p className='mascota__info__content'>
                                                {pet.peso}
                                            </p>
                                        </div>

                                    </div>
                                    <div className="mascota__adicional container grid">
                                        <div className='mascota__citas'>
                                            <h1 className='text-cs'>Citas</h1>
                                            {citas.map(cita => {
                                                var citasMas = []
                                                var link = '/citas/'
                                                if (cita.idMascota === pet.idMascota) {
                                                    citasMas.push(cita)
                                                }
                                                citasMas.filter(x => x !== undefined)
                                                return citasMas.map(x => {
                                                    return <div className="" key={pet.idMascota}>
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
                                                if (cita.idMascota === pet.idMascota) {
                                                    citasMas.push(cita.diagnostico)
                                                }
                                                citasMas.filter(x => x !== undefined)
                                                return citasMas.map(x => {
                                                    return <p className='mascota__diagnostico__content' key={pet.idMascota}> {x} </p>
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
                        <Formik
                            initialValues={{
                                imagen: null,
                                nombre: null,
                                peso: null,
                                fechaNac: null,
                                tipoAnimal: null,
                                raza: null,
                                idMascota: null,
                                estado: null
                            }}
                            onSubmit={async (values) => {
                                values.imagen = imgForm
                                values.estado = "activo"
                                values.idMascota = carta.idMascota

                                try {
                                    const response = await updateMascota(values)

                                    if (response.status < 200 || response.status >= 300) {
                                        throw new Error(`Error - ${response.status}`);
                                    }

                                    const data = response.data
                                    if (data.success) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: data.message,
                                            text: "Mascota Actualizada Exitosamente",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        await sleep(1000);
                                        window.location.reload()
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Actualizacion de mascota fallido',
                                            text: data.message
                                        });
                                    }

                                    console.log(response)
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                        >{({ handleSubmit, handleChange }) => (
                            <Form >
                                <div className='form__mas grid'>
                                    <div className='form__img'>
                                        <button type='button' onClick={() => { document.querySelector(".input-field").click() }}> <CgSoftwareUpload className='mascotas__icon__form' /> </button>
                                        <input type="file" accept='image/*' name='imagen' className='input-field' value={null} hidden onSubmit={handleSubmit} onChange={async ({ target: { files } }) => {
                                            files[0] && setFileName(files[0].name)
                                            if (files) {
                                                setImage(URL.createObjectURL(files[0]));
                                                const fileInput = document.querySelector('.input-field')
                                                const myblob = fileInput.files[0]
                                                const B64 = await blobToBase64(myblob)
                                                setImgForm(B64)
                                            }
                                        }} />
                                        {
                                            image !== null ?
                                                <img src={image} alt={fileName} className='img__form' /> : <img src={carta.avatar ? carta.avatar : img} alt="" className='img__form' />
                                        }
                                    </div>

                                    <div className='form__content'>
                                        <div className='form__pri grid'>
                                            <div className='form__sep'>
                                                <label htmlFor="nombre" className='label__form__mas text-cs'> Nombre </label>
                                                <input type="text" name='nombre' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={carta.nombre} />
                                            </div>
                                            <div className='form__sep'>
                                                <label htmlFor="peso" className='label__form__mas text-cs'> Peso </label>
                                                <input type="number" name='peso' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={carta.peso} />
                                            </div>
                                            <div className='form__sep'>
                                                <label htmlFor="fechaNac" className='label__form__mas text-cs'> Fecha de Nacimiento </label>
                                                <input type="date" name='fechaNac' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={carta.fechaNac} />
                                            </div>
                                        </div>

                                        <div className='form__sec grid'>
                                            <div className='form__sep'>
                                                <label htmlFor="tipoAnimal" className='label__form__mas text-cs'> Tipo de Animal </label>
                                                <input type="text" name='tipoAnimal' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={carta.tipoAnimal} />
                                            </div>
                                            <div className='form__sep'>
                                                <label htmlFor="raza" className='label__form__mas text-cs'> Raza </label>
                                                <input type="text" name='raza' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={carta.raza} />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='form__btn'>
                                    <button type='submit' className="btn text-cs h"> Actualizar </button>
                                    <button type='button' onClick={async () => {
                                        const values = {
                                            idMascota: carta.idMascota
                                        }
                                        const response = await eliMascota(values)
                                        if (response.status < 200 || response.status >= 300) {
                                            throw new Error(`Error - ${response.status}`);
                                        }

                                        const data = response.data
                                        if (data.success) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: data.message,
                                                text: "Mascota Actualizada Exitosamente",
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                            await sleep(1000);
                                            window.location.reload()
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Actualizacion de mascota fallido',
                                                text: data.message
                                            });
                                        }
                                    }} className="btn text-cs h"> Eliminar </button>
                                </div>
                            </Form>
                        )}
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
                            <Formik
                                initialValues={{
                                    imagen: imgForm,
                                    nombre: null,
                                    peso: null,
                                    fechaNac: null,
                                    tipoAnimal: null,
                                    raza: null,
                                    estado: null,
                                    idUsuario: idUsuario
                                }}
                                onSubmit={async (values) => {
                                    values.imagen = imgForm
                                    values.estado = "activo"
                                    values.idUsuario = idUsuario

                                    try {
                                        const response = await createMascota(values)

                                        if (response.status < 200 || response.status >= 300) {
                                            throw new Error(`Error - ${response.status}`);
                                        }

                                        const data = response.data
                                        if (data.success) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: data.message,
                                                text: "Mascota Agregada Exitosamente",
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                            await sleep(1000);
                                            window.location.reload()
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Agregamiento de mascota fallido',
                                                text: data.message
                                            });
                                        }

                                        console.log(response)
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                            >
                                {({ handleChange, handleSubmit }) => (
                                    <Form >
                                        <div className='form__mas grid'>
                                            <div className='form__img'>
                                                <button type='button' onClick={() => { document.querySelector(".input-field").click() }}> <CgSoftwareUpload className='mascotas__icon__form' /> </button>
                                                <input type="file" accept='image/*' name="imagen" className='input-field' hidden onSubmit={handleSubmit} onChange={async ({ target: { files } }) => {
                                                    files[0] && setFileName(files[0].name)
                                                    if (files) {
                                                        setImage(URL.createObjectURL(files[0]));
                                                        const fileInput = document.querySelector('.input-field')
                                                        const myblob = fileInput.files[0]
                                                        const B64 = await blobToBase64(myblob)
                                                        setImgForm(B64)
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
                                                        <input type="text" name='nombre' onSubmit={handleSubmit} onChange={handleChange} className='form__input' />
                                                    </div>
                                                    <div className='form__sep'>
                                                        <label htmlFor="peso" className='label__form__mas text-cs'> Peso </label>
                                                        <input type="number" name='peso' onSubmit={handleSubmit} onChange={handleChange} className='form__input' />
                                                    </div>
                                                    <div className='form__sep'>
                                                        <label htmlFor="fechaNac" className='label__form__mas text-cs'> Fecha de Nacimiento </label>
                                                        <input type="date" name='fechaNac' onSubmit={handleSubmit} onChange={handleChange} className='form__input' />
                                                    </div>
                                                </div>

                                                <div className='form__sec grid'>
                                                    <div className='form__sep'>
                                                        <label htmlFor="tipoAnimal" className='label__form__mas text-cs'> Tipo de Animal </label>
                                                        <input type="text" name='tipoAnimal' onSubmit={handleSubmit} onChange={handleChange} className='form__input' />
                                                    </div>
                                                    <div className='form__sep'>
                                                        <label htmlFor="raza" className='label__form__mas text-cs'> Raza </label>
                                                        <input type="text" name='raza' onSubmit={handleSubmit} onChange={handleChange} className='form__input' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form__btn'>
                                            <button type='submit' className="btn text-cs h"> Agregar Mascota </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Mascotas