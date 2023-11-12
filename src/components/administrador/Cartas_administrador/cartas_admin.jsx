import React from 'react'
import './cartas_admin.css';
import añadir from '../../../assets/añadir.png'
import shapeTwo from '../../../assets/shape-2.png'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import { AiOutlineClose } from 'react-icons/ai'
import { CgSoftwareUpload } from 'react-icons/cg'
import sede from '../../../assets/sede def.png'
import vet from '../../../assets/vet def.png'
import ser from '../../../assets/ser def.png'
import { createPersonal, createSedes, createServices, updateSede, updatePersonal, updateServices } from '../../../api/vet';
import { eliPersonal, eliSede, eliServices } from '../../../api/vet';
import Swal from "sweetalert2";
import { busSede, busPersonal, busServicio } from '../../../api/vet';

const PersonalSwiper = ({ Sedes }) => {

    const [agregar, setAgregar] = useState("sede")
    const agregarChange = (n) => {
        setAgregar(n.target.value)
    }

    const [buscar, setBuscar] = useState("sede")
    const buscarChange = (n) => {
        setBuscar(n.target.value)
    }

    const [toggleState, setToggleState] = useState(0)
    const toggleTab = (index) => {
        setToggleState(index)
    }

    const [result, setResult] = useState([])
    const [edt, setEdt] = useState({})
    const [newName, setNewName] = useState("")

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
                    <h3 className='Cartas__title'> Buscar {buscar}</h3>
                    <div className='contenido_carta_bus'>
                        <Formik
                            initialValues={{
                                bus__name: null,
                                bus__selc: buscar
                            }}
                            onSubmit={(values) => {
                                values.bus__selc = buscar

                                if (values.bus__selc === "sede" && values.bus__name !== "") {
                                    //Funcion Buscar Sede
                                    async function buscar() {
                                        const res = await busSede(values.bus__name)
                                        setResult(res.data)
                                        if (res.data.length !== 0) {
                                            toggleTab(4)
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'No Sede',
                                                text: "No se encontro ningun resultado"
                                            });
                                        }
                                    }
                                    buscar()
                                } else if (values.bus__selc === "personal" && values.bus__name !== "") {
                                    //Funcion Buscar Personal
                                    async function buscar() {
                                        const res = await busPersonal(values.bus__name)
                                        setResult(res.data)
                                        if (res.data.length !== 0) {
                                            toggleTab(5)
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'No Personal',
                                                text: "No se encontro ningun resultado"
                                            });
                                        }
                                    }
                                    buscar()
                                } else if (values.bus__selc === "servicio" && values.bus__name !== "") {
                                    //Funcion Buscar Servicio
                                    async function buscar() {
                                        const res = await busServicio(values.bus__name)
                                        setResult(res.data)
                                        if (res.data.length !== 0) {
                                            toggleTab(6)
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'No Servicio',
                                                text: "No se encontro ningun resultado"
                                            });
                                        }
                                    }
                                    buscar()
                                }
                            }}
                        >{({ handleChange, handleSubmit }) => (
                            <Form className='form__busSelc'>
                                <div className='bus__sobre'>
                                    <input type="text" name='bus__name' id='bus__name' placeholder="Buscar" onChange={handleChange} onSubmit={handleSubmit} className='input__bus' />
                                    <select name="bus__selc" id="bus__selc" className='bus__selc' onSubmit={handleSubmit} onChange={buscarChange}>
                                        <option value="sede"> Sede </option>
                                        <option value="personal"> Personal </option>
                                        <option value="servicio"> Servicio </option>
                                    </select>
                                </div>
                                <button type='submit' className="btn_bus"> Buscar {buscar} </button>
                            </Form>
                        )}
                        </Formik>
                        <div className='dec'>
                            <img src={shapeTwo} alt="" className='s' />
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
                                                    <img src={image2} alt={fileName2} className='img__ser' /> : <img src={ser} alt="" className='img__ser' />
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

                <div className={toggleState === 4 ? "sede__form active-form" : "sede__form"}>
                    <div className='sede__form__cnt'>
                        <AiOutlineClose onClick={() => {
                            toggleTab(0)
                        }} className='form__close'> </AiOutlineClose>
                        {
                            result.map((r, index) => {
                                return <>
                                    <div key={index}>
                                        <h1 className='form__title text-cs'> {r.titulo} </h1>
                                        <div className='result__info grid'>
                                            <div className='res__img'>
                                                <img src={"data:image/png;base64," + r.img} alt="" className='img__res' />
                                            </div>
                                            <div className='result__info__cnt'>
                                                <div className='result__info__pri grid'>
                                                    <div className='res__sep'>
                                                        <p className='result__titulo text-cs'> Titulo </p>
                                                        <p> {r.titulo} </p>
                                                    </div>
                                                    <div className='res__sep'>
                                                        <p className='result__titulo text-cs'> Ciudad </p>
                                                        <p> {r.ciudad} </p>
                                                    </div>
                                                </div>
                                                <div className='res__sep'>
                                                    <p className='result__titulo text-cs'> Descripcion </p>
                                                    <p className='result__des'> {r.descripcion} </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='res__btn grid'>
                                            <div className='form__btn'>
                                                <button className="btn text-cs" onClick={() => {
                                                    setEdt(r)
                                                    toggleTab(7)
                                                }}> Editar </button>
                                            </div>
                                            <div className='form__btn'>
                                                <button className="btn text-cs" onClick={() => {
                                                    eliSede(r)
                                                    toggleTab()
                                                }}> Borrar </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            })
                        }
                    </div>
                </div>

                <div className={toggleState === 5 ? "sede__form active-form" : "sede__form"}>
                    <div className='personal__form__cnt'>
                        <AiOutlineClose onClick={() => {
                            toggleTab(0)
                        }} className='form__close'> </AiOutlineClose>
                        {
                            result.map((r, index) => {
                                return <>
                                    {
                                        r.estado === "activo" ? <div key={index}>
                                            <h1 className='form__title text-cs'> {r.nombres + " " + r.apellidos} </h1>
                                            <div className='result__info grid'>
                                                <div className='res__img'>
                                                    <img src={"data:image/png;base64," + r.fotoPerfil} alt="" className='img__res' />
                                                </div>
                                                <div className='result__info__cnt'>
                                                    <div className='result__per__pri grid'>
                                                        <div className='res__sepP'>
                                                            <p className='result__titulo text-cs'> Cedula </p>
                                                            <p> {r.cedula} </p>
                                                        </div>
                                                        <div className='res__sepP'>
                                                            <p className='result__titulo text-cs'> Nombres </p>
                                                            <p> {r.nombres} </p>
                                                        </div>
                                                        <div className='res__sepP'>
                                                            <p className='result__titulo text-cs'> Apellidos </p>
                                                            <p className='result__des'> {r.apellidos} </p>
                                                        </div>
                                                    </div>
                                                    <div className='result__per__sec grid'>
                                                        <div className='res__sepP'>
                                                            <p className='result__titulo text-cs'> Email </p>
                                                            <p> {r.email} </p>
                                                        </div>
                                                        <div className='res__sepP'>
                                                            <p className='result__titulo text-cs'> T. Personal </p>
                                                            <p> {r.tipoPersonal} </p>
                                                        </div>
                                                        <div className='res__sepP'>
                                                            <p className='result__titulo text-cs'> Sede </p>
                                                            <p className='result__des'> {r.titulo} </p>
                                                        </div>
                                                    </div>
                                                    <div className='result__info__bottom'>
                                                        <div className='res__sepP'>
                                                            <p className='result__titulo text-cs'> Descripcion </p>
                                                            <p className='result__des'> {r.profesion} </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='res__btn grid'>
                                                <div className='form__btn'>
                                                    <button className="btn text-cs" onClick={() => {
                                                        setEdt(r)
                                                        toggleTab(8)
                                                    }}> Editar </button>
                                                </div>
                                                <div className='form__btn'>
                                                    <button className="btn text-cs" onClick={() => {
                                                        eliPersonal(r)
                                                        toggleTab(0)
                                                    }}> Borrar </button>
                                                </div>
                                            </div>

                                        </div> : <></>
                                    }

                                </>
                            })
                        }
                    </div>
                </div>

                <div className={toggleState === 6 ? "sede__form active-form" : "sede__form"}>
                    <div className='sede__form__cnt'>
                        <AiOutlineClose onClick={() => {
                            toggleTab(0)
                        }} className='form__close'> </AiOutlineClose>
                        {
                            result.map((r, index) => {
                                return <>
                                    <div key={index}>
                                        <h1 className='form__title text-cs'> {r.nombre} </h1>
                                        <div className='result__info grid'>
                                            <div>
                                                <div className='ser__img'>
                                                    <img src={"data:image/png;base64," + r.imgVista} alt="" className='img__ser' />
                                                </div>
                                                <div className='ser__img'>
                                                    <img src={"data:image/png;base64," + r.imgServicio} alt="" className='img__ser' />
                                                </div>
                                            </div>
                                            <div className='result__info__cnt'>
                                                <div className='result__info__pri grid'>
                                                    <div className='res__sepP'>
                                                        <p className='result__titulo text-cs'> Nombre </p>
                                                        <p> {r.nombre} </p>
                                                    </div>
                                                    <div className='res__sepP'>
                                                        <p className='result__titulo text-cs'> idName </p>
                                                        <p> {r.idName} </p>
                                                    </div>
                                                </div>
                                                <div className='res__sepP'>
                                                    <p className='result__titulo text-cs'> Descripcion </p>
                                                    <p className='result__des'> {r.descripcion} </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='res__Sbtn grid'>
                                            <div className='form__btn'>
                                                <button className="btn text-cs" onClick={() => {
                                                    setEdt(r)
                                                    toggleTab(9)
                                                }}> Editar </button>
                                            </div>
                                            <div className='form__btn'>
                                                <button className="btn text-cs" onClick={() => {
                                                    eliServices(r)
                                                    toggleTab(0)
                                                }}> Borrar </button>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            })
                        }
                    </div>
                </div>

                <div className={toggleState === 7 ? "sede__form active-form" : "sede__form"}>
                    <div className='sede__form__cnt'>
                        <AiOutlineClose onClick={() => {
                            async function buscar() {
                                var res
                                if (newName === "") {
                                    res = await busSede(edt.titulo)
                                } else {
                                    res = await busSede(newName)
                                    setNewName("")
                                }
                                setResult(res.data)
                            }
                            buscar()
                            toggleTab(4)
                            setImgForm("")
                            setImage(null)
                            for (let i = 0; i < 12; i++) {
                                document.getElementsByClassName('form__input')[i].value = ""
                            }
                            document.getElementsByClassName('form__input__des')[3].value = ""
                        }} className='form__close'> </AiOutlineClose>
                        <h1 className='form__title text-cs'> Editar Sede </h1>
                        <Formik
                            initialValues={{
                                img: "",
                                titulo: null,
                                ciudad: null,
                                descripcion: null,
                                idSede: null
                            }}
                            onSubmit={async (values, { resetForm }) => {
                                try {
                                    values.img = imgForm
                                    values.idSede = edt.idSede
                                    const response = await updateSede(values)

                                    if (response.status < 200 || response.status >= 300) {
                                        throw new Error(`Error - ${response.status}`);
                                    }

                                    const data = response.data
                                    if (data.success) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: data.message,
                                            text: "Sede Actualizada Exitosamente",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        if (values.titulo !== null) setNewName(values.titulo)
                                        setImage(null)
                                        resetForm({
                                            titulo: null,
                                            ciudad: null,
                                            descripcion: null,
                                            imagen: null
                                        })
                                        setImgForm("")
                                        setImage(null)
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Actualización de Sede Fallida',
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
                                                <img src={image} alt={fileName} className='img__sede' /> : <img src={edt.img ? "data:image/png;base64," + edt.img : sede} alt="" className='img__sede' />
                                        }
                                    </div>

                                    <div className='form__content'>

                                        <div className='sede__pri grid'>
                                            <div className='form__sep'>
                                                <label htmlFor="titulo" className='label__form__mas text-cs'> Titulo </label>
                                                <input type="text" name='titulo' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.titulo} />
                                            </div>

                                            <div className='form__sep'>
                                                <label htmlFor="ciudad" className='label__form__mas text-cs'> Ciudad </label>
                                                <input type="text" name='ciudad' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.ciudad} />
                                            </div>

                                        </div>

                                        <div className='form__sep'>
                                            <label htmlFor="descripcion" className='label__form__mas text-cs'> Descripcion </label>
                                            <input type="text" name='descripcion' className='form__input__des' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.descripcion} />
                                        </div>

                                    </div>

                                </div>
                                <div className='form__btn'>
                                    <button type='submit' className="btn text-cs as"> Actualizar sede </button>
                                </div>

                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>

                <div className={toggleState === 8 ? "sede__form active-form" : "sede__form"}>
                    <div className='personal__form__cnt'>
                        <AiOutlineClose onClick={() => {
                            async function buscarP() {
                                var res
                                if (newName === " " || newName === "") {
                                    res = await busPersonal(edt.nombres + " " + edt.apellidos)
                                } else {
                                    res = await busPersonal(newName)
                                    setNewName("")
                                }
                                setResult(res.data)
                            }
                            buscarP()
                            toggleTab(5)
                            setImgForm("")
                            setImage(null)
                            for (let i = 0; i < 17; i++) {
                                document.getElementsByClassName('form__input')[i].value = ""
                            }
                            document.getElementsByClassName('form__input__des')[4].value = ""
                        }} className='form__close'> </AiOutlineClose>
                        <h1 className='form__title text-cs'> Editar Personal </h1>
                        <Formik
                            initialValues={{
                                cedula: "",
                                nombres: "",
                                apellidos: "",
                                email: "",
                                password: "",
                                tipoPersonal: "",
                                descripcion: "",
                                imagen: ""
                            }}
                            onSubmit={async (values, { resetForm }) => {
                                try {
                                    values.imagen = imgForm
                                    values.cedula = edt.cedula
                                    console.log(values)
                                    const response = await updatePersonal(values)

                                    if (response.status < 200 || response.status >= 300) {
                                        throw new Error(`Error - ${response.status}`);
                                    }

                                    const data = response.data
                                    if (data.success) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: data.message,
                                            text: "Personal Actualizado Exitosamente",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        if (values.nombres !== null || values.apellidos !== null) setNewName(values.nombres + " " + values.apellidos)
                                        resetForm({
                                            cedula: null,
                                            nombres: null,
                                            apellidos: null,
                                            email: null,
                                            password: null,
                                            tipoPersonal: null,
                                            descripcion: null,
                                            imagen: null
                                        })
                                        setImgForm("")
                                        setImage(null)
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Actualización de Personal Fallida',
                                            text: data.message
                                        });
                                    }

                                    console.log(response)
                                } catch (error) {
                                    console.log(error)
                                }

                            }}
                        >{({ handleChange, handleSubmit }) => (
                            <Form id='Form__ActPer'>

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
                                                <img src={image} alt={fileName} className='img__per' /> : <img src={edt.fotoPerfil ? "data:image/png;base64," + edt.fotoPerfil : vet} alt="" className='img__per' />
                                        }
                                    </div>

                                    <div className='form__content'>

                                        <div className='personal__pri grid'>

                                            <div className='form__sep__p'>
                                                <label htmlFor="nombres" className='label__form__mas text-cs'> Nombres </label>
                                                <input type="text" name='nombres' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.nombres} />
                                            </div>

                                            <div className='form__sep__p'>
                                                <label htmlFor="apellidos" className='label__form__mas text-cs'> Apellidos </label>
                                                <input type="text" name='apellidos' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.apellidos} />
                                            </div>

                                            <div className='form__sep__p'>
                                                <label htmlFor="email" className='label__form__mas text-cs'> Email </label>
                                                <input type="email" name='email' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.email} />
                                            </div>

                                            <div className='form__sep__p'>
                                                <label htmlFor="password" className='label__form__mas text-cs'> Contraseña </label>
                                                <input type="password" name='password' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.password} />
                                            </div>

                                            <div className='form__sep__p'>
                                                <label htmlFor="tipoPersonal" className='label__form__mas text-cs'> Tipo Personal </label>
                                                <input type="text" name='tipoPersonal' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.tipoPersonal} />
                                            </div>

                                        </div>

                                        <div className='personal__form__sec grid'>

                                            <div className='form__sep'>
                                                <label htmlFor="descripcion" className='label__form__mas text-cs'> Descripcion </label>
                                                <input type="text" name='descripcion' className='form__input__des' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.profesion} />
                                            </div>

                                        </div>



                                    </div>

                                </div>
                                <div className='form__btn'>
                                    <button type='submit' className="btn text-cs ap"> Actualizar Personal </button>
                                </div>

                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>

                <div className={toggleState === 9 ? "sede__form active-form" : "sede__form"}>
                    <div className='sede__form__cnt'>
                        <AiOutlineClose onClick={() => {
                            async function buscar() {
                                var res
                                if (newName === "") {
                                    res = await busServicio(edt.nombre)
                                } else {
                                    res = await busServicio(newName)
                                    setNewName("")
                                }
                                setResult(res.data)
                            }
                            buscar()
                            toggleTab(6)
                            setImage(null)
                            setImage2(null)
                            setImgForm("")
                            setImgForm2("")
                            for (let x = 0; x < 19; x++) {
                                document.getElementsByClassName('form__input')[x].value = ""
                            }
                            document.getElementsByClassName('form__input__des')[5].value = ""
                        }} className='form__close'> </AiOutlineClose>
                        <h1 className='form__title text-cs'> Editar Servicio </h1>
                        <Formik
                            initialValues={{
                                imagen: null,
                                imagen2: null,
                                nombre: null,
                                idName: null,
                                descripcion: null,
                                idServicio: null
                            }}
                            onSubmit={async (values, { resetForm }) => {

                                try {
                                    values.imagen = imgForm
                                    values.imagen2 = imgForm2
                                    values.idServicio = edt.idServicio
                                    const response = await updateServices(values)

                                    if (response.status < 200 || response.status >= 300) {
                                        throw new Error(`Error - ${response.status}`);
                                    }

                                    const data = response.data
                                    if (data.success) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: data.message,
                                            text: "Servicio Actualizado Exitosamente",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        if (values.nombre !== null) setNewName(values.nombre)
                                        resetForm({
                                            nombre: null,
                                            apellidos: null,
                                            idName: null,
                                            imagen: null,
                                            image2: null,
                                            idServicio: null
                                        })
                                        setImage(null)
                                        setImage2(null)
                                        setImgForm("")
                                        setImgForm2("")
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Actualización de Servicio Fallida',
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
                                                    <img src={image} alt={fileName} className='img__ser' /> : <img src={edt.imgVista ? "data:image/png;base64," + edt.imgVista : ser} alt="" className='img__ser' />
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
                                                    <img src={image2} alt={fileName2} className='img__ser' /> : <img src={edt.imgServicio ? "data:image/png;base64," + edt.imgServicio : ser} alt="" className='img__ser' />
                                            }
                                        </div>
                                    </div>

                                    <div className='form__content'>

                                        <div className='sede__pri grid'>
                                            <div className='form__sep'>
                                                <label htmlFor="nombre" className='label__form__mas text-cs'> Nombre </label>
                                                <input type="text" name='nombre' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.nombre} />
                                            </div>

                                            <div className='form__sep'>
                                                <label htmlFor="idName" className='label__form__mas text-cs'> idName </label>
                                                <input type="text" name='idName' className='form__input' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.idName} />
                                            </div>

                                        </div>

                                        <div className='form__sep'>
                                            <label htmlFor="descripcion" className='label__form__mas text-cs'> Descripcion </label>
                                            <input type="text" name='descripcion' className='form__input__des' onChange={handleChange} onSubmit={handleSubmit} placeholder={edt.descripcion} />
                                        </div>

                                    </div>

                                </div>
                                <div className='form__btn'>
                                    <button type='submit' className="btn text-cs aser"> Actualizar Servicio </button>
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