import React from 'react';

import s from './emptyCart.module.scss';
import emptyCart from '../../assets/img/empty-cart.png';

const EmptyCart: React.FC = () => {

    return (
        <div className={s.emptyCart}>
            <h1>The cart is empty...</h1>
            <p>You must have not ordered pizza yet. To order pizza - go to the main page</p>
            <img src={emptyCart} alt=""/>
        </div>
    )
}

export default EmptyCart;