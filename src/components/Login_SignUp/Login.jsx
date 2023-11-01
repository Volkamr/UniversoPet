import React, { useState } from "react";
import './Login.css';
import axios from "axios";
import Swal from "sweetalert2";
import { postLoginAdminRequest, postLoginRequest, postLoginVetRequest } from "../../api/vet";
import Select from "react-select";

export const Login = () => {

    const [action, setAction] = useState("Login");
    const registerLink = document.querySelector('.registrarse');
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-l');
    const divRegistro = document.getElementById('registro-box');

    const [email_log, setEmail] = useState('');
    const [password_log, setPassword] = useState('');

    const emailLoginChange = (e) => {
        setEmail(e.target.value)
    }
    const passLoginChange = (p) => {
        setPassword(p.target.value)
    }

    const [cedula, setCedula] = useState('');
    const [adminusr, setAdminUsr] = useState('');
    const [apellidos, setAPellidos] = useState('');
    const [email_reg, setEmailReg] = useState('');
    const [pass_reg, setPassReg] = useState('');
    const [nombres, setNombres] = useState('');
    const [celular, setCelular] = useState('');
    const [edad, setEdad] = useState('');

    const cedulaChange = (e) => {
        setCedula(e.target.value)
    }
    const AdminUSrChange = (e) => {
        setAdminUsr(e.target.value)
    }
    const emailRegChange = (e) => {
        setEmailReg(e.target.value)
    }

    const passRegChange = (p) => {
        setPassReg(p.target.value)
    }

    const nombresChange = (n) => {
        setNombres(n.target.value)
    }

    const apellidosChange = (a) => {
        setAPellidos(a.target.value)
    }

    const celularCahnge = (c) => {
        setCelular(c.target.value)
    }

    const edadChange = (ed) => {
        setEdad(ed.target.value)
    }

    const roles = [
        { label: "Usuario", value: 'Usuario' },
        { label: 'Administrador', value: 'Administrador' },
        { label: 'Veterinario', value: 'Veterinario' }
    ]

    const [rol, setRol] = useState(roles[0]);

    const opcionesFiltradas = roles.filter((rol_s) => rol_s.value !== rol.value);

    const handleSelectItem = (event) => {
        setRol(event);
    }

    const handleLoginUsuario = async (event) => {
        event.preventDefault();

        try {
            const response = await postLoginRequest(email_log, password_log)
            
            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error - ${response.status}`);
            }

            const data = response.data;

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: "Login exitoso",
                    text: "Será redireccionado",
                    showConfirmButton: false,
                    timer: 2000 
                })
                    .then(() => {
                        window.location.href = `/perfil/${data.accessToken}`;
                    });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login fallido',
                    text: data.message
                });
            }

        } catch (error) {
            console.error('Login error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Login Fallido',
                text: 'Error'
            });
        }

    }

    const handleLoginVeterinario = async (event) => {
        event.preventDefault();
        try {
            const response = await postLoginVetRequest(cedula, password_log);

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error - ${response.status}`);
            }

            const data = response.data;
            console.log(data)

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: "Login exitoso",
                    text: "Será redireccionado",
                    showConfirmButton: true
                })

                .then(() => {
                    window.location.href = `/Veterinario/${data.accessToken}`;
                });

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Login fallido',
                    text: data.message
                });
            }
        } catch (error) {

        }

    }

    const handleLoginAdmin = async (event) =>{
        event.preventDefault();
        try{
            const response = await postLoginAdminRequest(adminusr, password_log);

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error - ${response.status}`);
            }

            const data = response.data;

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: "Login exitoso",
                    text: "Será redireccionado",
                    showConfirmButton: false,
                    timer: 2000
                })

                    .then(() => {
                        //Redirigir a la página de Administrador
                        console.log("Inició sesión como administrador")
                    });

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Login fallido',
                    text: data.message
                });
            }

        }catch(error){

        }
    }

    const handleRegistro = async (event) => {
        event.preventDefault();

        try {

            const response = await axios.post("http://localhost:3001/UniversoPet/Api/RegistrarUsuario",
                {
                    email: email_reg,
                    password: pass_reg,
                    nombres: nombres,
                    apellidos: apellidos,
                    celular: celular,
                    edad: edad
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error - ${response.status}`);
            }

            const data = response.data;

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    text: "Debe iniciar sesión",
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registro fallido',
                    text: data.message
                });
            }

        } catch (error) {
            console.error('Login error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Falló el registro',
                text: 'Error'
            });
        }

    }


    return (


        <section className="Login">

            <container className="login_container">
                <div className={`wrapper_login ${action === 'Registrarse' ? 'active' : ''}`}>

                    <div class="form-box login">
                        <form onSubmit={rol.value === "Veterinario" ? (handleLoginVeterinario) : rol.value==="Usuario" ? (handleLoginUsuario) : handleLoginAdmin}>
                            <h2 className="h2-login-reg">Login</h2>
                            <span className="line"></span>

                            <div className="inputs">

                                <label for={rol.value === 'Usuario' ? ("email") : rol.value === 'Veterinario' ? ("cedula") : ("admin_user")}>
                                    {rol.value === 'Usuario' ? ('Email') : rol.value === "Veterinario" ? ('Cedula') : ('Admin user')}
                                </label>

                                <input className="input-log" type={rol.value === 'Usuario' ? ("email") : rol.value === 'Veterinario' ? ("number") : ("text")}
                                    name={rol.value === 'Usuario' ? ("email") : rol.value === 'Veterinario' ? ("cedula") : ("admin_user")}
                                    value={rol.value === 'Usuario' ? (email_log) : rol.value === 'Veterinario' ? (cedula) : (adminusr)} required
                                    placeholder={rol.value === 'Usuario' ? ("Ingrese su correo electrónico") : rol.value === "Veterinario" ? ("Ingrese su cédula"):
                                    ("Ingrese su usuario de Administrador")} id="email"
                                    onChange={rol.value === 'Usuario' ? (emailLoginChange) : rol.value === 'Veterinario' ? (cedulaChange) : (AdminUSrChange)}></input>


                                <label for="psswd">Contraseña</label>
                                <input className="input-log" type="password" name="password" value={password_log} required
                                    placeholder="Ingrese su contraseña" id="psswd" onChange={passLoginChange}></input>

                                <Select
                                    value={rol}
                                    options={opcionesFiltradas}
                                    onChange={handleSelectItem}
                                >
                                </Select>

                                <p className="mensaje">
                                    ¿Olvidó su contraseña?
                                    <a className="a-login" href="#">Recuperar contraseña</a>
                                </p>

                                <input className="btn-login-reg btn-login-depth" type="submit" value="Login"></input>

                            </div>
                        </form>

                    </div>

                    <div class="form-box registro" id="registro-box">
                        <form onSubmit={handleRegistro}>
                            <h2 className="h2-login-reg" id="req-title">Registro</h2>
                            <span className="line"></span>

                            <div className="inputs" id="inp-reg">

                                <label for="nombres-reg" id="l-n">Nombres</label>
                                <input className="input-log" type="text" name="nombres" value={nombres} required
                                    placeholder="Ingrese sus nombres" id="nombres-reg" onChange={nombresChange}></input>

                                <label for="apell-reg" id="l-a">Apellidos</label>
                                <input className="input-log" type="text" name="apellidos" value={apellidos} required
                                    placeholder="Ingrese sus apellidos" id="apell-reg" onChange={apellidosChange}></input>

                                <label for="email-reg" id="l-e">Email</label>
                                <input className="input-log" type="email" name="email" value={email_reg} required
                                    placeholder="Ingrese su correo electrónico" id="email-reg" onChange={emailRegChange}></input>

                                <label for="psswd-reg" id="l-p">Contraseña</label>
                                <input className="input-log" type="password" name="password" value={pass_reg} required
                                    placeholder="Ingrese su contraseña" id="psswd-reg" onChange={passRegChange}></input>

                                <label for="celular" id="l-c">Celular</label>
                                <input className="input-log" type="number" name="celular" pattern="[0-9]+" value={celular} required
                                    placeholder="Ingrese su celular" id="cel-reg" onChange={celularCahnge}></input>

                                <label for="edad" id="l-ed">Edad</label>
                                <input className="input-log" type="number" name="edad" pattern="[0-9]+" value={edad} required
                                    placeholder="Ingrese su edad" id="edad-reg" onChange={edadChange}></input>

                                <div class="terminos-cond">
                                    <input type="checkbox" id="Terminos"></input>
                                    <label for="Terminos" id="l-terminos">Acepto los
                                        <a className="a-login" id="a-terminos" href="">Términos y condiciones</a>
                                    </label>
                                </div>

                                <input className="btn-login-reg btn-login-depth" type="submit" value="Registrarse" id="btn-reg"></input>

                            </div>
                        </form>
                    </div>

                </div>

                {

                    action === "Login"
                        ?
                        <div class="cambio">
                            <p className="mensaje">
                                ¿No tiene una cuenta? <a className="registrarse a-login" href="#"
                                    onClick={() => {
                                        setAction("Registrarse");

                                    }}>Crear cuenta</a>
                            </p>
                        </div>
                        :
                        <div class="cambio" id="cambio-reg">
                            <p className="mensaje">
                                ¿Ya tiene una cuenta? <a className="login-l a-login" href="#"
                                    onClick={() => {
                                        setAction("Login");

                                    }}>Inice sesión</a>
                            </p>
                        </div>

                }
            </container>




        </section>


    );
};

export default Login;