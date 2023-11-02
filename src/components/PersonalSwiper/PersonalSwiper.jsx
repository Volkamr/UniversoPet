import React from 'react';
import shapeTwo from '../../assets/shape-2.png';
import icon from '../../assets/testimonials-icon.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './personalswiper.css';
import { getPersonalRequest } from '../../api/vet';

const Personal = [
    ...new Set(((await getPersonalRequest()).data))
]

const PersonalSwiper = () => {
    return (
        <section className="PersonalSwiper section" id="PersonalSwiper">
            <h2 className="section__title"> PERSONAL </h2>
            <p className="section__subtitle">
                Familia <span> Universo Pet</span>
            </p>

            <Swiper
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    540: {
                        slidesPerWiew: 1,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
                modules={[Pagination]}
                className="PersonalSwiper__container container"
            >

                {Personal.map(({ fotoPerfil, nombres, apellidos, tipoPersonal, profesion }, index) => {
                    return (
                        <SwiperSlide className="PersonalSwiper__item card card-one" key={index}>
                            <div className="PersonalSwiper__header">
                                <div className="PersonalSwiper__icon">
                                    <img src={icon} alt="" />
                                </div>

                                <img src={"data:img/png;base64," + fotoPerfil} alt="" className="PersonalSwiper__nos__img" />
                            </div>
                            <p className="PersonalSwiper__description">{profesion}</p>
                            <h3 className="PersonalSwiper__name">{nombres} {apellidos}</h3>
                            <p className="PersonalSwiper__author">{tipoPersonal}</p>
                            <img src={shapeTwo} alt="" className="shape c__shape" />
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </section>
    )
}

export default PersonalSwiper