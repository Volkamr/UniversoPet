import { createTransport } from 'nodemailer';

export const enviarMail_cita = async (nombreUser, sede, nombreVet, nombreMascota, mail, servicio, fecha, hora, emailVet) => {

    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "vetuniversopet@gmail.com",
            pass: "nsae srdn ypmw aqvx"
        }
    }

    const htmlContent = `
    <div>
            <h1>Agendó una cita</h1>
            <h2>Hola, ${nombreUser}</h2>
            <p>Ha agendado una cita en la veterinaria UniversoPet, con la siguiente información</p>
            <p>Servicio: ${servicio}</p>
            <p>Fecha: ${fecha}</p>
            <p>Hora: ${hora}</p>
            <p>Sede: ${sede}</p>
            <p>Mascota: ${nombreMascota}</p>
            <p>Veterinario encargado: ${nombreVet}</p>
            <p>Correo del veterinario: ${emailVet}</p>
            <h2>¡Esperamos su asistencia!</h2>
        </div>
        `;

    const mensaje = {
        from: "vetuniversopet@gmail.com",
        to: mail,
        subject: "Notificación de cita",
        html: htmlContent,
        headers: {
            'Content-Type': 'text/html',
        },
    }
    const transport = createTransport(config);

    const info = await transport.sendMail(mensaje);

    return servicio;

}
