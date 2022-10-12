import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    NAME_DESC = 'name',
    NAME_ASC = '-name',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type Sort = {
    name: string,
    sortProperty: SortPropertyEnum,
};

export interface FilterSliceState {
    categoryId: number,
    sort: Sort,
    currentPage: number,
    searchValue: string,
    itemsCount?: number,
}

const initialState: FilterSliceState = {
    categoryId: 0,
    sort: {
        name: 'popularity (desc)',
        sortProperty: SortPropertyEnum.RATING_DESC
    },
    currentPage: 1,
    searchValue: '',
    itemsCount: 0,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.sort = action.payload.sort;
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
            } else {
                state.sort = {
                    name: 'popularity (desc)',
                    sortProperty: SortPropertyEnum.RATING_DESC
                }
                state.categoryId = 0;
                state.currentPage = 1;
            }
        }
    }
});

export const filterSelector = (state: RootState) => state.filter;

export const {setCategoryId, setSort, setCurrentPage, setSearchValue, setFilters} = filterSlice.actions;

export default filterSlice.reducer;
