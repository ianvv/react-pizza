import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

import PizzaCard from "../PizzaCard/PizzaCard";
import Skeleton from "../PizzaCard/Skeleton";
import NotFoundBlock from "../NotFoundBlock/NotFoundBlock";
import {useAppDispatch} from '../../redux/store';
import {filterSelector} from "../../redux/slices/filterSlice";
import {fetchPizzas, pizzaSelector} from "../../redux/slices/pizzaSlice";
import s from './pizzaItems.module.scss';


const PizzaItems: React.FC = () => {

    const dispatch = useAppDispatch();

    const {searchValue, currentPage, categoryId, sort} = useSelector(filterSelector);
    const {items, status} = useSelector(pizzaSelector);

    useEffect(() => {

        const getPizzas = () => {

            const sortBy = sort.sortProperty.replace('-', '');
            const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
            const category = categoryId === 0 ? `` : `&category=${categoryId}`;
            const search = searchValue ? `&search=${searchValue}` : '';

            dispatch(
                fetchPizzas({
                    search,
                    currentPage: String(currentPage),
                    sortBy,
                    order,
                    category
                })
            );

            window.scrollTo(0, 0);
        };

        getPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    const pizzas = items.map((obj: any) => <PizzaCard key={obj.id} {...obj} />);

    return (
        <div className={s.pizzaFragment}>
            {
                status === 'loading'
                    ? <>
                        <h2>All pizzas</h2>
                        <div className={s.contentWrapper}>{skeletons}</div>
                    </>
                    : items.length === 0 ? <NotFoundBlock/>
                        : <>
                            <h2>All pizzas</h2>
                            <div className={s.contentWrapper}>{pizzas}</div>
                        </>
            }
        </div>
    );
};

export default PizzaItems;