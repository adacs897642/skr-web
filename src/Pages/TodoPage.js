import React, {useRef} from "react";
import {useState, useEffect} from "react"
import classes from "./todo.module.css"
import Events from "./Events"

export const TodoPage = () => {
    let obj = [{
        x: 60,
        y: 5,
        high: 25,
        width: 50,
        msg: "Op-1",
        colour: "rgba(255,255,255,0.4)"
    }, {
        x: 110,
        y: 275,
        high: 50,
        width: 25,
        msg: "Op-2",
        colour: "rgba(255,255,255,0.4)"
    }, {
        x: 110,
        y: 450,
        high: 50,
        width: 25,
        msg: "Op-3",
        colour: "rgba(255,255,255,0.4)"
    }, {
        x: 500,
        y: 50,
        high: 25,
        width: 50,
        msg: "Op-4",
        colour: "rgba(255,255,255,0.4)"
    }, {
        x: 500,
        y: 100,
        high: 25,
        width: 45,
        msg: "Op-5",
        colour: "rgba(255,255,255,0.4)"
    }]
    const ref = useRef(null)

    function writeMessage(context, message) {
        context.font = "18pt Calibri";
        context.fillStyle = "black";
        context.fillText(message, 200, 25);
    }

    const captureMouse = function (element) {
        var mouse = {x: 0, y: 0, event: null},
            body_scrollLeft = document.body.scrollLeft,
            element_scrollLeft = document.documentElement.scrollLeft,
            body_scrollTop = document.body.scrollTop,
            element_scrollTop = document.documentElement.scrollTop,
            offsetLeft = element.offsetLeft,
            offsetTop = element.offsetTop;

        element.addEventListener('mousemove', function (event) {
            var x, y;

            if (event.pageX || event.pageY) {
                x = event.pageX;
                y = event.pageY;
            } else {
                x = event.clientX + body_scrollLeft + element_scrollLeft;
                y = event.clientY + body_scrollTop + element_scrollTop;
            }
            x -= offsetLeft;
            y -= offsetTop;

            mouse.x = x;
            mouse.y = y;
            mouse.event = event;
        }, false);

        return mouse;
    }



    function newF() {
        let events = new Events(ref.current);
        // let canvas = events.getCanvas();
        let context = events.getContext();
        let message = "";

        events.setDrawStage(function () {
            this.clear();

            obj.map(item => {
                this.beginRegion();
                context.beginPath();
                context.lineWidth = 2;
                context.strokeStyle = "rgba(0,0,0,0.4)";
                context.fillStyle = item.colour;
                context.rect(item.x, item.y, item.high, item.width);
                context.fill();

                context.stroke();
                this.addRegionEventListener("mouseover", function(){
                    document.body.style.cursor = "pointer";
                });
                this.addRegionEventListener("mousemove", function () {
                    message = item.msg;
                });
                this.addRegionEventListener("mouseout", function () {
                    document.body.style.cursor = "default";
                    message = "";
                });
                this.addRegionEventListener("mousedown", function () {
                    message = item.msg;
                });
                this.closeRegion();
                return null
            })
            writeMessage(context, message);
        })
    }

    let mouse = null
    useEffect(() => {
        newF()
        mouse = captureMouse(ref.current);
    })

    return (
        <>
            <canvas ref={ref} width={600} height={600} className={classes._}
            onMouseDown={function () {
                console.log("x: " + mouse.x + ", y: " + mouse.y)}}
            />
            {/*</canvas>*/}
        </>
    )
}