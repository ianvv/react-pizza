import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai";
import {TiDeleteOutline} from "react-icons/ti";

import s from './cart.module.scss';
import {increment, decrement, removeItem, cartItemByIdSelector} from "../../redux/slices/cartSlice";


type CartItemProps = {id: number, name: string, price: number, imageUrl: string, type: string, size: string};

export const CartItemCard: React.FC<CartItemProps> = ({id, name, price, imageUrl, type, size}) => {

    const count = useSelector(cartItemByIdSelector(id))?.count;
    const dispatch = useDispatch();

    return (
        <div className={s.cartWrapper}>
            <div className={s.item}>
                <div className={s.pizzaImg}>
                    <img src={imageUrl} alt=""/>
                </div>
                <div className={s.itemDescription}>
                    <div className={s.itemName}>{name}</div>
                    <div className={s.itemSize}>
                        <div className={s.itemWidth}>{type},</div>
                        <div className={s.cm}>{size} cm</div>
                    </div>
                </div>
                <div className={s.setCount}>
                    <button className={s.minus}
                            onClick={() => dispatch(decrement(id))}
                            disabled={count === 1}
                    >
                        <AiOutlineMinusCircle size={30}/>
                    </button>
                    <div className={s.count}>
                        {count}
                    </div>
                    <button className={s.plus} onClick={() => dispatch(increment(id))}>
                        <AiOutlinePlusCircle size={30}/>
                    </button>
                </div>
                <div className={s.price}>
                    {count && count * price}$
                </div>
                <button
                    className={s.remove}
                    onClick={() => dispatch(removeItem(id))}
                >
                    <TiDeleteOutline size={34}/>
                </button>
            </div>
        </div>
    );
}

// export default CartItemCard;