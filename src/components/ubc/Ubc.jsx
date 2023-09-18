import React, { useState } from 'react'
import Lista from './Lista';
import Items from './Items';
import { projects } from '../../Data';
import './ubc.css';
import { AnimatePresence } from 'framer-motion';

const allNavList = [
    'all',
    ...new Set(projects.map((project) => project.category)),
];

const Ubc = () => {
    const [ubcItems, setMenuItems] = useState(projects);
    // eslint-disable-next-line
    const [navList, setCategories] = useState(allNavList);

    const filterItems = (category) => {
        if (category === 'all') {
            setMenuItems(projects);
            return;
        }
        const newProjectItems = projects.filter((item) => item.category === category);
        setMenuItems(newProjectItems);
    }

    return (
        <section className='ubc section' id='work'>
            <h2 className='section__title text-cs'>
                Ubicaciones
            </h2>
            <p className='section__subtitle'>
                Nos <span> Encuentras </span>
            </p>

            <Lista lista={navList} filterItems={filterItems} />

            <div className="ubc__container container grid">
                <AnimatePresence initial={false}>
                    <Items ubcItems={ubcItems} />
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Ubc