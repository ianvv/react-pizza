import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Categories from "../components/Categories/Categories";
import PizzaItems from "../components/PizzaItems/PizzaItems";
import PaginationCmp from "../components/Pagination/PaginationCmp";
import HomePageError from "../components/EmptyItems/EmptyItems";
import {pizzaSelector} from "../redux/slices/pizzaSlice";
import EmptyItems from "../components/EmptyItems/EmptyItems";
import {filterSelector, setCategoryId} from "../redux/slices/filterSlice";


const HomePage: React.FC = () => {

    const dispatch = useDispatch();
    const {status} = useSelector(pizzaSelector);
    const {categoryId} = useSelector(filterSelector);

    const categoriesHandler = useCallback((index: number) => {
        dispatch(setCategoryId(index));
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
                    />
                    <PizzaItems/>
                    <PaginationCmp/>
                </>
            }
        </>
    );
}

export default HomePage;