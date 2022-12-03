import React from 'react';

import s from './EmptyItems.module.scss';
import emptyCart from '../../assets/img/empty-cart.png';


interface IEmptyItemsProps {
    title: string;
    subtitle: string;
}


const EmptyItems: React.FC<IEmptyItemsProps> = ({title, subtitle}) => {

    return (
        <div className={s.emptyItemsWrapper}>
            <div className={s.emptyItems}>
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <img src={emptyCart} alt="empty item image"/>
            </div>
        </div>
    );
}

export default EmptyItems;