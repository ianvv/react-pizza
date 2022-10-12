import React from 'react';
import {IoTrashOutline} from "react-icons/io5";
import {BsCart3} from "react-icons/bs";
import {IoIosArrowBack} from "react-icons/io";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import s from "./cart.module.scss";
import {CartItemCard} from "./CartItemCard";
import {cartSelector, clearItems} from "../../redux/slices/cartSlice";
import EmptyCart from "../EmptyCart/EmptyCart";


const Cart: React.FC = () => {

    const {items, totalCount, totalPrice} = useSelector(cartSelector);
    const dispatch = useDispatch()

    return (
        <div className={s.cartWrapper}>
            {
                items.length > 0 && <div className={s.cartHeader}>
                    <div className={s.leftSide}>
                        <BsCart3 size={28}/> Cart
                    </div>
                    <div className={s.rightSide} onClick={() => dispatch(clearItems())}>
                        <div className={s.trash}><IoTrashOutline/></div>
                        <span>Clear the basket</span>
                    </div>
                </div>
            }
            {
                items.length > 0 ?
                    items.map((obj: any) => <CartItemCard key={obj.id} {...obj}/>)
                    : <EmptyCart/>
            }
            {
                items.length > 0 && <div className={s.cartFooter}>
                    <div className={s.totalPizzas}>
                        Total pizzas: <span>{totalCount} pcs</span>
                    </div>
                    <div className={s.sum}>
                        Order price: <span> {totalPrice}$</span>
                    </div>
                </div>
            }
            <div className={s.buttons}>
                <Link to='/'>
                    <button className={s.backButton}><span><IoIosArrowBack/></span> Go back</button>
                </Link>
                {items.length > 0 && <button className={s.payButton}>Pay now</button>}
            </div>
        </div>
    );
}

export default Cart;