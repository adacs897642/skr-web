import React, {useEffect, useState} from "react";

import {Card} from "../Card/card";

export const Object = ({cnt, socket}) => {


    const range = (start, stop, step) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

    const arr = range(1, cnt, 1)
// console.log(arr)
    return (
        arr.map((item, index) => <Card item={item} key={index} socket={socket} />)
    )
}