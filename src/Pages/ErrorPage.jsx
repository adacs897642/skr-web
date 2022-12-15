import {useRouteError} from "react-router-dom";
import classes from "./error.page.module.css";

export const ErrorPage = () => {

    const error = useRouteError()
    return (
        <>
            <div className={classes.error_page}>
                <h2>Ooops, error!!!</h2>
                <div>Sorry, an unexpected error has occurred.</div>
                <div>{error.statusText || error.message}</div>
            </div>

        </>


    )
}