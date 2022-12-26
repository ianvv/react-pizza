import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import {
  increment,
  decrement,
  removeItem,
  cartItemByIdSelector,
} from "../../redux/slices/cartSlice";
import DialogConfirm from "../../UiKit/DialogConfirm/DialogConfirm";
import s from "./cartItem.module.scss";

interface ICartItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: string;
}

export const CartItem: React.FC<ICartItemProps> = (cartItemObject) => {
  const { id, name, price, imageUrl, type, size } = cartItemObject;

  const [opened, setOpened] = useState(false);

  const dispatch = useDispatch();
  const count = useSelector(cartItemByIdSelector(id))?.count;

  return (
    <div className={s.itemWrapper}>
      <div className={s.item}>
        <div className={s.itemDescription}>
          <div>
            <div className={s.pizzaImg}>
              <img src={imageUrl} alt="" />
            </div>
          </div>
          <div className={s.params}>
            <div className={s.itemName}>{name}</div>
            <div className={s.itemSize}>
              <div className={s.itemWidth}>{type},</div>
              <div className={s.cm}>{size} cm</div>
            </div>
          </div>
        </div>
        <div className={s.setCount}>
          <button
            className={s.minus}
            onClick={() => dispatch(decrement(id))}
            disabled={count === 1}
          >
            <AiOutlineMinusCircle size={30} />
          </button>
          <div className={s.count}>{count}</div>
          <button className={s.plus} onClick={() => dispatch(increment(id))}>
            <AiOutlinePlusCircle size={30} />
          </button>
        </div>
        <div className={s.price}>{count && count * price}$</div>
        <button className={s.remove} onClick={() => setOpened(!opened)}>
          <DialogConfirm
            dispatchCallback={() => dispatch(removeItem(id))}
            opened={opened}
            onClose={() => setOpened(false)}
          >
            <h3>Are you sure you want to remove this item?</h3>
          </DialogConfirm>
          <TiDeleteOutline size={34} />
        </button>
      </div>
    </div>
  );
};
