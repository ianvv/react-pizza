import React from 'react';

import s from './homePageError.module.scss';
import emptyCart from '../../assets/img/empty-cart.png';

const HomePageError: React.FC = () => {

    return (
        <div className={s.emptyCart}>
            <h1>Oops! Something went wrong...</h1>
            <p>Please try to reload this page</p>
            <img src={emptyCart} alt=""/>
        </div>
    )
}

export default HomePageError;