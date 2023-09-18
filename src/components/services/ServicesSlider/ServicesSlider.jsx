import React from "react";
import './servicesSlider.css'
import { FaArrowRight } from "react-icons/fa";
import { services } from "../../../Data";
import shapeTwo from '../../../assets/shape-2.png'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export const ServicesSlider = () => {
    return (
        <section className="services section" id="services">
            <h2 className="section__title"> Nuestros Servicios </h2>
            <p className="section__subtitle">
                En <span> Universo Pet</span>
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
                className="services__container container"
            >

                {services.map(({ name, title, description }, index) => {
                    return (
                        <SwiperSlide className="services__item card card-one" key={index}>
                            <span className="services__subtitle text-cs">
                                {name}
                            </span>

                            <h3 className="services__title">{title}</h3>
                            <a href="https://www.upb.edu.co/es/home" className="link">
                                Más Información
                                <FaArrowRight className="link__icon"></FaArrowRight>
                            </a>

                            <img src={shapeTwo} alt="" className="shape c__shape" />
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </section>
    );
};

export default ServicesSlider;