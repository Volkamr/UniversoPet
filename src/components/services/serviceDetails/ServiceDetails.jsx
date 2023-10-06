import React from 'react'
import { useParams } from 'react-router-dom'
import { NavBar } from '../../nav/NavBar';
import './ServiceDetails.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { getService } from '../../../api/vet';
import { useEffect, useState } from "react";



export default function ServiceDetails() {

  const { idServicio } = useParams();
  const [service, setService] = useState([])

  useEffect(() => {
    async function loadServices() {
      const response = await getService(idServicio);
      setService(response.data)
    }
    loadServices()
  }, [idServicio])

  return (
    <section className="serviceDetailsView">
      <NavBar className="nav-serviceD" />
      <container className="serviceDetails-container">
        <container className="titulo-btn">
          <Link to="/servicios">
            <button className="btn-regresar" id="regresar">
              <FaArrowLeft />Regresar</button>
          </Link>
          <h2 className="titulo-servicio">{service.nombre}</h2>
        </container>
        <container className="container-descripcion">
          <p className="contenido-servicio">{service.descripcion}</p>
          <img className="img2-servicio" alt="" src={"data:image/png;base64," + service.imgServicio}></img>
        </container>
      </container>
    </section>
  )
}
