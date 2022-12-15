import React from "react";
import classes from './table.module.css'
import {colorItem} from '../../utils/color'

export const Table = ({props}) => {
    // console.log(props)
    // const colorItem = (nico)=>{
    //     let color = ''
    //     if(nico == '1') color='lightblue'
    //     if(nico == '2') color= 'rgba(0, 255, 0, 0.85)' //green
    //     if(nico == '3') color='red'
    //     if(nico == '26') color='grey'
    //     if(nico == '30') color='rgba(255, 255, 0, 1)'//'yellow'
    //     if(nico == '31') color='rgba(255, 100, 0, 0.85)' //'orange'
    //     return color
    // }

    return (
        <>
            <div className={classes.div__table}>
                <table className={classes._}>
                    <thead>
                    <tr className={classes._header}>
                        {/*<th scope={'col'} className={classes._th}>#</th>*/}
                        <th scope={'col'} className={classes._th}>Параметр</th>
                        <th scope={'col'} className={classes._th}>Значение</th>
                        <th scope={'col'} className={classes._th}>Время</th>
                    </tr>
                    </thead>
                    <tbody className={classes._body}>
                    {props && props.map((i, index) => {
                        return (
                            <tr className={classes._data} key={index}>
                                {/*<td className={classes._td}>{index + 1}</td>*/}
                                {}
                                <td className={classes._td} >{i.alias}</td>
                                {i.value ?
                                    <td className={classes._td} style={{background: colorItem(i.nico), color: 'rgba(8,8,8)'}}>{i.value}</td>
                                    :
                                    <td className={classes._td}>-</td>
                                }
                                <td className={classes._td}>{new Date(Date.parse(i.time)).toLocaleString()}</td>
                            </tr>
                        )
                    })}
                        </tbody>
                        </table>
                        </div>

                        </>
                        )
                    }