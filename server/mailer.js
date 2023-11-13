import { createTransport } from 'nodemailer';

export const enviarMail = async (correo, OTP) => {

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
        to: correo,
        subject: "Código de recuperación de contraseña",
        text: "Su código de recuperación de cuenta es el siguiente: \n " + OTP,
    }
    const transport = createTransport(config);

    const info = await transport.sendMail(mensaje);

    console.log(info);

    return OTP;

}
