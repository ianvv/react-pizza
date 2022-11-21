import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "@mui/material";
import {makeStyles} from "@mui/styles";

import {filterSelector, setCurrentPage} from "../../redux/slices/filterSlice";
import s from './pagination.module.scss';


const PaginationCmp: React.FC = () => {

    const dispatch = useDispatch();
    const {currentPage} = useSelector(filterSelector);

    const useStyles = makeStyles(() => ({
        ul: {
            "& .MuiPaginationItem-root": {
                color: "#fe5f1e",
                'border-color': '#fe5f1e',
            },
            "& .MuiPaginationItem-root.Mui-selected": {
                color: 'white',
                background: '#fe5f1e',

                "&:hover": {
                    background: '#fe5f1e',
                }
            },
        }
    }));

    const classes = useStyles();

    return (
        <div className={s.paginationWrapper}>
            <div className={s.pagination}>
                <Pagination
                    classes={{ul: classes.ul}}
                    count={3}
                    page={currentPage}
                    onChange={(_, num) => dispatch(setCurrentPage(num))}
                    variant="outlined"
                    size="large"
                />
            </div>
        </div>
    );
}

export default PaginationCmp;