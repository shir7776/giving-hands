import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Table from "../table/table_component";
import {Button} from "@material-ui/core";
import style from './gridStyle.module.css'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 400,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export  function SpacingGrid({givers,locations}) {
    const [todaysGivers, setTodaysGivers] = React.useState([]);
    const [todaysLocations, setTodaysLocations] = React.useState([]);
    const classes = useStyles();


    const getGiversColumns = () => {
        let lst = [
            {
                title: 'First Name', field: 'fname', editable: false
            },
            {
                title: 'Last Name', field: 'lname', editable: false
            },
            {
                title: 'Working Today?', field: 'g',
            },
        ];
        return lst;
    }
    const getLocationsColumns = () => {
        let lst = [
            {
                title: 'Address', field: 'address', editable: false
            },
            {
                title: 'Give Today?', field: 'g'
            },
        ];
        return lst;
    }


    const updateTodaysGiverList=(giver)=>{
        console.log(giver)
        setTodaysGivers([...todaysGivers,giver])
    }
    const updateTodaysLocationList=(location)=>{
        console.log(location)
        setTodaysLocations([...todaysLocations,location])
    }

const onClick=()=>{

}


    return (
        <Grid container className={classes.root} >
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>

                        <Grid  item>
                            <Paper className={style.paper} >
                                <Table name={"Givers:"} data={givers} columns={getGiversColumns()} update={updateTodaysGiverList}/>
                            </Paper>
                        </Grid>
                        <Grid  item>
                            <Paper className={style.paper} >
                                <Table name={"Locations:"} data={locations} columns={getLocationsColumns()} update={updateTodaysLocationList}/>
                            </Paper>
                        </Grid>
                        <Grid  item>
                            <Paper className={style.paper} >
                                <Button onClick={onClick} >get me the areas</Button>
                            </Paper>
                        </Grid>

                </Grid>
            </Grid>

        </Grid>
    );
}