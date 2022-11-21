import React from 'react';

import s from './notFoundBlock.module.scss'


const NotFoundBlock: React.FC = () => {

    return (
        <div className={s.notFoundContent}>
            Oops...Here is no pizzas
        </div>
    )
};

export default NotFoundBlock;