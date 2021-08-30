import React, { Component,useState } from "react";


import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import {MyChart} from "./BarChart";
import {withStyles} from "@material-ui/core/styles";
import {ColorButton} from '../../components/button/ColorButton';
// import Example from "./chart";
export const Statistics=()=>{
        const [data,setData]=useState([])
        const [day,setDay]=useState(false)
        const [week,setWeek]=useState(false)
        const [month,setMonth]=useState(false)


        const setAllToFalse=()=>{
            setDay(false)
            setMonth(false)
            setWeek(false)
        }

const daylyChart=()=>{
            setAllToFalse()
    setDay(true)

}
const monthlyChart=async()=>{
            setAllToFalse()
    setMonth(true)
    await fetch("/statistics.json")
        .then((res) => res.json())
        .then((data1) => {
                setData(data1);
            }
        );

}
const weeklyChart=()=>{
            setAllToFalse()
    setWeek(true)

}


    return <>
<ColorButton>Dayly</ColorButton>
<ColorButton>Weekly</ColorButton>
<ColorButton onClick={()=>monthlyChart()}>monthly</ColorButton>
        <MyChart data={data}></MyChart>


    </>
}