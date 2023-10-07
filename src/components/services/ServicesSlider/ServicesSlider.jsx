import React from "react";
import { useEffect, useState } from "react";
import './servicesSlider.css'
import { FaArrowRight } from "react-icons/fa";
import shapeTwo from '../../../assets/shape-2.png'
import { getServicesRequest } from "../../../api/vet.js";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export const ServicesSlider = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        async function loadServices() {
            const response = await getServicesRequest();
            setServices(response.data)
        }
        loadServices()
    }, [])

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

                {services.map(service => {
                    return (
                        <SwiperSlide className="services__item card card-one" key={service.idServicio}>
                            <span className="services__subtitle text-cs">
                                Universo Pet
                            </span>

                            <h3 className="services__title">{service.nombre}</h3>

                            <Link to={`/servicios/${service.idServicio}`} className="link">
                                Mas Información
                                <FaArrowRight className="link__icon"></FaArrowRight>
                            </Link>

                            <img src={shapeTwo} alt="" className="shape c__shape" />
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </section>
    );
};

export default ServicesSlider;