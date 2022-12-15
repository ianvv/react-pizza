import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type TSearchPizzaParams = {
  currentPage: string;
  sortBy: string;
  order: string;
  category: string;
  search: string;
};

export const fetchPizzas = createAsyncThunk<TPizzaItem[], TSearchPizzaParams>(
  "pizza/fetchPizzas",
  async (params) => {
    const { currentPage, sortBy, order, category, search } = params;
    const { data } = await axios.get<TPizzaItem[]>(
      `https://6316727782797be77fe57fda.mockapi.io/items?page=${currentPage}&limit=6${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

type TPizzaItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum EStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: TPizzaItem[];
  status: EStatus;
}

const initialState: PizzaSliceState = {
  items: [],
  status: EStatus.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaItem[]>) {
      state.items = action.payload;
    },
    setIsLoading(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = EStatus.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = EStatus.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = EStatus.ERROR;
      state.items = [];
    });
  },
});

export const pizzaSelector = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
