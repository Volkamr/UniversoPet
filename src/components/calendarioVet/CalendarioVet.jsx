import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import "./calendarioVet.css"
import { getCitasxVetRequest } from '../../api/vet';
import CartaCitaVet from './cartaCitaVet/CartaCitaVet';
import { useState, useEffect } from 'react';

const CalendarioVet = ({cedula, token}) => {

    const [citas, setCitas] = useState([]);
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        setEvents([])
    }, [citas])

    useEffect(() => {
        async function loadCitasVet() {
            const response = await getCitasxVetRequest(cedula)
            setCitas(response.data)
        }
        loadCitasVet()
    }, [cedula])

    useEffect(() => {
        const mappedEvents = citas.map((cita, index) => ({
            title: 'Cita',
            start: cita.FechaInicio,
            allDay: false,
            backgroundColor: '#56c7b6',
            borderColor: '#56c7b6',
            extendedProps:{
                servicio: cita.servicio,
                mascota: cita.nombre_mascota,
                estado: cita.estadoCita,
                sede: cita.sede,
                idMascota: cita.idMascota,
                userEmail: cita.correo_usuario, 
                idCita: cita.idCita
            }
        }));

        setEvents(mappedEvents);
    }, [citas]);

    const clickearEvento = (info) => {
        setSelectedEvent(info.event);
        setIsModalOpen(true);
      };
    
    const parseFecha = (fecha) =>{
        const fechaP = new Date(fecha);
        const dia = fechaP.getDate();
        const mes = fechaP.getMonth();
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

            <section className='calendario__section section' id='calendario' >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={
                        {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }
                    }
                    events = {events}
                    eventClick={function (info) {
                        clickearEvento(info);
                    }}
                    
                />
                {isModalOpen && <CartaCitaVet 
                setIsModalOpen={setIsModalOpen}
                titulo={selectedEvent.title}
                servicio={selectedEvent.extendedProps.servicio}
                sede={selectedEvent.extendedProps.sede}
                mascota={selectedEvent.extendedProps.mascota}
                fecha={parseFecha(selectedEvent.start)}
                hora={parseHora(selectedEvent.start)}
                estado={selectedEvent.extendedProps.estado}
                userEmail={selectedEvent.extendedProps.userEmail}
                idCita={selectedEvent.extendedProps.idCita}
                token={token}
                >
                    </CartaCitaVet>}
            </section>
        </>

    )
}

export default CalendarioVet;