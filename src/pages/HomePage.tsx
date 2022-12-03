import React from 'react';
import {useSelector} from "react-redux";

import Categories from "../components/Categories/Categories";
import PizzaItems from "../components/PizzaItems/PizzaItems";
import PaginationCmp from "../components/Pagination/PaginationCmp";
import HomePageError from "../components/EmptyItems/EmptyItems";
import {pizzaSelector} from "../redux/slices/pizzaSlice";
import EmptyItems from "../components/EmptyItems/EmptyItems";


const HomePage: React.FC = () => {


    const {status} = useSelector(pizzaSelector);

    return (
        <>
            {status === 'error'
                ? <EmptyItems
                    title='Oops! Something went wrong...'
                    subtitle='Please try to reload this page'
                />
                : <>
                    <Categories/>
                    <PizzaItems/>
                    <PaginationCmp/>
                </>
            }
        </>
    );
}

export default HomePage;