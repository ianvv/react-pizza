import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {VscTriangleUp} from "react-icons/vsc";
import {motion} from 'framer-motion';

import arrows from '../../assets/img/arrows.svg';
import s from "./categories.module.scss";
import {filterSelector, setSort, SortPropertyEnum} from "../../redux/slices/filterSlice";


type SortItem = { name: string; sortProperty: SortPropertyEnum };

export const sortItems: SortItem[] = [
    {name: 'popularity (desc)', sortProperty: SortPropertyEnum.RATING_DESC},
    {name: 'popularity (asc)', sortProperty: SortPropertyEnum.RATING_ASC},
    {name: 'price (desc)', sortProperty: SortPropertyEnum.PRICE_DESC},
    {name: 'price (asc)', sortProperty: SortPropertyEnum.PRICE_ASC},
    {name: 'alphabet (desc)', sortProperty: SortPropertyEnum.NAME_DESC},
    {name: 'alphabet (asc)', sortProperty: SortPropertyEnum.NAME_ASC}
];

type SortClick = MouseEvent & { path: Node[] };

export const SortPopup: React.FC = () => {

    const [menu, setMenu] = useState(false);
    // const [turnedTriangle, setTurnedTriangle] = useState(false);
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
                                onClick={() => dispatch(setSort(obj))}
                                className={sort.name === obj.name ? s.active : ''}
                            >{obj.name}</li>)
                        }
                    </ul>
                </div>
            }
        </div>
    );
}

// export default SortPopup;