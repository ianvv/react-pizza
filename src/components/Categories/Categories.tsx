import React, {memo, useCallback} from 'react';

import {SortPopup, TSortItem} from "../SortPopup/SortPopup";
import s from './categories.module.scss';
import {filterSelector, setSort} from "../../redux/slices/filterSlice";
import {useDispatch, useSelector} from "react-redux";


type TCategoriesItem = {
    name: string;
}

const categories: TCategoriesItem[] = [
    {name: 'All'},
    {name: 'Meat'},
    {name: 'Vegetarian'},
    {name: 'Grill'},
    {name: 'Spicy'},
    {name: 'Closed'},
];

interface ICategoriesProps {
    categoriesHandler: (index: number) => void;
    categoryId: number;
}

const Categories: React.FC<ICategoriesProps> = memo(({categoriesHandler, categoryId}) => {

    const dispatch = useDispatch();
    const {sort} = useSelector(filterSelector);

    const sortPopupHandler = useCallback((obj: TSortItem) => {
        dispatch(setSort(obj));
    }, []);

    return (
        <div className={s.categoriesWrapper}>
            <div className={s.categories}>
                <ul>
                    {
                        categories.map((category, index) => <li
                            key={index}
                            className={categoryId === index ? s.active : ''}
                            onClick={() => categoriesHandler(index)}
                        >
                            {category.name}
                        </li>)
                    }
                </ul>
            </div>
            <SortPopup
                sortPopupHandler={sortPopupHandler}
                sort={sort}
            />
        </div>
    );
})

export default Categories;
