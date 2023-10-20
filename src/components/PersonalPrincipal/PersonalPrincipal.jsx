import React from 'react';
import './personalprincipal.css';
import icon from '../../assets/testimonials-icon.svg';
import shapeTwo from '../../assets/shape-2.png';

import { getPersonalPRequest } from '../../api/vet';

const PersonalP = [
    ...new Set(((await getPersonalPRequest()).data))
]

const PersonalPrincipal = () => {
    return (
        <section className='PersonalPrincipal section' id='PersonalPrincipal'>
            <h2 className="section__title"> NUESTROS LIDERES</h2>
            <p className="section__subtitle">
                En <span> Universo Pet</span>
            </p>

            <div className="PersonalPrincipal__container container grid">

                {
                    PersonalP.map(persona => {
                        return <div className="PersonalPrincipal__item card card-one">
                            <div className="PersonalPrincipal__header">
                                <div className="PersonalPrincipal__icon">
                                    <img src={icon} alt="" />
                                </div>
                            </div>
                            <img src={"data:image/png;base64," + persona.fotoPerfil} alt="" className='PersonalPrincipal__img' />
                            <h3 className='PersonalPrincipal__name'> {persona.nombres} {persona.apellidos} </h3>
                            <p className="PersonalPrincipal_author"> {persona.tipoPersonal} </p>
                            <img src={shapeTwo} alt="" className='shape c__shape' />
                        </div>
                    })
                }

            </div>
        </section>
    )
}

export default PersonalPrincipal