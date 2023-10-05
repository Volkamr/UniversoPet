import React, { useState } from 'react'

const Lista = ({ lista, filterItems }) => {
    const [active, setActive] = useState(0);

    return (
        <div className='ubc__list'>{lista.map((ciudad, index) => {
            return (
                <button className={`${active === index ? 'active-work' : ''} ubc__list-item`}
                    key={index}
                    onClick={() => {
                        setActive(index);
                        filterItems(ciudad);
                    }} >
                    {ciudad}
                </button >
            )
        })}</div >
    )
}

export default Lista