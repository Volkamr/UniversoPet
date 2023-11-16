import React from 'react'
import { useParams } from 'react-router-dom'
import { NavBar } from '../../nav/NavBar';
import './ServiceDetails.css';
import { getService } from '../../../api/vet';
import { useEffect, useState } from "react";
import ser from '../../../assets/servicio def.jpg'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

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

  const [estado, setEstado] = useState('');
  const [token, setToken] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('UserToken');
    const local_data = JSON.parse(loggedUserJSON)
    if (loggedUserJSON != null) {
      setEstado('Loggeado');
      setToken(local_data.token)
      setRol(local_data.rol)
    }
  }, [estado, token, rol])

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
              {
                estado === 'Loggeado' && rol === 'usuario' ? (
                  <Link to={`/perfil/${token}`}>
                    <button className="btn text-cs h"> Agendar Cita </button>
                  </Link>
                ) : (
                  <Link onClick={() => {
                    Swal.fire({
                      icon: 'info',
                      title: 'Tiene que iniciar sesión',
                      text: 'Debe iniciar sesión para poder agendar una cita',
                    })
                      .then(() => {
                        localStorage.removeItem('UserToken');
                        window.location.href = '/login';
                      });
                  }}>
                    <button className="btn text-cs h"> Agendar Cita </button>
                  </Link>
                )


              }
            </div>
          </div>
        </container>
      </container>
    </section>
  )
}
