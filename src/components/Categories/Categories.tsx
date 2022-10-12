import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";

import s from './categories.module.scss';
import {SortPopup} from "./SortPopup";
import {filterSelector, setCategoryId} from "../../redux/slices/filterSlice";

type categoriesItem = { name: string };

const categories: categoriesItem[] = [
    {name: 'All'},
    {name: 'Meat'},
    {name: 'Vegetarian'},
    {name: 'Grill'},
    {name: 'Spicy'},
    {name: 'Closed'},
];

const Categories: React.FC = memo(() => {

    const dispatch = useDispatch();
    const {categoryId} = useSelector(filterSelector);

    const categoriesHandler = useCallback((index: number) => {
        dispatch(setCategoryId(index));
    }, [])

    return (
        <div className={s.categoriesWrapper}>
            <div className={s.categories}>
                <ul>
                    {
                        categories.map((category, index) => <li
                            key={index}
                            className={categoryId === index ? s.active : ''}
                            onClick={() => categoriesHandler(index)}
                        >{category.name}</li>)
                    }
                </ul>
            </div>
            <SortPopup/>
        </div>
    );
})

export default Categories;
