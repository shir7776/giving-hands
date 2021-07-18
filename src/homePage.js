import React, { Component } from 'react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import { Checkbox } from 'react-input-checkbox';
import { Checkbox } from '@material-ui/core';
import Table from "./table_component"
// import MaterialTable from "material-table";
import MyMapComponent from "./map_component"
// import Geocode from "react-geocode";
const mapStyles = {
    width: '50%',
    height: '50%'
};

export class AssignGivers extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <h2> this is home page through explenation about the majority of everyone's hard work</h2>
        );
    }
}

export default AssignGivers