import React, { Component } from 'react';
import Table from "./table_component"
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
            locations: [],
            selectedMarker: false,
            givers:[
                {id:1, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
                {id:2, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
                {id:3, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
                {id:4, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
                {id:5, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
                {id:6, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
                {id:7, name:"rgte",phone:23, email:"sdfgsdfg", area:1}

            ]
        }
    }
    componentDidMount() {
        this.setState({ locations: [
                {address:"1", lat:31,lng:35,id:1,area:1,finished:false},
                {address:"2", lat:32,lng:35,id:2,area:2,finished:false},
                {address:"3", lat:31,lng:34,id:3,area:3,finished:false}
            ]})

    }
    getGiversList=()=>{
        let lst=this.state.givers
        return lst;
    }
    getGiversColumns=()=>{
        let lst=[
            {
                title:'ID',field:'id', editable: false
            },
            {
                title:'Name',field:'name', editable: false
            },
            {
                title:'Phone Number',field:'phone', editable: false
            },
            {
                title:'Email',field:'email', editable: false
            },
            {
                title:'Area',field:'area'
            }
        ];
        return lst;
    }
    getLocations=()=>{
        let lst=this.state.locations;
        return lst
    }
    updateGiver=(lst)=>
    {
        setTimeout(()=>{

            this.setState({
                markers: this.props.markers,
            })
        },1000);
        console.log("hahahahh")
        this.nonUsedareas()
    }

    nonUsedareas=()=> {
        let areaList=[1,2,3,4,5];
        areaList=areaList.filter(area=>!this.getGiversList().some(giver=>Number(giver.area)===area))
        return(
            <ul>
                {
                    areaList.map((area)=>(
                        <li>{area}</li>
                    ))
                }
            </ul>
        )
    }
    render() {

        return (
            <div>

                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    selectedMarker={this.state.selectedMarker}
                    markers={this.getLocations()}
                    onClick={this.handleClick}
                />

                <h3>Areas Left To Assighn:</h3>
                {this.nonUsedareas()}

                <Table
                    name={"Assign Givers"}
                    data={this.getGiversList()}
                    columns ={this.getGiversColumns() }
                    update={this.updateGiver}
                />



            </div>
        );
    }
}

export default AssignGivers