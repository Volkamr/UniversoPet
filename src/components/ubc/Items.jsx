import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import shapeTwo from "../../assets/shape-2.png";
import { motion } from 'framer-motion';

const Items = ({ ubcItems }) => {
    return (
        <>
            {ubcItems.map((ubcItems) => {
                const { id, img, category, title, description } = ubcItems;
                return (
                    <motion.div layout animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0.8, scale: 0.6 }} exit={{ opacity: 0.8, scale: 0.6 }} transition={{ duration: 0.3 }} className="ubc__items card card-two" key={id}>
                        <div className="ubc__img-wrapper">
                            <img src={img} alt="" className='ubc__img' />
                        </div>
                        <span className="ubc__category text-cs">{category}</span>
                        <h3 className="ubc__title">{title}</h3>
                        <p className="ubc__description">{description}</p>
                        <a href="https://www.google.com/maps/" target="_blank" rel="noopener noreferrer" className="link">
                            Ver en mapa
                            <FaArrowRight className='link__icon'></FaArrowRight>
                        </a>

                        <img src={shapeTwo} alt="" className="shape c__shape" />
                    </motion.div >
                )
            })}
        </>
    )
}

export default Items