import React from 'react';
import {useSelector} from "react-redux";

import Categories from "../components/Categories/Categories";
import PizzaItems from "../components/PizzaItems/PizzaItems";
import PaginationCmp from "../components/Pagination/PaginationCmp";
import HomePageError from "../components/HomePageError/HomePageError";
import {pizzaSelector} from "../redux/slices/pizzaSlice";


const HomePage: React.FC = () => {


    const {status} = useSelector(pizzaSelector);

    return (
        <>
            {status === 'error'
                ? <HomePageError/>
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