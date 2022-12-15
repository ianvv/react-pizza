import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  getItemsFromLS,
  getTotalCount,
  getTotalPrice,
} from "../../utils/getItemsFromLS";

export type TCartItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
  totalCount: number;
}

const initialState: ICartSliceState = {
  totalPrice: getTotalPrice(),
  items: getItemsFromLS(),
  totalCount: getTotalCount(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalCount++;
      state.totalPrice = state.totalPrice + action.payload.price;
    },
    increment(state, action: PayloadAction<number>) {
      const findItem: any = state.items.find(
        (obj) => obj.id === action.payload
      );

      findItem.count++;
      state.totalCount++;
      state.totalPrice = state.totalPrice + findItem.price;
    },
    decrement(state, action: PayloadAction<number>) {
      const findItem: any = state.items.find(
        (obj) => obj.id === action.payload
      );

      findItem.count--;
      state.totalCount--;
      state.totalPrice = state.totalPrice - findItem.price;
    },
    removeItem(state, action: PayloadAction<number>) {
      const findItem: any = state.items.find(
        (obj) => obj.id === action.payload
      );

      if (window.confirm("Are you sure you want to remove this item?")) {
        state.items = state.items.filter((obj) => obj.id !== findItem.id);
        state.totalPrice = state.totalPrice - findItem.price * findItem.count;
        state.totalCount = state.totalCount - findItem.count;
      }
    },
    clearItems(state) {
      if (state.items.length > 0) {
        if (window.confirm("Are you sure you want to clear the basket?")) {
          state.items = [];
          state.totalPrice = 0;
          state.totalCount = 0;
        }
      }
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const cartItemByIdSelector = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, decrement, increment } =
  cartSlice.actions;

export default cartSlice.reducer;
