import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IoTrashOutline} from "react-icons/io5";
import {BsCart3} from "react-icons/bs";
import {IoIosArrowBack} from "react-icons/io";

import EmptyItems from "../EmptyItems/EmptyItems";
import {CartItem} from "../CartItem/CartItem";
import {cartSelector, clearItems} from "../../redux/slices/cartSlice";
import s from "./cart.module.scss";


const Cart: React.FC = () => {

    const {items, totalCount, totalPrice} = useSelector(cartSelector);
    const dispatch = useDispatch();

    return (
        <div className={s.cartWrapper}>
            <div className={s.cart}>
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
                        items.map((obj: any) => <CartItem key={obj.id} {...obj}/>)
                        : <EmptyItems
                            title='The cart is empty...'
                            subtitle='You must have not ordered pizza yet. To order pizza - go to the main page'
                        />
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
        </div>
    );
}

export default Cart;