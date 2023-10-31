import React from 'react'
import './cartas_admin.css';
import añadir from '../../../assets/añadir.png'
import buscar from '../../../assets/buscar.png'
import { Link } from 'react-router-dom'
import shapeTwo from '../../../assets/shape-2.png'

const PersonalSwiper = () => {
    return (
        <section className="Cartas section" id="Cartas">
            <div className="Cartasad__container">
                {/*primera tarjeta */}
                <div className='tarjeta1'>
                    <h3 className='Cartas__title'> Buscar empleado</h3>
                    <div className='contenido_carta'>
                        <div className='imagen_carta'>
                            <img src={buscar} />
                        </div>
                        <div className='texto_carta'>
                            <input type='text' name='search' required="required" placeholder='   '></input>
                            <span>Ingrese nombre o ID</span>
                            <div className='div_btn_busc'>
                                <Link to={''}>
                                    <button className="btn_buscar">Buscar</button>
                                </Link>
                            </div>
                            <div className='dec'>
                                <img src={shapeTwo} alt="" className='s' />
                            </div>
                        </div>
                    </div>
                </div>
                {/* segunda tarjeta */}
                <div className='tarjeta2'>
                    <h3 className='Cartas__title'>Añadir empleado</h3>
                    <div className='contenido_carta'>
                        <div className='imagen_carta'>
                            <img src={añadir} />
                        </div>
                        <div className='texto_carta'>
                            <div className='text_a'>
                                Ingrese la información necesaria para poder crear la cuenta de un nuevo empleado.
                            </div>
                            {/* <div className='text_a'>
                                <span>Ingrese la información necesaria para poder crear la cuenta de un nuevo empleado.</span>
                            </div> */}
                            <div className='div_btn_busc'>
                                <Link to={''}>
                                    <button className="btn_buscar">Añadir</button>
                                </Link>
                            </div>
                            <div className='dec'>
                                <img src={shapeTwo} alt="" className='s' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default PersonalSwiper