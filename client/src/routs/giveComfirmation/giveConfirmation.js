import React, { Component } from "react";

import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps"
import MyMapComponent from "../../components/map/map_component"

class GiveConfirmation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locations: [],
            selectedMarker: false
        }
    }

    componentDidMount() {

        this.setState({ locations: [
                {address:"1", lat:31,lng:35,id:1,area:1,finished:false},
                {address:"2", lat:32,lng:35,id:2,area:2,finished:false},
                {address:"3", lat:31,lng:34,id:3,area:3,finished:false},
                {address:"4", lat:31.5,lng:34.5,id:4,area:3,finished:false}
            ]})

    }

    changeToFinish=(index)=>{
        let newLocations=this.state.locations
        newLocations[index].finished=!newLocations[index].finished
        this.setState({
            locations:newLocations
        })
    }

    updateLocations=()=>{
        //writing locations back to database
    }

    renderLocations=()=>{
        let locations=this.state.locations;
        return(
            <form>
                {
                    this.state.locations.map((loc,index)=>(
                        <div>
                            {/*<label >*/}
                            {/*    <input type="checkbox" onChange={()=>{this.changeToFinish(index)}}/>*/}
                            {/*    <span >{loc.address}</span>*/}
                            {/*</label>*/}
                            <tr>
                                <td>{<input style={{"width":"auto"}} type="checkbox" onChange={()=>{this.changeToFinish(index)}}/>}</td>
                                <td style={{"padding":"0 0 0 30%"}}>{loc.address}</td>
                            </tr>
                        </div>
                    ))
                }
                <button onClick={this.updateLocations}>submit</button>
            </form>
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
                    markers={this.state.locations}
                    onClick={this.handleClick}
                />

                {this.renderLocations()}


            </div>
        );
    }
}

export default GiveConfirmation;