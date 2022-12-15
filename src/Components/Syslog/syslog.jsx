import React, {useEffect, useRef, useState} from "react";
import classes from "./syslog.module.css";

export const Syslog = ({socket}) => {

    const getTotalPages = (cnt) => {
        return Math.ceil(cnt / limit)
    }

    const colorItem = (level) => {
        let color = ''
        if (level > '40') color = 'rgba(255,0,0,0.5)' //'red'
        return color
    }

    const [isSyslogLoading, setIsSyslogLoading] = useState(true)
    const [syslog, setSyslog] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const [totalCount, setTotalCount] = useState(0)
    let observer = useRef()
    const lastElement = useRef()

    useEffect(() => {
        console.log('update1')
        socket.on("syslog_update", (data) => {
                // console.log(new Date(Date.parse(data.time)).toString())
                data.time = new Date(Date.parse(data.time)).toString()
                setSyslog(
                    [data, ...syslog]
                )
                console.log('update')
            }
        );
    }, [syslog, socket])

    useEffect(() => {
        if (isSyslogLoading) return
        if (observer.current) observer.current.disconnect()

        var callback = function (entries, observer) {
            if (entries[0].isIntersecting && page < getTotalPages(totalCount)) {
                console.log(page, totalCount)
                setPage(page + 1)
            }

        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current)
    }, [isSyslogLoading])

    const fetchSyslog = async (page, limit) => {
        try {
            setIsSyslogLoading(true)
            const response = await fetch(`/api/syslog?page=${page}&per_page=${limit}`)
            console.log(response.headers.get('x-total-count'))
            setTotalCount(parseInt(response.headers.get('x-total-count')))
            const data = await response.json()
            setSyslog([...syslog, ...data])
            setIsSyslogLoading(false)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchSyslog(page, limit)


    }, [page, limit])

    return (
        <>
            <div className={classes._}>
                <div><h2 className={classes._title}>Системный журнал</h2></div>
                <div className={classes._body}>
                    {syslog && syslog.map(i => {
                        return (
                            <div className={classes._items} key={i.id}>
                                <div className={classes._time} style={{background: colorItem(i.level)}}>
                                    {new Date(Date.parse(i.time)).toLocaleString()}</div>

                                <div className={classes.msg_text}>
                                    <div className={classes._msg}>{i.msg}</div>
                                    <div className={classes._author}>{i.author}</div>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={lastElement}></div>
                </div>
            </div>


        </>
    )


}

