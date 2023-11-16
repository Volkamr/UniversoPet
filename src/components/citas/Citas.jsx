import React from 'react'
import NavToggle from '../navToggle/NavToggle'
import { useParams } from 'react-router-dom'
import './citas.css'
import { getCitaRequest, getCitasxMascotaRequest, getDiagnosticoxCitaRequest } from '../../api/vet'
import { useState, useEffect } from 'react'


const Citas = () => {

    const idCita = useParams().idCita

    const [cita, setCita] = useState([]);
    const [diagnostico, setDiagnostico] = useState([]);

    useEffect(() => {
        async function loadCita() {
            const response = await getCitaRequest(idCita)
            setCita(response.data[0])
        }
        loadCita()
    }, [cita.idCita])

    console.log(cita)

    useEffect(() => {
        async function loadDiagnostico() {
            const response = await getDiagnosticoxCitaRequest(idCita)
            setDiagnostico(response.data)
        }
        loadDiagnostico()
    }, [cita.idCita])


    const parseFecha = (fecha) => {
        const fechaP = new Date(fecha);
        const dia = fechaP.getDate();
        const mes = fechaP.getMonth() + 1;
        const year = fechaP.getFullYear();
        return dia + "/" + mes + "/" + year
    }

    return (
        <div className='citas__section section' id='citas'>
            <NavToggle></NavToggle>
            <div className="citas__header container grid">
                <div className='citas__header__titulo'>
                    <h1 className='section__title'> Cita # {idCita}</h1>
                    <p className='section__subtitle'> Mascota:  <span> {cita.mascota} </span> </p>
                </div>
                <div className='citas__info__info container grid'>
                    <div className="">
                        <h1 className='citas__content__titulo'>
                            FECHA
                        </h1>
                        <p className='citas__content__content '>
                            {parseFecha(cita.FechaInicio)}
                        </p>
                    </div>
                    <div>
                        <h1 className='citas__content__titulo'>
                            SEDE
                        </h1>
                        <p className='citas__content__content '>
                            {cita.sede}
                        </p>
                    </div>
                    <div>
                        <h1 className='citas__content__titulo '>
                            ESTADO
                        </h1>
                        <p className='citas__content__content '>
                            {cita.estadoCita}
                        </p>
                    </div>
                    <div>
                        <h1 className='citas__content__titulo '>
                            SERVICIO
                        </h1>
                        <p className='citas__content__content '>
                            {cita.servicio}
                        </p>
                    </div>
                </div>
            </div>
            <div className='citas__content__mid container grid'>
                <div className="citas__info__comentario">
                    <h1 className='citas__content__titulo'>
                        COMENTARIO
                    </h1>
                    <p className='citas__content__content '>
                        {diagnostico.length === 0 ? "Aún no hay comentario" : diagnostico[0].comentario}
                    </p>
                </div>
                <div className="citas__info__diagnostico">
                    <h1 className='citas__content__titulo '>
                        DIAGNOSTICO
                    </h1>
                    <p className='citas__content__content '>
                        {diagnostico.length === 0 ? "Aún no hay diagnóstico" : diagnostico[0].descDIagnostico}
                    </p>
                </div>
            </div>
            <div className='citas__content__vet'>
                <div className="citas__vet container grid">
                    <img src={"data:image/png;base64," + cita.foto_vet} alt="" className='vet__img' />
                    <div className="vet__info">
                        <h1 className='text-cs' > veterinario </h1>
                        <div className='vet__content container grid'>
                            <div className='vet__name'>
                                <h1 className='vet__content__titulo '>
                                    NOMBRE
                                </h1>
                                <p className='vet__content__content '>
                                    {cita.nombres_vet + " " + cita.apellidos_vet}
                                </p>
                            </div>
                            <div className='vet__email'>
                                <h1 className='vet__content__titulo '>
                                    CORREO
                                </h1>
                                <p className='vet__content__content '>
                                    {cita.email_vet}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Citas