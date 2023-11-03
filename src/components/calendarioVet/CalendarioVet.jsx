import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import "./calendarioVet.css"

const Calendario = () => {
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
                    
                />
            </section>
        </>

    )
}

export default Calendario