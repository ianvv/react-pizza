import React, {useState} from 'react';
import {BsPlus} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";

import s from './pizzaCard.module.scss';
import {addItem, CartItem, cartItemByIdSelector} from "../../../redux/slices/cartSlice";



type typeNamesItem = string[];
type sizeNamesItem = number[];

const typeNames: typeNamesItem = ['thin', 'traditional'];
const sizeNames: sizeNamesItem = [26, 30, 40];

type PizzaCardProps = {
    id: number,
    name: string,
    imageUrl: string,
    price: number,
    sizes: number[],
    types: number[],
    rating: number
};

const PizzaCard: React.FC<PizzaCardProps> = ({id, name, imageUrl,
                                                 price, sizes, types}) => {

    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);

    const dispatch = useDispatch();
    const cartItem = useSelector(cartItemByIdSelector(id));

    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        const item: CartItem = {
            id,
            name,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizeNames[activeSize],
            count: 0,
        };
        dispatch(addItem(item));
    };

    return (
        <div className={s.pizzaCard}>
            <div className={s.pizzaImg}><img src={imageUrl} alt=""/></div>
            <div className={s.pizzaName}>{name}</div>
            <div className={s.params}>
                <div className={s.width}>
                    <ul>
                        {
                            types.map((i) => <li
                                key={i}
                                className={activeType === i ? s.active : ''}
                                onClick={() => setActiveType(i)}
                            >{typeNames[i]}</li>)
                        }
                    </ul>
                </div>
                <div className={s.diameter}>
                    <ul>
                        {
                            sizes.map((i, index) => <li
                                key={index}
                                className={activeSize === index ? s.active : ''}
                                onClick={() => setActiveSize(index)}
                            >{i} cm</li>)
                        }
                    </ul>
                </div>
            </div>
            <div className={s.bottomWrapper}>
                <div className={s.price}>{price}$</div>
                <button className={s.add} onClick={onClickAdd}>
                    <div className={s.addIcon}>{<BsPlus size={26}/>}</div>
                    Add {cartItem && <span>{addedCount}</span>}
                </button>
            </div>
        </div>
    );
}

export default PizzaCard;