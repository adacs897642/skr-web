import React from "react";
import {Object} from "../Components/Object/object";
import {Nav} from "../Components/Nav/nav";
import {Syslog} from "../Components/Syslog/syslog";
import classes from './mainpage.module.css'



export const MainPage = ({socket}) => {
        return (
        <>
            <Nav isVisible={false}/>
            <div className={classes.main__page}>
                <Object cnt={4} socket={socket}/>
            </div>
            <Syslog socket={socket}/>
        </>
    )
}
