import React from 'react'
import NavToggle from '../navToggle/NavToggle'
import { useParams } from 'react-router-dom'
import "./perfil.css"
import Mascotas from '../mascotas/Mascotas'
import { useEffect, useState } from "react";
import Calendario from '../calendario/Calendario'
import { AiOutlineClose } from 'react-icons/ai'
import { Form, Formik } from 'formik'
import { getServicesRequest } from '../../api/vet'
import { getUserRequest } from '../../api/vet'
import { BiSolidUser } from 'react-icons/bi'
import Swal from "sweetalert2";
import { postCambioInfoRequest } from "../../api/vet";
import img from '../../assets/usuario.png'
import { CgSoftwareUpload } from 'react-icons/cg'


const Perfil = () => {

    //Obtener el usuario 
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(useParams().accessToken)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('UserToken');
        const local_data = JSON.parse(loggedUserJSON)
        if (loggedUserJSON != null && loggedUserJSON.token == token) {
            setToken(JSON.stringify(local_data.token));
        }

    }, [token])

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

    useEffect(() => {
        async function loadUser(token) {
            const response = await getUserRequest(token);
            setUser(response.data)
            console.log(user)
        }
        loadUser(token)
    }, [])

    let [action, setAction] = useState("Normal");
    const [nombres, setNombre] = useState(user.nombres);
    const [email, setEmail] = useState(user.email);
    const [celular, setCelular] = useState(user.celular);
    const [confirmar, setConfirmar] = useState("Cancelar")


    useEffect(() => {
        setNombre(user.nombres);
    }, [user]);

    useEffect(() => {
        setCelular(user.celular);
    }, [user]);
    useEffect(() => {
        setEmail(user.email);
    }, [user]);


    const nombreChange = (n) => {
        setNombre(n.target.value)
    }

    const emailChange = (e) => {
        setEmail(e.target.value)
    }

    const celularChange = (c) => {
        setCelular(c.target.value)
    }

    const [toggleState, setToggleState] = useState(0)
    const toggleTab = (index) => {
        setToggleState(index)
    }

    const [services, setServices] = useState([])

    useEffect(() => {
        async function loadServices() {
            const response = await getServicesRequest();
            setServices(response.data)
        }
        loadServices()
    }, [])

    const cambioInfo = async (event) => {
        event.preventDefault();
        try {

            const response = await postCambioInfoRequest(user.idUsuario, email, celular, nombres, imgForm);

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error - ${response.status}`);
            }

            const data = response.data;

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: "Datos cambiados",
                    text: data.message,
                    showConfirmButton: true,
                })

                    .then(() => {
                        setAction("Normal");
                    });

                await sleep(1000);
                window.location.reload()
            } else {

                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: data.message
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (

        <section className="perfil__section section" id="perfil">
            <NavToggle></NavToggle>
            {
                action === "Editar" ?

                    <div className="perfil__container container grid">
                        <div className='perfil__form__img'>
                            <button type='button' onClick={() => { document.querySelector(".input-field").click() }}> <CgSoftwareUpload className='perfil__icon__form' /> </button>
                            <input type="file" accept='image/*' name='imagen' className='input-field' value={null} hidden onChange={async ({ target: { files } }) => {
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
                                    <img src={image} alt={fileName} className='perfil__img__form' /> : <img src={user.fotoPerfil ? "data:image/png;base64," + user.fotoPerfil : img} alt="" className='perfil__img__form' />
                            }
                        </div>
                        <div className="perfil__data container">

                            <h1 className="perfil__title text-cs">
                                {nombres}
                            </h1>
                            <form onSubmit={cambioInfo}>
                                <div className='perfil__text container grid'>
                                    <div className='perfil__info'>
                                        <p className='perfil_subtitle'>
                                            NOMBRES
                                        </p>
                                        <input className="input-editar" type="text"
                                            name="nombres" id="editar-nombre" defaultValue={nombres} onChange={nombreChange}
                                        >
                                        </input>
                                    </div>
                                    <div className='perfil__info'>
                                        <p className='perfil_subtitle'>
                                            CORREO
                                        </p>
                                        <input className="input-editar" type="email" name="email" id="editar-email"
                                            defaultValue={email} onChange={emailChange}>
                                        </input>
                                    </div>
                                    <div className='perfil__info'>
                                        <p className='perfil_subtitle'>
                                            CELULAR
                                        </p>
                                        <input className="input-editar" type="number" name="celular" id="editar-celular" defaultValue=
                                            {celular} onChange={celularChange}>
                                        </input>
                                    </div>
                                </div>

                                <container className="editar-btn">
                                    <input className="perfil__btn_editar btn text-cs" type="submit" id="guardar" value="Guardar"
                                    >
                                    </input>
                                    <div className="perfil__btn_editar">
                                        <p className="btn text-cs" id="cancelar" onClick={() => {
                                            setAction("Normal");
                                            setNombre(user.nombres);
                                            setEmail(user.email);
                                            setCelular(user.celular);
                                        }}> Cancelar </p>
                                    </div>
                                </container>
                            </form>

                        </div>
                    </div>



                    :
                    <div className="perfil__container container grid">
                        {
                            user.fotoPerfil !== "" ? <img src={"data:image/png;base64," + user.fotoPerfil} alt="" className="perfil__img" /> : <BiSolidUser className='icon__default'></BiSolidUser>
                        }
                        <div className="perfil__data container">

                            <h1 className="perfil__title text-cs">
                                {nombres}
                            </h1>

                            <div className='perfil__text container grid'>
                                <div className='perfil__info'>
                                    <p className='perfil_subtitle'>
                                        NOMBRES
                                    </p>
                                    <p className="perfil__content">
                                        {nombres}
                                    </p>
                                </div>
                                <div className='perfil__info'>
                                    <p className='perfil_subtitle'>
                                        CORREO
                                    </p>
                                    <p className="perfil__content">
                                        {email}
                                    </p>
                                </div>
                                <div className='perfil__info'>
                                    <p className='perfil_subtitle'>
                                        CELULAR
                                    </p>
                                    <p className="perfil__content">
                                        {celular}
                                    </p>
                                </div>
                            </div>

                            <div className='perfil__btn'>
                                <p className="btn text-cs" onClick={() => {
                                    {
                                        setAction("Editar")
                                        setImage(null)
                                    }
                                }}> Editar </p>
                            </div>

                        </div>

                    </div>


            }
            <Mascotas idUsuario={user.idUsuario}></Mascotas>
            <Calendario></Calendario>
            <div className='perfil__btn__cita'>
                <button className='btn text-cs h' onClick={() => toggleTab(1)}> Agendar Cita </button>
            </div>
            <div className={toggleState === 1 ? "perfil__cita__form active-perfil__cita__form" : "perfil__cita__form"}>
                <div className='perfil__cita__form__c'>
                    <button onClick={() => toggleTab(0)}> <AiOutlineClose className='perfil__cita__close' /> </button>
                    <h1 className='form__titulo text-cs'> Agregar Cita </h1>
                    <Formik>
                        <Form >
                            <div className='perfil__cform'>
                                <div className='perfil__cform__content'>
                                    <div className='perfil__form__pri grid'>
                                        <div className='perfil__form__sep'>
                                            <label for="mascotas" className='perfil__formL text-cs'>Mascota</label>
                                            <select name="mascotas" id="mascotas" className='form__input__perfiL'>
                                                {
                                                    /*
                                                    filtrado.map(({ nombre }, index) => {
                                                        return <option value={nombre} key={index} className='o'>{nombre}</option>
                                                    })
                                                    */
                                                }
                                            </select>
                                        </div>
                                        <div className='perfil__form__sep'>
                                            <label for="servicios" className='perfil__formL text-cs'>Servicios</label>
                                            <select name="servicios" id="servicios" className='form__input__perfiL'>
                                                {
                                                    services.map(({ nombre }, index) => {
                                                        return <option value={nombre} key={index} >{nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='perfil__form__sec grid'>
                                        <div className='perfil__form__sep'>
                                            <label htmlFor="fechaI" className='perfil__formL text-cs'> Fecha Inicio </label>
                                            <input type="datetime-local" name='fechaI' className='form__input__perfil' />
                                        </div>
                                        <div className='perfil__form__sep'>
                                            <label htmlFor="fechaF" className='perfil__formL text-cs'> Fecha Final </label>
                                            <input type="datetime-local" name='fechaF' className='form__input__perfil' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='form__btn'>
                                <button className="btn text-cs h"> Agregar Cita </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </section>
    )
}

export default Perfil;