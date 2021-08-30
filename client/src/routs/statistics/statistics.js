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
import {Button} from "@material-ui/core";
// import Example from "./chart";
export const Statistics=()=>{
        const [data,setData]=useState([])
        const [day,setDay]=useState(false)
        const [week,setWeek]=useState(false)
        const [month,setMonth]=useState(false)
    const ColorButton = withStyles((theme) => ({
        root: {
            color: "#111",
            backgroundColor: 'rgba(127, 142, 212, 0.73)',
            margin:'20px',
            '&:hover': {
                backgroundColor: 'rgba(168, 181, 238, 0.73)',
            },
        },
    }))(Button);

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
<ColorButton onClick={monthlyChart()}>monthly</ColorButton>
        <MyChart data={data}></MyChart>


    </>
}