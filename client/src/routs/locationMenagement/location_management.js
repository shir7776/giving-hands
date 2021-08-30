import React, {useState} from "react";
import MyMapComponent from "../../components/map/map_component";
import Table from "../../components/table/table_component";
import {locationAPI} from "../../API/locationAPI";

export const LocationManagement = () => {
    
    const [flag, setFlag] = useState(false);
    const [locationList, setLocationList] = React.useState([]);
    const [selectedMarker, setSelectedMarker] = useState(false)
    const [place, setPlace] = useState(null)
    const [newLocation, setNewLocation] = useState({})
    const getLocations = () => {
        return locationList;

    }

    React.useEffect(async () => {
        await fetch("/addresses-for-distribution.json")
            .then((res) => res.json())
            .then((data1) => {
                setLocationList(data1);
                    setFlag(true);
                }
            );
    }, []);

    const getCoordinates = async (quary) => {
        let newQuary = quary.split(" ")
        newQuary = newQuary.join("%20")
        let url = 'https://us1.locationiq.com/v1/search.php?key=pk.32ce82cfe3f662e3b6a89ac046a5b6fa&q=' + newQuary + '&format=json'
        return await fetch(url)
            .then(response => response.json())
            .then(data => {
                    return data[0]
                    setNewLocation({...data[0]})
                }
            );
        return newLocation

    }

    const getLocationsColumns = () => {
        let lst = [
            {
                title: 'Address', field: 'address'
            },
            {
                title: 'Latitude', field: 'lat'
            },
            {
                title: 'Longitude', field: 'lng'
            }
        ];
        return lst;
    }

    const updateLocation = async(location) => {
        const loc=locationList.filter(l=>location._id===l._id)
        if(loc[0].address!==location.address)
        {
            const addr=await getCoordinates(location.address)
            location =
                {
                    address: location.address,
                    lat: addr.lat,
                    lng: addr.lon,
                }
        }
        await locationAPI.updateLocation(location)
        window.location.reload(true);
    }
    const addLocation = async (newRow) => {
        const location = await getCoordinates(newRow.address)
        if (location) {
            const newRow2 =
                {
                    address: newRow.address,
                    lat: location.lat,
                    lng: location.lon,
                }
            setLocationList(prevArray => [...prevArray, newRow2])
            var mes =await locationAPI.addLocation(newRow2);
            if(mes!="")
            alert(mes);
        }
        else{
            alert("could not find this address :(")
        }
        window.location.reload(true);
    }
    const deleteLocation = async(location) => {
        await locationAPI.deleteLocation(location);
    }
    const handleClick = (marker, event) => {
        setSelectedMarker(marker)
    }

    
    return flag?(
        
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
            />:
            

        </div>
            
    ) : <h2>Loading...</h2> ;

}