import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Categories from "../components/Categories/Categories";
import PizzaItems from "../components/PizzaItems/PizzaItems";
import PaginationCmp from "../components/Pagination/PaginationCmp";
import {pizzaSelector} from "../redux/slices/pizzaSlice";
import EmptyItems from "../components/EmptyItems/EmptyItems";
import {filterSelector, setCategoryId, setSort} from "../redux/slices/filterSlice";
import {TSortItem} from "../components/SortPopup/SortPopup";


const HomePage: React.FC = () => {

    const dispatch = useDispatch();
    const {status} = useSelector(pizzaSelector);
    const {categoryId} = useSelector(filterSelector);

    const categoriesHandler = useCallback((index: number) => {
        dispatch(setCategoryId(index));
    }, [])

    const sortPopupHandler = useCallback((obj: TSortItem) => {
        dispatch(setSort(obj));
    }, [])

    return (
        <>
            {status === 'error'
                ? <EmptyItems
                    title='Oops! Something went wrong...'
                    subtitle='Please try to reload this page'
                />
                : <>
                    <Categories
                        categoriesHandler={categoriesHandler}
                        categoryId={categoryId}
                        sortPopupHandler={sortPopupHandler}
                    />
                    <PizzaItems/>
                    <PaginationCmp/>
                </>
            }
        </>
    );
}

export default HomePage;