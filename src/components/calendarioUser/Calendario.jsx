import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import "./calendario.css"
import { getCitasxUsuarioRequest } from '../../api/vet';
import { useEffect, useState } from "react";
import CartaCitaUser from './cartaCitaUser/CartaCitaUser';

const Calendario = ({citas, token}) => {

    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);



    useEffect(() => {
        const mappedEvents = citas.map((cita, index) => ({
            title: 'Cita para ' + cita.nombre_mascota,
            start: cita.FechaInicio,
            allDay: false,
            backgroundColor: '#56c7b6',
            borderColor: '#56c7b6',
            extendedProps:{
                servicio: cita.servicio,
                nombre_vet: cita.nombre_vet,
                apellidos_vet: cita.apellidos_vet,
                mascota: cita.nombre_mascota,
                estado: cita.estadoCita,
                sede: cita.sede,
                idCita: cita.idCita 
            }

        }));

        setEvents(mappedEvents);
    }, [citas]);
    
    console.log(citas)

    const clickearEvento = (info) => {
        setSelectedEvent(info.event);
        setIsModalOpen(true);
      };
    
    const parseFecha = (fecha) =>{
        const fechaP = new Date(fecha);
        const dia = fechaP.getDate();
        const mes = fechaP.getMonth() + 1;
        const year = fechaP.getFullYear();
        return dia + "/" + mes + "/" + year
    }

    const parseHora = (fecha) =>{
        const fechaP = new Date(fecha);
        const hora = fechaP.getHours();
        const minutos = fechaP.getMinutes();
        return hora + ":" + minutos;
    }

    return (
        <>
            <h2 className='section__title text-cs'>
                Calendario
            </h2>
            <p className='section__subtitle'>
                Tus <span> Citas </span>
            </p>
            <section className='calendario__section section' id='calendario' >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={
                        {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek'
                        }
                    }
                    events={events}
                    eventClick={function (info) {
                        clickearEvento(info);
                    }}
                />
                {isModalOpen && <CartaCitaUser 
                setIsModalOpen={setIsModalOpen}
                titulo={selectedEvent.title}
                servicio={selectedEvent.extendedProps.servicio}
                mascota={selectedEvent.extendedProps.mascota}
                estado={selectedEvent.extendedProps.estado}
                sede={selectedEvent.extendedProps.sede}
                nombresVet={selectedEvent.extendedProps.nombre_vet}
                apellidosVet={selectedEvent.extendedProps.apellidos_vet}
                fecha={parseFecha(selectedEvent.start)}
                hora = {parseHora(selectedEvent.start)}
                token={token}
                idCita={selectedEvent.extendedProps.idCita}
                ></CartaCitaUser>}
            </section>
        </>

    )
}

export default Calendario