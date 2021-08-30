import React, {useState} from "react";
import MyMapComponent from "../../components/map/map_component";
import {locationAPI} from "../../API/locationAPI";
import Table from "../../components/table/table_component";
import {Button} from "@material-ui/core";

export const GiveConfirmation=()=>{
    const getLocations=()=>{
       const lst=locationAPI.getLocations()
        return lst;
    }
    const [locations,setLocations]=useState(getLocations())
    const [selectedLocations,setSelectedLocations]=useState([])
    const [selectedMarker,setSelectedMarker]=useState(false)
    const [flag,setFlag]=useState(false);

    React.useEffect(async () => {
        let data = JSON.parse(sessionStorage.getItem("user"));
        var email =data['email'];
        var b ={email:email}
        const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(b)
    };
    console.log(options.body)
    await fetch("/getLocationsByEmail",options).then((response)=>response.json()).then(response=>{
        setLocations(response);
        setFlag(true);
    });
    }, []);

    const changeToFinish=(rows)=>{
        let newLocations=locations
        newLocations.map(loc=>rows.find(row=>row._id===loc._id)?loc.finished=!loc.finished:loc)//[index].finished=!newLocations[index].finished
        setLocations(newLocations)
        console.log(newLocations)
    }

    const onSelectionChange=(rows)=>{

changeToFinish(rows)
        setSelectedLocations([...rows])
        //writing locations back to database
    }
    const updateLocations=async()=>{
        await locationAPI.deleteDailyDeliv({locations:selectedLocations});
        //writing locations back to database
    }
    const getLocationsColumns = () => {
        let lst = [
            {
                title: 'Address', field: 'name_addr'
            },
        ];
        return lst;
    }

    const renderLocations=()=>{
        return(
            <>
                <Table
                    name={"Give Confirmation"}
                    data={locations}//I REPLACED THIS FUNCTION IF THERE IS A PROBLEM GO SEA THE ORIGINAL LOCATIONMANAGEMENT FILE
                    columns={getLocationsColumns()}
                    selection={true}
                    onSelectionChange={onSelectionChange}
                />

                <Button onClick={updateLocations}>submit</Button>
    </>
        )
    }

    const handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
    }

    return flag?(
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
    ):<h2>Loading...</h2>;




}