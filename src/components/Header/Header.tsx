import React, {useEffect, useRef} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {BsCart3} from "react-icons/bs";
import {useSelector} from "react-redux";

import s from './header.module.scss';
import logo from '../../assets/img/logo.svg';
import Search from "../Search/Search";
import {cartSelector} from "../../redux/slices/cartSlice";


const Header: React.FC = () => {

    const {totalCount, totalPrice, items} = useSelector(cartSelector);
    const location = useLocation();
    const navigate = useNavigate();
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(items);
            const totalPriceStr = JSON.stringify(totalPrice)
            const totalCountStr = JSON.stringify(totalCount)

            localStorage.setItem('cart', json);
            localStorage.setItem('totalCount', totalCountStr);
            localStorage.setItem('totalPrice', totalPriceStr);
        }
        isMounted.current = true;
    }, [items]);

    return (
        <div className={s.header}>
            <div className={s.leftSide} onClick={() => navigate('/')}>
                <div className={s.logo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={s.logoCaption}>
                    <h1>REACT PIZZA</h1>
                    <h3>Tastes better than ever</h3>
                </div>
            </div>

            {location.pathname !== '/cart' &&
                (<>
                    {location.pathname === '/' && <Search/>}
                    <div className={s.buttonWrapper}>
                        <button className={s.rightSide} onClick={() => navigate('/cart')}>
                            <div className={s.totalPrice}>{totalPrice} $</div>
                            <div className={s.basket}>
                                <div className={s.basketIcon}>{<BsCart3 size={16}/>}</div>
                                <div className={s.totalCount}>{totalCount}</div>
                            </div>
                        </button>
                    </div>
                </>)
            }
        </div>
    );
}

export default Header;