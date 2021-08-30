import React, {useState} from "react";
import MyMapComponent from "../../components/map/map_component";
import {locationAPI} from "../../API/locationAPI";
import Table from "../../components/table/table_component";
import {ColorButton} from "../../components/button/ColorButton";
import loadingGIF from "../../loading.gif";
import {Loading} from "../../components/loading/loading";

export const GiveConfirmation=()=>{
    
    const [locations,setLocations]=useState([])
    const [selectedLocations,setSelectedLocations]=useState([])
    const [reunselectedLocations,setreunSelectedLocations]=useState([])
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
    await fetch("/getLocationsByEmail",options).then((response)=>response.json()).then(response=>{
        setLocations(response);
        setFlag(true);
    });
    }, []);

    const changeToFinish=()=>{
        const lst=locations.map(loc=>loc.tableData?{...loc,finished:loc.tableData.checked}:loc)
        setLocations(lst)
    }

    const onSelectionChange=(rows)=>{

changeToFinish()//this is wired
        setSelectedLocations([...rows])
        //writing locations back to database
    }
    const updateLocations=async()=>{
        await locationAPI.deleteDailyDeliv({locations:selectedLocations});
        window.location.reload(true);
        //writing locations back to database
    }
    const getLocationsColumns = () => {
        let lst = [
            {
                title: 'Address', field: 'name_addr',editable:false
            },
        ];
        return lst;
    }

    const renderLocations=()=>{
        return(
            <>
                <Table
                    name={"Give Confirmation (enter the \"submit\" button to save changes) "}
                    data={locations}//I REPLACED THIS FUNCTION IF THERE IS A PROBLEM GO SEA THE ORIGINAL LOCATIONMANAGEMENT FILE
                    columns={getLocationsColumns()}
                    selection={true}
                    onSelectionChange={onSelectionChange}
                />

                <ColorButton onClick={updateLocations}>submit</ColorButton>
    </>
        )
    }

    const handleClick = (marker, event) => {
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
    ):<Loading/>;




}