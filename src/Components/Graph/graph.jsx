import React from 'react';
import {Axis, LineSeries, Plot, Legend} from 'react-plot';

export default function DrawGraph({props, width, height}) {
    const colors = ['red', 'green', 'blue', 'yellow', 'white']
    console.log(props)
    return (
        <Plot width={width} height={height}
            // seriesViewportStyle={{
            //     stroke: 'blue',
            //     strokeWidth: 3,
            // }}
        >
            <Legend position="right" labelStyle={{fill: "white", cursor: 'hand', marker: 'white'}} showHide/>

            {props && props.map((item, index) => {

                console.log(item)
                return (
                    <LineSeries key={index}
                                lineStyle={{stroke: colors[index]}}
                                displayMarkers
                                markerShape="diamond"
                                markerSize={1}
                                markerStyle={{
                                    // fill: ({x}) => (x > 3 ? 'blue' : 'red'),
                                    stroke: colors[index],
                                    fill: colors[index]
                                }}
                                data={item.data}
                                label={item.alias}
                                xAxis="x"
                                yAxis="y"

                    />
                )
            })
            }
            <Axis
                id="x"
                position="bottom"
                scale="time"
                // label="Time"
                lineStyle={{stroke: 'red'}}
                labelStyle={{fill: 'green', fontSize: '18px', fontWeight: 'bold'}}
                tickLabelStyle={{fill: 'red', fontSize: '12px', fontWeight: 'bold'}}
                displayPrimaryGridLines
                primaryGridLineStyle={{stroke: 'red'}}
                tickLabelFormat={function tickFormat(d) {
                    const date = new Date(d)
                    return date.toISOString().slice(0, 10)
                        // + ' ' + date.toISOString().slice(11, 16)
                }}

            />
            <Axis
                id="y"
                position="left"
                label=""
                lineStyle={{stroke: 'red'}}
                labelStyle={{fill: 'green', fontSize: '16px', fontWeight: 'bold'}}
                tickLabelStyle={{fill: 'red', fontWeight: 'bold'}}
                displayPrimaryGridLines
                primaryGridLineStyle={{stroke: 'red'}}
            />
        </Plot>
    );
}
