import { createTransport } from 'nodemailer';

export const enviarMail_cita = async (mail, servicio, fecha) => {

    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "vetuniversopet@gmail.com",
            pass: "nsae srdn ypmw aqvx"
        }
    }

    const mensaje = {
        from: "vetuniversopet@gmail.com",
        to: mail,
        subject: "Correo de notificación de cita",
        text: "Tiene una cita de " + servicio + " agendada para la fecha " + fecha + ". \n\nPara mas información entre en la aplicación"
    }
    const transport = createTransport(config);

    const info = await transport.sendMail(mensaje);

    console.log(info);

    return servicio;

}
