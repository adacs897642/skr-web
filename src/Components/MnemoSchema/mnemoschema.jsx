import React, {useEffect, useMemo, useRef, useState} from "react";
import classes from "./mnemoschema.module.css";
import {Link} from "react-router-dom";
import {colorItem} from '../../utils/color'

export const Mnemoschema = ({index, title, items}) => {
    const ref = useRef(null)
    const [width, setW] = useState(window.innerWidth / 4 - 50)

    const height = width
    let ico = [{
        x: 74,
        y: 55
    }, {
        x: 90,
        y: 275,
    }, {
        x: 90,
        y: 450,
    }, {
        x: 525,
        y: 20,
    }, {
        x: 525,
        y: 140,
    }]


    window.addEventListener("resize", function () {
        setW(window.innerWidth / 4 - 50)
    });

    useEffect(() => {
        let canvas = ref.current;
        let context = canvas.getContext("2d");
        const scale = canvas.width/ 600
        canvas.width = width
        canvas.height = width

        console.log('mnemo')
        let triangleWidth = 30 * scale;
        let triangleHeight = 30 * scale;
        // let triangleY = canvas.height / 2 - triangleWidth / 2;


        // setIcoColor()
        // color fill (left)
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowBlur = 5;
        context.shadowColor = "gray";
        ico.map(({x, y}, index) => {
                // console.log(x,y)
                drawTriangle(context, x*scale, y*scale, triangleWidth, triangleHeight, colorItem(items[index].nico));
            }
        )

        function drawTriangle(context, x, y, triangleWidth, triangleHeight, fillStyle) {
            context.beginPath();
            context.moveTo(x, y);

            context.lineTo(x + triangleWidth / 2, y + triangleHeight);
            context.lineTo(x - triangleWidth / 2, y + triangleHeight);
            context.closePath();
            context.fillStyle = fillStyle;
            context.fill();
            context.stroke();
        }
    }, [width])
    return (
        <>
            <div className={classes._body}>
                <Link to={`/objects/${index}`}>
                    <div className={classes._title}><h3>{title}</h3></div>
                </Link>
                <canvas ref={ref} width={width} height={height} className={classes._canvas}></canvas>
            </div>

        </>

    )
}