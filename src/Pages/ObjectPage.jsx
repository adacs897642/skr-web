import React, {useEffect, useState} from "react";
import {Table} from "../Components/Table/table";
import {Mnemo} from "../Components/Mnemo/mnemo";
import Graph from "../Components/Graph/graph";
import classes from "./obj.module.css";
import {useParams} from "react-router-dom";
import {Nav} from "../Components/Nav/nav";


export const ObjectPage = ({socket}) => {
    const [obj, setObj] = useState({})
    const [dataGr, setDataGr] = useState([])
    const [isDataAbsent, setIsAbsent] = useState(false)
    const [data1, setData1] = useState({})
    const [data2, setData2] = useState({})
    const [data3, setData3] = useState({})
    const [data4, setData4] = useState({})
    const [data5, setData5] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [endTime, setEndTime] = useState('')

    let {objId} = useParams();

    useEffect(() => {
        socket.on("others_update", (data) => {
                console.log(data)
                setIsLoading(true)
            }
        );
    }, [socket])

// fetch-helpers.js

// performs a request and resolves with JSON
    const fetchJson = async (url, init = {}) => {
        const res = await fetch(url, init);
        if (!res.ok) {
            throw new Error(`${res.status}: ${await res.text()}`);
        }
        return res.json();
    };

// get JSON from multiple URLs and pass to setters
    const fetchAndSetAll = async (collection) => {

        // fetch all data first
        const allData = await Promise.all(
            collection.map(({url, init}) => fetchJson(url, init))
        );
        // console.log(allData)
        // iterate setters and pass in data
        collection.forEach(({setter}, i) => {
            setter(allData[i]);

        });

        // validateData(allData)
        return (allData)
    };


    const validateData = (arr) => {
        if (!isLoading) return

        arr.splice(0, 1)
        if ((arr[0].length === 0) && (arr[1].length === 0) && (arr[2].length === 0) && (arr[3].length === 0) && (arr[4].length === 0)) {
            console.log('Данные отсутствуют')
            setIsAbsent(true)
            setDataGr([])
            return
        }
        arr.map((item) => {
            const newData = [];
            item.data.map((i) => {
                const newObject = {};
                delete Object.assign(newObject, i, {['x']: i['time']})['time'];
                delete Object.assign(newObject, newObject, {['y']: newObject['value']})['value'];
                // console.log(newObject, i)
                newObject['x'] = Date.parse(newObject['x'])
                newObject['y'] = Math.floor(newObject['y'])
                newData.push(newObject)

            })
            item.data = newData
            // console.log(newData)
        })
        console.log(arr)

        setDataGr(arr)
        setIsLoading(false)
        setIsAbsent(false)
    }


    useEffect(() => {

        fetchAndSetAll([
            {
                url: `/api/describe?n=${objId}`,
                setter: setObj,
            },
            {
                url: `/api/vlog?alias=Оп${objId}-1&end=${endTime}`,
                setter: setData1,
            },
            {
                url: `/api/vlog?alias=Оп${objId}-2&end=${endTime}`,
                setter: setData2,
            },
            {
                url: `/api/vlog?alias=Оп${objId}-3&end=${endTime}`,
                setter: setData3,
            },
            {
                url: `/api/vlog?alias=Оп${objId}-4&end=${endTime}`,
                setter: setData4,
            },
            {
                url: `/api/vlog?alias=Оп${objId}-5&end=${endTime}`,
                setter: setData5,
            }

        ]).then(data => validateData(data)).catch(console.error);

    }, [isLoading, endTime])

    const width = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;


    const changeTime = (x) => {
        let d = new Date(); // today!
        d.setDate(d.getDate() - x);
        console.log(d.toISOString().split('T')[0])
        setEndTime(d.toISOString().split('T')[0])
    }

    return (
        <>
            <Nav isVisible={true}/>
            {obj.obj &&
            <div className={classes._page}>
                <div className={classes._main}>
                    <div className={classes._mnemo}>
                        <Mnemo title={obj.obj} img={'/img/gpa.png'} wight={width / 3}/>
                    </div>
                    <div className={classes._graph}>
                        {isDataAbsent ?
                            <div>Данные отстутствуют</div> :
                            <Graph props={dataGr} height={width / 3.5} width={width / 2.5}/>
                        }

                        <div className={classes.buttons}>
                            <div onClick={() => changeTime(7)}> 1 нед</div>
                            <div onClick={() => changeTime(30)}> 1 мес</div>
                            <div onClick={() => changeTime(90)}> 3 мес</div>
                            <div onClick={() => changeTime(180)}> 6 мес</div>
                            <div onClick={() => changeTime(365)}> Год</div>
                        </div>

                    </div>
                </div>
                <Table props={obj.items}/>
            </div>
            }
        </>
    )

}