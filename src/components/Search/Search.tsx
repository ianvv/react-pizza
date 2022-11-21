import React, {useCallback, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {AiOutlineSearch} from "react-icons/ai";
import {IoCloseOutline} from "react-icons/io5";
import debounce from 'lodash.debounce';

import {setSearchValue} from "../../redux/slices/filterSlice";
import s from './search.module.scss';

const Search: React.FC = () => {

    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const updateSearchValue = useCallback(
        debounce((event) => {
            dispatch(setSearchValue(event.target.value));
        }, 1000), []
    );

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event);
    };

    const onClearHandler = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    };

    return (
        <div className={s.searchWrapper}>
            <div className={s.searchIcon}>
                <AiOutlineSearch size={21}/>
            </div>
            <input
                ref={inputRef}
                placeholder='Search pizza...'
                className={s.searchInput}
                value={value}
                onChange={(event) => onChangeInput(event)}
            />
            {value &&
                <div className={s.closeIcon}>
                    <IoCloseOutline
                        size={20}
                        onClick={onClearHandler}
                    />
                </div>}
        </div>
    );
}

export default Search;