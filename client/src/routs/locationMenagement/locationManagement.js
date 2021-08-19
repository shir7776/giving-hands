import React, { Component } from "react";
import Table from "../../components/table/table_component"
import MyMapComponent from "../../components/map/map_component"

// const API_KEY = "AIzaSyDfrwgbMjQlwceSAE46w-U45KQld2Gi7sY"
class UpdateGiver extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locations: [],
            selectedMarker: false,
            place:null,
            newLocation:""
        }
    }
    componentDidMount() {
        this.setState({ locations: [
                {address:"1", lat:31,lng:35,id:1,area:1,finished:false},
                {address:"2", lat:32,lng:35,id:2,area:2,finished:false},
                {address:"3", lat:31,lng:34,id:3,area:3,finished:false}
            ]})

    }
    getCoordinates=async(quary)=> {
        var location;
        let newQuary= quary.split(" ")
        newQuary=newQuary.join("%20")
        let url='https://us1.locationiq.com/v1/search.php?key=pk.32ce82cfe3f662e3b6a89ac046a5b6fa&q='+newQuary+'&format=json'
        console.log(url)
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setTimeout(

                    this.setState({
                        newLocation:data[0]
                    })
                ,100)
                });
        console.log("location after")
        console.log(this.state.newLocation)
        return this.state.newLocation

    }
    getLocationsList=()=>{
fetch("")
        let lst=[
            {address:"1", lat:31,lng:35,id:1,area:1,finished:false,date:Date.now()},
            {address:"2", lat:32,lng:35,id:2,area:2,finished:false,date:Date.now()},
            {address:"3", lat:31,lng:34,id:3,area:3,finished:false,date:Date.now()}

        ]
        return lst;
    }
    getLocationsColumns=()=>{
        let lst=[
            {
                title:'ID',field:'id', editable: false
            },
            {
                title:'Address',field:'address'
            },
            {
                title:'Latitude',field:'lat'
            },
            {
                title:'Longitude',field:'lng'
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
    updateLocation=(lst)=>
    {
        console.log("hahahahh")
    }
    addLocation= async (newRow)=>
    {
         let location =await this.getCoordinates(newRow.address)
        console.log("location")
        console.log(location)
        newRow={id: newRow.id, address:newRow.address, lat:this.state.newLocation.lat, lng:this.state.newLocation.lon, area:0, finished:false, date:Date.now()}
        console.log(newRow)
        setTimeout(()=>{

            this.setState({
                locations: [...this.state.locations,newRow]
            })
        },1000);
        console.log("hahahahh")
    }
    deleteLocation=(lst)=>
    {
        console.log("hahahahh")
    }
    // handleClick = (marker, event) => {
    //     // console.log({ marker })
    //     this.setState({ selectedMarker: marker })
    // }
    render() {
        console.log("result",this.state.place)
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


                <Table
                    name={"Location Management"}
                    data={this.getLocationsList()}
                    columns ={this.getLocationsColumns() }
                    update={this.updateLocation}
                    delete={this.deleteLocation}
                    add={this.addLocation}
                />

            </div>
        );
    }
}


export default UpdateGiver;