import React, { useState } from "react";
import './Login.css';

export const Login = () => {

    const [action, setAction] = useState("Login");
    const registerLink = document.querySelector('.registrarse');
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-l');
    const divRegistro = document.getElementById('registro-box');


    return (


        <section className="Login">

            <container className="login_container">
                <div className={`wrapper_login ${action === 'Registrarse' ? 'active' : ''}`}>

                    <div class="form-box login">
                        <form>
                            <h2 className="h2-login-reg">Login</h2>
                            <span className="line"></span>

                            <div className="inputs">

                                <label for="email">Email</label>
                                <input className="input-log" type="email" name="email" placeholder="Ingrese su correo electrónico" id="email"></input>

                                <label for="psswd">Contraseña</label>
                                <input className="input-log" type="password" name="pasword" placeholder="Ingrese su contraseña" id="psswd"></input>

                                <p class="mensaje">
                                    ¿Olvidó su contraseña?
                                    <a class="enlaces" href="#">Recuperar contraseña</a>
                                </p>

                                <input className="btn-login-reg btn-login-depth" type="submit" value="Ingresar"></input>

                            </div>
                        </form>
                    </div>

                    <div class="form-box registro" id="registro-box">
                        <form>
                            <h2 className="h2-login-reg">Registro</h2>
                            <span className="line"></span>

                            <div className="inputs">

                                <label for="nombres">Nombres</label>
                                <input className="input-log" type="text" name="nombres" placeholder="Ingrese sus nombres" id="nombres"></input>

                                <label for="apellidos">Apellidos</label>
                                <input className="input-log" type="text" name="nombres" placeholder="Ingrese sus apellidos" id="nombres"></input>

                                <label for="email">Email</label>
                                <input className="input-log"  type="email" name="email" placeholder="Ingrese su correo electrónico" id="email"></input>

                                <label for="psswd">Contraseña</label>
                                <input className="input-log" type="password" name="pasword" placeholder="Ingrese su contraseña" id="psswd"></input>

                                <div class="terminos y cond">
                                    <input  type="checkbox" id="Terminos"></input>
                                    <label for="Terminos" id="l-terminos">Acepto los
                                        <a id="a-terminos" href="">Términos y condiciones</a>
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
                            <p>
                                ¿No tiene una cuenta? <a className="registrarse" href="#"
                                    onClick={() => {
                                        setAction("Registrarse");

                                    }}>Crear cuenta</a>
                            </p>
                        </div>
                        :
                        <div class="cambio">
                            <p>
                                ¿Ya tiene una cuenta? <a className="login-l" href="#"
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