import classes from './nav.module.css'
import {Link} from "react-router-dom";
import React from "react";

export const Nav = ({isVisible}) => {
    return (
        <div className={classes._d3rogs}>
            <div className={classes._a5gvue}>
                <div className={classes._k50xld}>
                    <div>
                        <Link className={classes._1jqfj0n} to={'/'} style={{textDecoration: 'none'}}>
                            <div className={classes._logo}>
                                <img src={'/img/company.png'} className={classes._logo_img}/>
                            </div>
                            <div className={classes._15f9b10 + ' ' + classes.pl5}>
                                Энергодиагностика
                            </div>
                        </Link>
                    </div>

                    <nav className={classes._17oy2qc}>
                        {isVisible &&
                        <Link className={classes._1jqfj0n} to="/">
                            <div className={classes._15f9b10}>
                                <span className={''}>На главную</span></div>
                        </Link>}
                        {isVisible && <Link className={classes._1jqfj0n} to="/">
                            <div className={classes._15f9b10}>
                                <span className={''}>Обновить данные</span></div>
                        </Link>}

                    </nav>
                </div>
            </div>
        </div>
    )
}