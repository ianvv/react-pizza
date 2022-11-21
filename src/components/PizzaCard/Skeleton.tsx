import React from "react";
import ContentLoader from "react-content-loader";

import s from './pizzaCard.module.scss';


const Skeleton: React.FC = () => {

    return (
        <ContentLoader
            className={s.pizzaCard}
            speed={2}
            viewBox="0 0 300 450"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="150" cy="102" r="102"/>
            <rect x="0" y="233" rx="20" ry="20" width="300" height="37"/>
            <rect x="0" y="285" rx="11" ry="11" width="300" height="91"/>
            <rect x="18" y="392" rx="6" ry="6" width="75" height="39"/>
            <rect x="226" y="392" rx="20" ry="25" width="74" height="42"/>
        </ContentLoader>
    );
}

export default Skeleton