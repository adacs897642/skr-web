import React from "react";
import classes from "./mnemo.module.css";


export const Mnemo = ({title, img, wight}) => {
    return (
        <>
            <div className={classes.mnemo__title}><h3>{title}</h3></div>
            <div className={classes.mnemo__img}>
                <img src={img} width={wight}/>
            </div>
        </>
    )
}