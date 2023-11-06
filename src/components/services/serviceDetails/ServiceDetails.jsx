import React from 'react'
import { useParams } from 'react-router-dom'
import { NavBar } from '../../nav/NavBar';
import './ServiceDetails.css';
import { getService } from '../../../api/vet';
import { useEffect, useState } from "react";
import ser from '../../../assets/servicio def.jpg'

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
    <section className="serviceDetailsView section">
      <NavBar />
      <container className="serviceDetails-container">
        <container className="titulo-btn">
          <h2 className="titulo-servicio text-cs">{service.nombre}</h2>
        </container>
        <container className="container-descripcion grid">
          {
            service.imgServicio ? <img className="img2-servicio" alt="" src={"data:image/png;base64," + service.imgServicio}></img> : <img className="img2-servicio" alt="" src={ser}></img>
          }
          <div>
            <p className="contenido-servicio">{service.descripcion}</p>
            <div className='btn__servicio'>
              <button className="btn text-cs h"> Agendar Cita </button>
            </div>
          </div>
        </container>
      </container>
    </section>
  )
}
