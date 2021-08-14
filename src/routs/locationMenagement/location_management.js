import React, {useState} from "react";
import MyMapComponent from "../../components/map/map_component";
import Table from "../../components/table/table_component";
import {serverAPI} from "../../API/serverAPI";

export const LocationManagement = () => {
    const getLocations = () => {
        serverAPI.getLocations()

    }
    const [locationList, setLocationList] = React.useState(getLocations())
    const [selectedMarker, setSelectedMarker] = useState(false)
    const [place, setPlace] = useState(null)
    const [newLocation, setNewLocation] = useState({})

    const getCoordinates = async (quary) => {
        let newQuary = quary.split(" ")
        newQuary = newQuary.join("%20")
        let url = 'https://us1.locationiq.com/v1/search.php?key=pk.32ce82cfe3f662e3b6a89ac046a5b6fa&q=' + newQuary + '&format=json'
        console.log(url)
        return await fetch(url)
            .then(response => response.json())
            .then(data => {
                    return data[0]
                    setNewLocation({...data[0]})
                    console.log("location after")
                    console.log(newLocation)
                }
            );
        return newLocation

    }

    const getLocationsColumns = () => {
        let lst = [
            {
                title: 'ID', field: 'id', editable: false
            },
            {
                title: 'Address', field: 'address'
            },
            {
                title: 'Latitude', field: 'lat'
            },
            {
                title: 'Longitude', field: 'lng'
            },
            {
                title: 'Area', field: 'area'
            }
        ];
        return lst;
    }

    const updateLocation = (lst) => {
        console.log("hahahahh")
    }
    const addLocation = async (newRow) => {
        const location = await getCoordinates(newRow.address)
        if (location) {


            const newRow2 =
                {
                    id: newRow.id,
                    address: newRow.address,
                    lat: location.lat,
                    lng: location.lon,
                    area: 0,
                    finished: false,
                    date: Date.now()
                }
            setLocationList(prevArray => [...prevArray, newRow2])
        }
        else{
            alert("could not find this address :(")
        }
    }
    const deleteLocation = (lst) => {
        console.log("hahahahh")
    }
    const handleClick = (marker, event) => {
        // console.log({ marker })
        setSelectedMarker(marker)
    }


    console.log("result", locationList)
    return (
        <div>
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                selectedMarker={selectedMarker}
                markers={locationList}
                onClick={handleClick}
            />


            <Table
                name={"Location Management"}
                data={getLocations()}//I REPLACED THIS FUNCTION IF THERE IS A PROBLEM GO SEA THE ORIGINAL LOCATIONMANAGEMENT FILE
                columns={getLocationsColumns()}
                update={updateLocation}
                delete={deleteLocation}
                add={addLocation}
            />

        </div>
    );

}