import React from 'react';
import {createMuiTheme, makeStyles, MuiThemeProvider,withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from "../table/table_component";
import {Button} from "@material-ui/core";
import style from './gridStyle.module.css'
import {clusterAlgAPI} from "../../API/clusterAlgAPI";
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

export function SpacingGrid({givers, locations}) {
    const [todaysGivers, setTodaysGivers] = React.useState([]);
    const [todaysLocations, setTodaysLocations] = React.useState([]);
    const [selectedGivers, setSelectedGivers] = React.useState([]);
    const [selectedLocations, setSelectedLocations] = React.useState([]);
    const classes = useStyles();


    const getGiversColumns = () => {
        let lst = [
            {
                title: 'First Name', field: 'fname', editable: false
            },
            {
                title: 'Last Name', field: 'lname', editable: false
            },
        ];
        return lst;
    }
    const getLocationsColumns = () => {
        let lst = [
            {
                title: 'Address', field: 'address', editable: false
            },
        ];
        return lst;
    }


    const updateTodaysGiverList = (giver) => {
        setTodaysGivers([...todaysGivers, giver])
    }
    const updateTodaysLocationList = (location) => {
        setTodaysLocations([...todaysLocations, location])
    }

    const onClick = async() => {
        const dataForAlgo={
            addresses:selectedLocations,
            users:selectedGivers
            }
        var mes =await clusterAlgAPI.clusterAlg(dataForAlgo);
        if(mes==true)
        alert("Now you can go to assign givers and connect giver to area.")
        else
        alert("Somthing worng happend, try again later...")
    }

    const onGiverSelectionChange = (rows) => {
        setSelectedGivers([...rows])
    }
    const onLocationSelectionChange = (rows) => {
        setSelectedLocations([...rows])
    }

    const theme2 = createMuiTheme({
        palette: {
            primary: {
                main: '#4caf50',
            },
            secondary: {
                main: 'rgba(82, 103, 207, 0.73)',
            },
        },

    });
    const ColorButton = withStyles((theme) => ({
        root: {
            color: "#111",
            backgroundColor: 'rgba(127, 142, 212, 0.73)',
            '&:hover': {
                backgroundColor: 'rgba(168, 181, 238, 0.73)',
            },
        },
    }))(Button);
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>

                    <Grid item>
                        <Paper className={style.paper}>
                            <Table name={"Givers:"} data={givers} columns={getGiversColumns()}
                                   selection={true}
                                   onSelectionChange={onGiverSelectionChange}/>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={style.paper}>
                            <Table name={"Locations:"} data={locations}
                                   columns={getLocationsColumns()}
                                   selection={true}
                                   onSelectionChange={onLocationSelectionChange}/>
                        </Paper>
                    </Grid>
                    <Grid item className={style.buttonHolder}>
                            <ColorButton className={style.button} onClick={onClick}>get me the areas</ColorButton>
                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    );
}
