import React from 'react'
import {UseParams, useParams} from 'react-router-dom'

import { services } from '../../ServicesMock';

export default function ServiceDetails() {

  let { serviceId } = useParams(); 
  let service = services.find(service => service.id === serviceId);

  return (
    <div>
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <img src = {service.img_src}></img>
    </div>
  )
}
