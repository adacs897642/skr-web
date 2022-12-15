import React, {useEffect, useState} from "react";
import classes from "./card.module.css";
import {Mnemoschema} from "../MnemoSchema/mnemoschema";
import {Table} from "../Table/table";


export const Card = ({item, socket}) => {
    const [cardData, setCardData] = useState({})
    const [isNeedUpdate, setIsNeedUpdate] = useState(true)

    useEffect(() => {
        socket.on("others_update", (data) => {
                console.log(data)
                setIsNeedUpdate(true)
            }
        );
    }, [socket])

    useEffect(() => {
        if(!isNeedUpdate) return
        console.log('send request')
        fetch(`http://127.0.0.1:5000/api/describe?n=${item}`)
            .then(response => {
                if (response.ok)
                    return response.json()
                throw new Error('Something went wrong');
            })
            .then(data => {
                setCardData({...data})
                setIsNeedUpdate(false)
                // console.log(data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [item, isNeedUpdate])
    return (
        <>
            {cardData.obj ?
                < div className={classes.body}>
                    < Mnemoschema title={cardData.obj} index={item} items={cardData.items}/>
                    <Table props={cardData.items}/>
                </div>
                :
                <>Error</>
            }

        </>
    )
}