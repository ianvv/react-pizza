import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
import {Sort} from "./filterSlice";


export type SearchPizzaParams = {
    currentPage: string,
    sortBy: string,
    order: string,
    category: string,
    search: string
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
    'pizza/fetchPizzas',
    async (params) => {
        const {currentPage, sortBy, order, category, search} = params;
        const {data} = await axios.get<PizzaItem[]>(
            `https://6316727782797be77fe57fda.mockapi.io/items?page=${currentPage}&limit=6${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data;
    })

type PizzaItem = {
    id: number,
    name: string,
    imageUrl: string,
    price: number,
    sizes: number[],
    types: number[],
    rating: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaItem[],
    status: Status,
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload
        },
        setIsLoading(state, action) {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
});

export const pizzaSelector = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;