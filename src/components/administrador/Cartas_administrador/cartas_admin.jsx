import React from 'react'
import './cartas_admin.css';
import añadir from '../../../assets/añadir.png'
import buscar from '../../../assets/buscar.png'
import { Link } from 'react-router-dom'
import shapeTwo from '../../../assets/shape-2.png'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import { AiOutlineClose } from 'react-icons/ai'
import { CgOpenCollective, CgSoftwareUpload } from 'react-icons/cg'
import sede from '../../../assets/sede def.png'
import vet from '../../../assets/vet def.png'
import ser from '../../../assets/ser def.png'
import { createPersonal, createSedes, createServices } from '../../../api/vet';
import Swal from "sweetalert2";



const PersonalSwiper = ({ Sedes }) => {

    const [agregar, setAgregar] = useState("sede")
    const agregarChange = (n) => {
        setAgregar(n.target.value)
    }

    const [toggleState, setToggleState] = useState(0)
    const toggleTab = (index) => {
        setToggleState(index)
    }

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("Imagen sin seleccionar")
    const [imgForm, setImgForm] = useState("")

    const [image2, setImage2] = useState(null)
    const [fileName2, setFileName2] = useState("Imagen sin seleccionar")
    const [imgForm2, setImgForm2] = useState("")

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };
        });
    };

    return (
        <section className="Cartas section" id="Cartas">
            <div className="Cartasad__container">
                {/*primera tarjeta */}
                <div className='tarjeta1'>
                    <h3 className='Cartas__title'> Buscar empleado</h3>
                    <div className='contenido_carta'>
                        <div className='imagen_carta'>
                            <img src={buscar} />
                        </div>
                        <div className='texto_carta'>
                            <input type='text' name='search' required="required" placeholder='   '></input>
                            <span>Ingrese nombre o ID</span>
                            <div className='div_btn_busc'>
                                <Link to={''}>
                                    <button className="btn_buscar">Buscar</button>
                                </Link>
                            </div>
                            <div className='dec'>
                                <img src={shapeTwo} alt="" className='s' />
                            </div>
                        </div>
                    </div>
                </div>
                {/* segunda tarjeta */}
                <div className='tarjeta2'>
                    <h3 className='Cartas__title'>Añadir {agregar}</h3>
                    <div className='contenido_carta'>
                        <div className='imagen_carta'>
                            <img src={añadir} alt="" />
                        </div>
                        <div className='texto_carta'>
                            <Formik
                                initialValues={{
                                    agregar__selc: ""
                                }} onSubmit={(values) => {
                                    if (agregar === "sede") {
                                        toggleTab(1)
                                    } else if (agregar === "personal") {
                                        toggleTab(2)
                                    } else {
                                        toggleTab(3)
                                    }
                                }}>{({ handleSubmit }) => (
                                    <Form className='form__agrSelc'>
                                        <select name="agregar__selc" id="agregar__selc" className='agregar__selc' onSubmit={handleSubmit} onChange={agregarChange}>
                                            <option value="sede"> Sede </option>
                                            <option value="personal"> Personal </option>
                                            <option value="servicio"> Servicio </option>
                                        </select>
                                        <button type='submit' className="btn_selc"> Agregar {agregar} </button>
                                    </Form>
                                )}
                            </Formik>
                            <div className='dec'>
                                <img src={shapeTwo} alt="" className='s' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={toggleState === 1 ? "sede__form active-form" : "sede__form"}>
                    <div className='sede__form__cnt'>
                        <AiOutlineClose onClick={() => {
                            toggleTab(0)
                            setImage(null)
                            for (let i = 0; i < 2; i++) {
                                document.getElementsByClassName('form__input')[i].value = ""
                            }
                            document.getElementsByClassName('form__input__des')[0].value = ""
                        }} className='form__close'> </AiOutlineClose>
                        <h1 className='form__title text-cs'> Agregar Sede </h1>
                        <Formik
                            initialValues={{
                                imagen: "",
                                titulo: null,
                                ciudad: null,
                                descripcion: null
                            }}
                            onSubmit={async (values) => {
                                try {
                                    values.imagen = imgForm
                                    const response = await createSedes(values)

                                    if (response.status < 200 || response.status >= 300) {
                                        throw new Error(`Error - ${response.status}`);
                                    }

                                    const data = response.data
                                    if (data.success) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: data.message,
                                            text: "Sede Creada Exitosamente",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        for (let i = 0; i < 2; i++) {
                                            document.getElementsByClassName('form__input')[i].value = ""
                                        }
                                        document.getElementsByClassName('form__input__des')[0].value = ""
                                        setImage(null)
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Creación de Sede Fallida',
                                            text: data.message
                                        });
                                    }

                                    console.log(response)
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                        >{({ handleChange, handleSubmit }) => (
                            <Form>

                                <div className='form__inputs grid'>
                                    <div className='sede__img'>
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
                                                <img src={image} alt={fileName} className='img__sede' /> : <img src={sede} alt="" className='img__sede' />
                                        }
                                    </div>

                                    <div className='form__content'>

                                        <div className='sede__pri grid'>
                                            <div className='form__sep'>
                                                <label htmlFor="titulo" className='label__form__mas text-cs'> Titulo </label>
                                                <input type="text" name='titulo' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="Titulo" />
                                            </div>

                                            <div className='form__sep'>
                                                <label htmlFor="ciudad" className='label__form__mas text-cs'> Ciudad </label>
                                                <input type="text" name='ciudad' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="Ciudad" />
                                            </div>

                                        </div>

                                        <div className='form__sep'>
                                            <label htmlFor="descripcion" className='label__form__mas text-cs'> Descripcion </label>
                                            <input type="text" name='descripcion' className='form__input__des' onChange={handleChange} onSubmit={handleSubmit} placeholder="Descripcion" />
                                        </div>

                                    </div>

                                </div>
                                <div className='form__btn'>
                                    <button type='submit' className="btn text-cs as"> Agregar sede </button>
                                </div>

                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>

                <div className={toggleState === 2 ? "sede__form active-form" : "sede__form"}>
                    <div className='personal__form__cnt'>
                        <AiOutlineClose onClick={() => {
                            toggleTab(0)
                            setImage(null)
                            for (let x = 0; x < 10; x++) {
                                document.getElementsByClassName('form__input')[x].value = ""
                            }
                            document.getElementsByClassName('form__input__des')[1].value = ""
                        }} className='form__close'> </AiOutlineClose>
                        <h1 className='form__per__title text-cs'> Agregar Personal </h1>
                        <Formik
                            initialValues={{
                                cedula: null,
                                nombres: null,
                                apellidos: null,
                                email: null,
                                contraseña: null,
                                tipoPersonal: null,
                                sede: null,
                                descripcion: null,
                                imagen: null
                            }}
                            onSubmit={async (values) => {
                                try {
                                    values.imagen = imgForm
                                    const response = await createPersonal(values)

                                    if (response.status < 200 || response.status >= 300) {
                                        throw new Error(`Error - ${response.status}`);
                                    }

                                    const data = response.data
                                    if (data.success) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: data.message,
                                            text: "Personal Creado Exitosamente",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        setImage(null)
                                        for (let x = 0; x < 10; x++) {
                                            document.getElementsByClassName('form__input')[x].value = ""
                                        }
                                        document.getElementsByClassName('form__input__des')[1].value = ""
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Creación de Personal Fallida',
                                            text: data.message
                                        });
                                    }

                                    console.log(response)
                                } catch (error) {
                                    console.log(error)
                                }

                            }}
                        >{({ handleChange, handleSubmit }) => (
                            <Form>

                                <div className='form__inputs grid'>
                                    <div className='sede__img'>
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
                                                <img src={image} alt={fileName} className='img__per' /> : <img src={vet} alt="" className='img__per' />
                                        }
                                    </div>

                                    <div className='form__content'>

                                        <div className='personal__pri grid'>
                                            <div className='form__sep__p'>
                                                <label htmlFor="cedula" className='label__form__mas text-cs'> Cedula </label>
                                                <input type="number" name='cedula' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="Cedula" />
                                            </div>

                                            <div className='form__sep__p'>
                                                <label htmlFor="nombres" className='label__form__mas text-cs'> Nombres </label>
                                                <input type="text" name='nombres' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="Nombres" />
                                            </div>

                                            <div className='form__sep__p'>
                                                <label htmlFor="apellidos" className='label__form__mas text-cs'> Apellidos </label>
                                                <input type="text" name='apellidos' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="Apellidos" />
                                            </div>

                                            <div className='form__sep__p'>
                                                <label htmlFor="email" className='label__form__mas text-cs'> Email </label>
                                                <input type="email" name='email' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="Email" />
                                            </div>

                                            <div className='form__sep__p'>
                                                <label htmlFor="contraseña" className='label__form__mas text-cs'> Contraseña </label>
                                                <input type="password" name='contraseña' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="Contraseña" />
                                            </div>

                                            <div className='form__sep__p'>
                                                <label htmlFor="tipoPersonal" className='label__form__mas text-cs'> Tipo Personal </label>
                                                <input type="text" name='tipoPersonal' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="TipoPersonal" />
                                            </div>

                                        </div>

                                        <div className='personal__form__sec grid'>
                                            <div className='form__sep'>
                                                <label htmlFor="sede" className='label__form__mas text-cs'> Sede </label>
                                                <select name="sede" id="sede" onSubmit={handleSubmit} onChange={handleChange} className='form__input__sedes'>
                                                    <option value=""> Seleccione Sede </option>
                                                    {
                                                        Sedes.map((sede, index) => {
                                                            return <option value={sede.idSede} key={index} >{sede.titulo}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className='form__sep'>
                                                <label htmlFor="descripcion" className='label__form__mas text-cs'> Descripcion </label>
                                                <input type="text" name='descripcion' className='form__input__des' onChange={handleChange} onSubmit={handleSubmit} placeholder="Descripcion" />
                                            </div>

                                        </div>



                                    </div>

                                </div>
                                <div className='form__btn'>
                                    <button type='submit' className="btn text-cs ap"> Agregar Personal </button>
                                </div>

                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>

                <div className={toggleState === 3 ? "sede__form active-form" : "sede__form"}>
                    <div className='sede__form__cnt'>
                        <AiOutlineClose onClick={() => {
                            toggleTab(0)
                            setImage(null)
                            setImage2(null)
                            for (let x = 0; x < 10; x++) {
                                document.getElementsByClassName('form__input')[x].value = ""
                            }
                            document.getElementsByClassName('form__input__des')[2].value = ""
                        }} className='form__close'> </AiOutlineClose>
                        <h1 className='form__title text-cs'> Agregar Servicio </h1>
                        <Formik
                            initialValues={{
                                imagen: null,
                                imagen2: null,
                                nombre: null,
                                idName: null,
                                descripcion: null
                            }}
                            onSubmit={async (values) => {

                                try {
                                    values.imagen = imgForm
                                    values.imagen2 = imgForm2
                                    const response = await createServices(values)

                                    if (response.status < 200 || response.status >= 300) {
                                        throw new Error(`Error - ${response.status}`);
                                    }

                                    const data = response.data
                                    if (data.success) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: data.message,
                                            text: "Servicio Creado Exitosamente",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        setImage(null)
                                        for (let x = 0; x < 10; x++) {
                                            document.getElementsByClassName('form__input')[x].value = ""
                                        }
                                        document.getElementsByClassName('form__input__des')[2].value = ""
                                        setImage(null)
                                        setImage2(null)
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Creación de Servicio Fallida',
                                            text: data.message
                                        });
                                    }

                                    console.log(response)
                                } catch (error) {
                                    console.log(error)
                                }

                            }}
                        >{({ handleChange, handleSubmit }) => (
                            <Form>

                                <div className='form__inputs grid'>
                                    <div>
                                        <div className='ser__img'>
                                            <button type='button' onClick={() => { document.querySelector(".input-field").click() }}> <CgSoftwareUpload className='ser__icon__form' /> </button>
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
                                                    <img src={image} alt={fileName} className='img__ser' /> : <img src={ser} alt="" className='img__ser' />
                                            }
                                        </div>


                                        <div className='ser__img'>
                                            <button type='button' onClick={() => { document.querySelector(".input-field2").click() }}> <CgSoftwareUpload className='ser__icon__form' /> </button>
                                            <input type="file" accept='image/*' name='imagen2' className='input-field2' value={null} hidden onSubmit={handleSubmit} onChange={async ({ target: { files } }) => {
                                                files[0] && setFileName2(files[0].name)
                                                if (files) {
                                                    setImage2(URL.createObjectURL(files[0]));
                                                    const fileInput = document.querySelector('.input-field2')
                                                    const myblob = fileInput.files[0]
                                                    const B64 = await blobToBase64(myblob)
                                                    setImgForm2(B64)
                                                }
                                            }} />
                                            {
                                                image2 !== null ?
                                                    <img src={image2} alt={fileName} className='img__ser' /> : <img src={ser} alt="" className='img__ser' />
                                            }
                                        </div>
                                    </div>

                                    <div className='form__content'>

                                        <div className='sede__pri grid'>
                                            <div className='form__sep'>
                                                <label htmlFor="nombre" className='label__form__mas text-cs'> Nombre </label>
                                                <input type="text" name='nombre' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="Nombre" />
                                            </div>

                                            <div className='form__sep'>
                                                <label htmlFor="idName" className='label__form__mas text-cs'> idName </label>
                                                <input type="text" name='idName' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder="idName" />
                                            </div>

                                        </div>

                                        <div className='form__sep'>
                                            <label htmlFor="descripcion" className='label__form__mas text-cs'> Descripcion </label>
                                            <input type="text" name='descripcion' className='form__input__des' onChange={handleChange} onSubmit={handleSubmit} placeholder="Descripcion" />
                                        </div>

                                    </div>

                                </div>
                                <div className='form__btn'>
                                    <button type='submit' className="btn text-cs aser"> Agregar Servicio </button>
                                </div>

                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default PersonalSwiper