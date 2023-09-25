import React from 'react'
import { useParams } from 'react-router-dom'

import { services } from '../../../ServicesMock';
import { NavBar } from '../../nav/NavBar';
import './ServiceDetails.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'

export default function ServiceDetails() {

  let { serviceId } = useParams();
  let service = services.find(service => service.id === serviceId);

  return (
    <section className="serviceDetailsView">
      <NavBar className="nav-serviceD" />
      <container className="serviceDetails-container">
        <container className="titulo-btn">
          <Link to="/servicios">
            <button className="btn-regresar" id="regresar">
              <FaArrowLeft />Regresar</button>
          </Link>
          <h2 className="titulo-servicio">{service.name}</h2>
        </container>
        <container className="container-descripcion">
          <p className="contenido-servicio">{service.description}</p>
          <img className="img2-servicio" alt="" src={service.img2_src}></img>
        </container>
      </container>
    </section>
  )
}
