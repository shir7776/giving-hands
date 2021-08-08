import React, {useState} from "react";
import MyMapComponent from "../../components/map/map_component";

export const GiveConfirmation=()=>{
    const getLocations=()=>{
        const lst=[
            {address:"1", lat:31,lng:35,id:1,area:1,finished:false},
            {address:"2", lat:32,lng:35,id:2,area:2,finished:false},
            {address:"3", lat:31,lng:34,id:3,area:3,finished:false},
            {address:"4", lat:31.5,lng:34.5,id:4,area:3,finished:false}
        ]
        return lst;
    }
    const [locations,setLocations]=useState(getLocations())
    const [selectedMarker,setSelectedMarker]=useState(false)

    const changeToFinish=(index)=>{
        let newLocations=locations
        newLocations[index].finished=!newLocations[index].finished
        setLocations(newLocations)
    }

    const updateLocations=()=>{
        //writing locations back to database
    }

    const     renderLocations=()=>{
        return(
            <form>
                {
                    locations.map((loc,index)=>(
                        <div>
                            {/*<label >*/}
                            {/*    <input type="checkbox" onChange={()=>{this.changeToFinish(index)}}/>*/}
                            {/*    <span >{loc.address}</span>*/}
                            {/*</label>*/}
                            <tr>
                                <td>{<input style={{"width":"auto"}} type="checkbox" onChange={()=>{changeToFinish(index)}}/>}</td>
                                <td style={{"padding":"0 0 0 30%"}}>{loc.address}</td>
                            </tr>
                        </div>
                    ))
                }
                <button onClick={updateLocations}>submit</button>
            </form>
        )
    }

    const handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
    }

    return (
        <div>
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                selectedMarker={selectedMarker}
                markers={locations}
                onClick={handleClick}
            />

            {renderLocations()}


        </div>
    );




}