import React, { useState } from "react";
import './Login.css';
import axios from "axios";
import Swal from "sweetalert2";
import { postLoginRequest } from "../../api/vet";

export const Login = () => {

    const [action, setAction] = useState("Login");
    const registerLink = document.querySelector('.registrarse');
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-l');
    const divRegistro = document.getElementById('registro-box');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passChange = (p) => {
        setPassword(p.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault();  

        try {
            
            const response = await axios.post("http://localhost:3001/UniversoPet/Api/Login", {email:email, password:password}, {headers: {
                'Content-Type': 'application/json',
              }})

            if (response.status<200 || response.status>=300) {
                throw new Error(`Error - ${response.status}`);
            }
    
            const data =  response.data; 
    
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    text: "Será redireccionado",
                    showConfirmButton: false,
                    timer: 1500  
                });
    
            } else {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Login fallido',
                    text: data.message || 'Unknown error'
                });
            }
        } catch (error) {
            console.error('Login error:', error);
    
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Error'
            });
        }
    
    }

    return (


        <section className="Login">

            <container className="login_container">
                <div className={`wrapper_login ${action === 'Registrarse' ? 'active' : ''}`}>

                    <div class="form-box login">
                        <form onSubmit={handleLogin}>
                            <h2 className="h2-login-reg">Login</h2>
                            <span className="line"></span>

                            <div className="inputs">

                                <label for="email">Email</label>
                                <input className="input-log" type="email" name="email" value={email} 
                                    placeholder="Ingrese su correo electrónico" id="email" onChange = {emailChange}></input>

                                <label for="psswd">Contraseña</label>
                                <input className="input-log" type="password" name="password" value = {password} 
                                    placeholder="Ingrese su contraseña" id="psswd" onChange = {passChange}></input>

                                <p className="mensaje">
                                    ¿Olvidó su contraseña?
                                    <a className="a-login" href="#">Recuperar contraseña</a>
                                </p>

                                <input className="btn-login-reg btn-login-depth" type="submit" value="Login"></input>

                            </div>
                        </form>





                    </div>

                    <div class="form-box registro" id="registro-box">
                        <form action="http://localhost:3001/UniversoPet/Api/RegistrarUsuario" method="post">
                            <h2 className="h2-login-reg">Registro</h2>
                            <span className="line"></span>

                            <div className="inputs">

                                <label for="nombres">Nombres</label>
                                <input className="input-log" type="text" name="nombres" placeholder="Ingrese sus nombres" id="nombres"></input>

                                <label for="apellidos">Apellidos</label>
                                <input className="input-log" type="text" name="apellidos" placeholder="Ingrese sus apellidos" id="nombres"></input>

                                <label for="email">Email</label>
                                <input className="input-log" type="email" name="email" placeholder="Ingrese su correo electrónico" id="email"></input>

                                <label for="psswd">Contraseña</label>
                                <input className="input-log" type="password" name="password" placeholder="Ingrese su contraseña" id="psswd"></input>

                                <div class="terminos y cond">
                                    <input type="checkbox" id="Terminos"></input>
                                    <label for="Terminos" id="l-terminos">Acepto los
                                        <a className="a-login" id="a-terminos" href="">Términos y condiciones</a>
                                    </label>
                                </div>

                                <input className="btn-login-reg btn-login-depth" type="submit" value="Registrarse"></input>

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
                        <div class="cambio">
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