import React, {Component, useState} from "react";


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
export const Statistics = () => {
    const [data, setData] = useState([])
    const [day, setDay] = useState(false)
    const [week, setWeek] = useState(false)
    const [month, setMonth] = useState(false)


    const setAllToFalse = () => {
        setDay(false)
        setMonth(false)
        setWeek(false)
    }

    const makeNormalDate = (data) => {
        // const date=new Date('2021-08-15T21:00:00.000Z')

        return data.map(obj => {
            const date = new Date(obj.date)
console.log('day',date.getDay(),date)
            return {...obj, date: `${date.getDate()}/${date.getMonth()+1}`}
        })
    }
    const filterWeek = (data) => {
        const thisValues = data.filter(obj => {
            const date = new Date(obj.date)
            var lastWeek = new Date()
            lastWeek.setDate(lastWeek.getDate() - 7)
            console.log('lastWeek', lastWeek)
            if (date < lastWeek)
                return false
            else
                return true
        })
        return (thisValues)
    }
    const filterMonth = (data) => {
        const thisValues = data.filter(obj => {
            const date = new Date(obj.date)
            var lastmonth = new Date()
            lastmonth.setMonth(lastmonth.getMonth() - 1)
            console.log('lastWeek', lastmonth)
            if (date < lastmonth)
                return false
            else
                return true
        })
        return (thisValues)
    }

    const monthlyChart = async () => {
        await fetch("/statistics.json")
            .then((res) => res.json())
            .then((data1) => {

                console.log(data1)
                    setData(makeNormalDate(filterMonth(data1)));


                }
            );
    }

    const replaceAreaWithDate=(data)=>{
        const areas=[...new Set(data.map(obj=>obj.area))]
        const newData=areas.map(area=>{
            const areaLocations=data.filter(d=>d.area===area)
            const distributed=areaLocations.filter(a=>a.finished).length
            const not_distributed=areaLocations.filter(a=>!a.finished).length
            return{
                date:area,distributed:distributed,not_distributed:not_distributed
            }
        })
        return(newData)
    }
    const daylyChart = async () => {
        await fetch("/daily-distribution.json")
            .then((res) => res.json())
            .then((data1) => {

                console.log(data1)
                    setData(replaceAreaWithDate(data1));


                }
            );
    }

    const weeklyChart = async () => {
        await fetch("/statistics.json")
            .then((res) => res.json())
            .then((data1) => {
                console.log(data1)
                setData(makeNormalDate(filterWeek(data1)));
                }
            );
    }


    return <>
        <ColorButton onClick={()=>daylyChart()}>Dayly</ColorButton>
        <ColorButton onClick={() => weeklyChart()}>Weekly</ColorButton>
        <ColorButton onClick={() => monthlyChart()}>monthly</ColorButton>
        <MyChart data={data}></MyChart>


    </>
}
