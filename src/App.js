import React, {useEffect, useState} from "react";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import './App.css';

import {MainPage} from './Pages/MainPage'
import {ErrorPage} from "./Pages/ErrorPage";
import {ObjectPage} from "./Pages/ObjectPage";
import {io} from "socket.io-client";
import {TodoPage} from "./Pages/TodoPage";

const rootUrl = process.env.REACT_APP_MODE_ENV === 'production' ? "http://"+window.location.hostname+":5000":'http://127.0.0.1:5000/'

const socket = io(rootUrl, {
    transports: ["websocket"],
    cors: {
        origin: "http://127.0.0.1:3000/",
    },
}
);




export function App() {

    const [isConnected, setIsConnected] = useState(socket.connected)

    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainPage socket={socket}/>,
            errorElement: <ErrorPage/>
        },
        {
            path: '/objects/:objId',
            element: <ObjectPage socket={socket}/>
        },
        {
            path: '/todo/',
            element: <TodoPage/>
        }
    ])

    useEffect(() => {

        // if(isConnected) return
        socket.on("connect", data => {
            console.log('connect', data, isConnected, new Date().getTime());
            setIsConnected(true)
        });

        socket.on("output", (data) => {
            console.log(data);
        });

        socket.on("disconnect", (data) => {
            setIsConnected(false)
            console.log(data);
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        return function cleanup() {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('syslog_update')

            socket.disconnect();
        };
    }, [isConnected])

    useEffect(()=>console.log(isConnected), [isConnected])
    let y = process.env.REACT_APP_MODE_ENV
    console.log(y)

    return (
        <>
            {/*<WebSocket/>*/}
            <RouterProvider router={router}/>

        </>

    );
}

export default App;
