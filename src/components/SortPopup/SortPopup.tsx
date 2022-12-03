import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {filterSelector, setSort, ESortPropertyEnum} from "../../redux/slices/filterSlice";
import arrows from '../../assets/img/arrows.svg';
import s from './sortPopup.module.scss';


type TSortItem = {
    name: string;
    sortProperty: ESortPropertyEnum;
}

export const sortItems: TSortItem[] = [
    {name: 'popularity (desc)', sortProperty: ESortPropertyEnum.RATING_DESC},
    {name: 'popularity (asc)', sortProperty: ESortPropertyEnum.RATING_ASC},
    {name: 'price (desc)', sortProperty: ESortPropertyEnum.PRICE_DESC},
    {name: 'price (asc)', sortProperty: ESortPropertyEnum.PRICE_ASC},
    {name: 'alphabet (desc)', sortProperty: ESortPropertyEnum.NAME_DESC},
    {name: 'alphabet (asc)', sortProperty: ESortPropertyEnum.NAME_ASC}
];

type SortClick = MouseEvent & { path: Node[] };

export const SortPopup: React.FC = () => {

    const [menu, setMenu] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);
    const {sort} = useSelector(filterSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as SortClick;

            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setMenu(false);
            }
        };
        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const sortPopupHandler = useCallback((obj: TSortItem) => {
        dispatch(setSort(obj));
    }, []);

    return (
        <div ref={sortRef} className={s.sortWrapper} onClick={() => setMenu(!menu)}>
            <div className={s.sort}>

                    <div className={s.sortIcon}>
                        <img
                            src={arrows}
                            alt="arrows"
                            className={menu ? s.arrow : `${s.arrow} ${s.active}`}
                        />
                    </div>

                <div className={s.sortBy}>
                    Sort by:
                </div>
                <span>{sort.name}</span>
            </div>
            {menu &&
                <div className={s.sortMenu}>
                    <ul>
                        {
                            sortItems.map((obj, index) => <li
                                key={index}
                                onClick={() => sortPopupHandler(obj)}
                                className={sort.name === obj.name ? s.active : ''}
                            >{obj.name}</li>)
                        }
                    </ul>
                </div>
            }
        </div>
    );
}