import React from 'react'
import './cartas.css';
import shapeTwo from '../../assets/shape-2.png'

const PersonalSwiper = () => {
    return (
        <section className="Cartas section" id="Cartas">
            <div className="Cartas__container container grid">
                <div className="Cartas__item card card-one">
                    <span className='Cartas__subtitle text-cs'>
                        Universo Pet
                    </span>
                    <h3 className='Cartas__title'>
                        Vision
                    </h3>
                    <p className="Cartas__description">
                        Convertirnos en una empresa reconocida en el país, por medio de un excepcional servicio a nuestros clientes.
                    </p>
                    <img src={shapeTwo} alt="" className='shape c__shape' />
                </div>
                <div className="Cartas__item card card-one">
                    <span className='Cartas__subtitle text-cs'>
                        Universo Pet
                    </span>
                    <h3 className='Cartas__title'>
                        Mision
                    </h3>
                    <p className="Cartas__description">
                        Brindar un servicio de gran calidad, brindando comodidad y seguirdad en cada servicio.
                    </p>
                    <img src={shapeTwo} alt="" className='shape c__shape' />
                </div>
                <div className="Cartas__item card card-one">
                    <span className='Cartas__subtitle text-cs'>
                        Universo Pet
                    </span>
                    <h3 className='Cartas__title'>
                        Valores
                    </h3>
                    <p className="Cartas__description">
                        Nuestra politica de calidad en el servicio esta fundamentada en la confianza, atencion y seguridad
                    </p>
                    <img src={shapeTwo} alt="" className='shape c__shape' />
                </div>
            </div>
        </section>
    )
}

export default PersonalSwiper