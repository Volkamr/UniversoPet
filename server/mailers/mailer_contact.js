import { createTransport } from 'nodemailer';

export const enviarMail_contact = async (name, mail, subject, message) => {

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
        to: "vetuniversopet@gmail.com",
        subject: subject,
        text: "<-" + name + ", correo: " + mail + "->" + "\n\n " + message,
    }
    const transport = createTransport(config);

    const info = await transport.sendMail(mensaje);

    console.log(info);

    return name;

}
