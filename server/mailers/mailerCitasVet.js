import { createTransport } from 'nodemailer';

export const enviarMailVet = async (nombreUser, sede, nombreVet, nombreMascota, mail, servicio, fecha, hora, userMail) => {

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
            <h1>Tiene una nueva cita agendada</h1>
            <h2>Hola, ${nombreVet}</h2>
            <p>Se le agendó una cita en UniversoPet, con la siguiente información</p>
            <p>Servicio: ${servicio}</p>
            <p>Fecha: ${fecha}</p>
            <p>Hora: ${hora}</p>
            <p>Sede: ${sede}</p>
            <p>Nombre de la mascota: ${nombreMascota}</p>
            <p>Nombre del usuario que la agendó: ${nombreUser}</p>
            <p>Correo del usuario: ${userMail}</p>
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
