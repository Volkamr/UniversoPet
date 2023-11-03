import React from 'react'
import NavToggle from '../navToggle/NavToggle'
import { useParams } from 'react-router-dom'
import "./perfil.css"
import Mascotas from '../mascotas/Mascotas'
import { useEffect, useState } from "react";
import Calendario from '../calendarioUser/Calendario'
import { getSedesRequest, getUserPetsRequest, getVetRequest, getVeterinarioxSedeRequest } from '../../api/vet'
import { AiOutlineClose } from 'react-icons/ai'
import { Form, Formik } from 'formik'
import { getServicesRequest } from '../../api/vet'
import { getUserRequest } from '../../api/vet'
import { BiSolidUser } from 'react-icons/bi'
import Swal from "sweetalert2";
import { postCambioInfoRequest } from "../../api/vet";
import img from '../../assets/usuario.png'
import { CgSoftwareUpload } from 'react-icons/cg'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

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
    const [imgAct, setImgActual] = useState(null)

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
    }, [token])

    const [UserPets, setUserPets] = useState([])
    useEffect(() => {
        async function loadUserPets() {
            const response = await getUserPetsRequest(user.idUsuario);
            console.log(response.data)
            setUserPets(response.data)
        }
        loadUserPets()
    }, [user.idUsuario])

    const [services, setServices] = useState([])

    useEffect(() => {
        async function loadServices() {
            const response = await getServicesRequest();
            setServices(response.data)
        }
        loadServices()
    }, [services.idService])

    const [sedes, setSedes] = useState([]);

    useEffect(() => {
        async function loadSedes() {
            const response = await getSedesRequest();
            setSedes(response.data)
        }
        loadSedes()
    }, [sedes.idSede])

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

                setImgActual(imgForm)
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

    const [fechaHora, setFechaHora] = useState(new Date());

    const handleCambioFecha = (nuevaFecha) => {
        setFechaHora(nuevaFecha);
    }

    const [SelectedService, setSelectedService] = useState('');

    const handleCambioServicio = (event) => {
        setSelectedService(event.target.value)
    }

    const [selectedPet, setSelectedPet] = useState('');

    const handleCambioMascota = (event) => {
        setSelectedPet(event.target.value);
    }

    const [sedeSeleccionada, setSedeSeleccionada] = useState(null);

    const handleCambioSede = (event) => {
        setSedeSeleccionada(event.target.value);
    }

    const [vetSeleccionado, setVetSeleccionado] = useState('');

    const handleVetSeleccionado = (event) => {
        setVetSeleccionado(event.target.value)
    }


    const [vets, setVets] = useState([]);

    useEffect(() => {
        async function loadVets() {
            const response = await getVeterinarioxSedeRequest(sedeSeleccionada)
            setVets(response.data)
        }
        loadVets()
    }, [sedeSeleccionada])

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
                                    <img src={image} alt={fileName} className='perfil__img__form' /> : <img src={imgAct ? "data:image/png;base64," + imgAct : user.fotoPerfil ? "data:image/png;base64," + user.fotoPerfil : img} alt="" className='perfil__img__form' />
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
                            user.fotoPerfil !== null ? <img src={imgAct ? "data:image/png;base64," + imgAct : user.fotoPerfil ? "data:image/png;base64," + user.fotoPerfil : img} alt="" className="perfil__img" /> : <BiSolidUser className='icon__default'></BiSolidUser>
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
            <Mascotas UserPets={UserPets} idUsuario={user.idUsuario}></Mascotas>
            <Calendario></Calendario>
            <div className='perfil__btn__cita'>
                <button className='btn text-cs h' 
                onClick={() => {if (UserPets.length!=0){
                    toggleTab(1)
                }else{
                    Swal.fire({
                        icon:'error',
                        title: 'No puede agendar cita sin mascota',
                        text: 'Debe tener una mascota registrada para agendar una cita'
                    })
                }
                
                }}> Agendar Cita </button>
            </div>
            <div className={toggleState === 1 ? "perfil__cita__form active-perfil__cita__form" : "perfil__cita__form"}>
                <div className='perfil__cita__form__c'>
                    <button onClick={() => toggleTab(0)}> <AiOutlineClose className='perfil__cita__close' /> </button>
                    <h1 className='form__titulo text-cs'> Agregar Cita </h1>   
                        <form >
                            <div className='perfil__cform'>
                                <div className='perfil__cform__content'>
                                    <div className='perfil__form__pri grid'>
                                        <div className='perfil__form__sep'>
                                            <label for="mascotas" className='perfil__formL text-cs'>Mascota</label>
                                            <select name="mascotas" id="mascotas" className='form__input__perfiL'
                                                value={selectedPet} onChange={handleCambioMascota}>
                                                {

                                                    UserPets.map((mascota, index) => {
                                                        return <option value={mascota.idMascota} key={index} >{mascota.nombre}</option>
                                                    })

                                                }
                                            </select>
                                        </div>
                                        <div className='perfil__form__sep'>
                                            <label for="servicios" className='perfil__formL text-cs'>Servicios</label>
                                            <select name="servicios" id="servicios" className='form__input__perfiL'
                                                value={SelectedService} onChange={handleCambioServicio}
                                            >
                                                {
                                                    services.map((service, index) => {
                                                        return <option value={service.idServicio} key={index} >{service.nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='perfil__form__sec grid'>
                                        <div className='perfil__form__sep'>
                                            <label htmlFor="hora" className='perfil__formL text-cs'>Fecha</label>
                                            <DatePicker selected={fechaHora} onChange={handleCambioFecha} timeCaption='Hora'
                                                showTimeSelect timeFormat='HH:mm' timeIntervals={30} dateFormat={"yyyy-MM-dd HH:mm:ss"}
                                                className='form__input__perfil'
                                            ></DatePicker>
                                        </div>
                                        <div className='perfil__form__sep'>
                                            <label for="veterinarios" className='perfil__formL text-cs'> Veterinario </label>
                                            <select name="veterinarios" className='form__input__perfiL'
                                                value={vetSeleccionado} onChange={handleVetSeleccionado}
                                            >
                                                {
                                                    vets.map((vet, index) => {
                                                        return <option value={vet.cedula} key={index} >{vet.nombres + " " + vet.apellidos}</option>
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className='perfil__form__sep'>
                                            <label for="sedes" className='perfil__formL text-cs'> Sedes </label>
                                            <select name="sedes" className='form__input__perfiL'
                                                value={sedeSeleccionada} onChange={handleCambioSede}
                                            >
                                                {
                                                    sedes.map((sede, index) => {
                                                        return <option value={sede.idSede} key={index} >{sede.titulo}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='form__btn'>
                                <button className="btn text-cs h"> Agregar Cita </button>
                            </div>
                        </form>
                    
                </div>
            </div>
        </section>
    )
}

export default Perfil;