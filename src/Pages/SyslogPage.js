import React, {useState, useEffect, useRef} from "react";
import {Syslog} from "../Components/Syslog/syslog";

export const SyslogPage = () => {
    const [syslog, setSyslog] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const lasfElement = useRef()

    useEffect(() => {
    }, [])

    useEffect(() => {
        fetch(`/api/syslog?page=${page}&per_page=${limit}`)
            .then(response => {
                if (response.ok)
                    return (response.json())
                return Promise.reject()
            })
            .then(data => {
                setSyslog([...syslog, ...data])
                console.log(data)
            }).catch((error) => {
            console.log(error)
            return Promise.reject()
        });

    }, [page])

    return (
        <>
            <Syslog data={syslog}/>
        </>)
}