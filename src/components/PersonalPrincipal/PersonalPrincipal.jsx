import React from 'react';
import './personalprincipal.css';
import img from '../../assets/testimonial1.jpg';
import img2 from '../../assets/testimonial3.jpg';
import img3 from '../../assets/testimonial4.jpg'
import icon from '../../assets/testimonials-icon.svg';
import shapeTwo from '../../assets/shape-2.png';

const PersonalPrincipal = () => {
    return (
        <section className='PersonalPrincipal section' id='PersonalPrincipal'>
            <h2 className="section__title"> NUESTROS LIDERES</h2>
            <p className="section__subtitle">
                En <span> Universo Pet</span>
            </p>
            <div className="PersonalPrincipal__container container grid">
                <div className="PersonalPrincipal__item card card-one">
                    <div className="PersonalPrincipal__header">
                        <div className="PersonalPrincipal__icon">
                            <img src={icon} alt="" />
                        </div>
                    </div>
                    <img src={img} alt="" className='PersonalPrincipal__img' />
                    <h3 className='PersonalPrincipal__name'> Alicia Lopez </h3>
                    <p className="PersonalPrincipal_author"> Gerente
                    </p>
                    <img src={shapeTwo} alt="" className='shape c__shape' />
                </div>
                <div className="PersonalPrincipal__item card card-one">
                    <div className="PersonalPrincipal__header">
                        <div className="PersonalPrincipal__icon">
                            <img src={icon} alt="" />
                        </div>
                    </div>
                    <img src={img2} alt="" className='PersonalPrincipal__img' />
                    <h3 className='PersonalPrincipal__name'> Miguel Acosta </h3>
                    <p className="PersonalPrincipal_author"> Medico Veterinario Auditor
                    </p>
                    <img src={shapeTwo} alt="" className='shape c__shape' />
                </div>
                <div className="PersonalPrincipal__item card card-one">
                    <div className="PersonalPrincipal__header">
                        <div className="PersonalPrincipal__icon">
                            <img src={icon} alt="" />
                        </div>
                    </div>
                    <img src={img3} alt="" className='PersonalPrincipal__img' />
                    <h3 className='PersonalPrincipal__name'> Graciela Sanchez </h3>
                    <p className="PersonalPrincipal_author"> Ingeniera en Sistemas
                    </p>
                    <img src={shapeTwo} alt="" className='shape c__shape PersonalPrincipal__Shape' />
                </div>
            </div>
        </section>
    )
}

export default PersonalPrincipal