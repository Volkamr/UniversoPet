import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "./calendario.css"

const Calendario = () => {
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
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                />
            </section>
        </>

    )
}

export default Calendario