import MyMapComponent from "../../components/map/map_component";
import Table from "../../components/table/table_component";
import React, {useState} from "react";
import {locationAPI} from "../../API/locationAPI";

export const AssignGivers = (props) => {
    const getGiversList = () => {
        let lst = [
            {id: 1, name: "rgte", phone: 23, email: "sdfgsdfg", area: 1},
            {id: 2, name: "rgte", phone: 23, email: "sdfgsdfg", area: 1},
            {id: 3, name: "rgte", phone: 23, email: "sdfgsdfg", area: 1},
            {id: 4, name: "rgte", phone: 23, email: "sdfgsdfg", area: 1},
            {id: 5, name: "rgte", phone: 23, email: "sdfgsdfg", area: 1},
            {id: 6, name: "rgte", phone: 23, email: "sdfgsdfg", area: 1},
            {id: 7, name: "rgte", phone: 23, email: "sdfgsdfg", area: 1}

        ]
        return lst;
    }
    const [givers, setGivers] = useState(getGiversList())
    const getAreaList = () => {
        const lst = [1, 2, 3, 4, 5]
        return lst.filter(area => !givers
            .some(giver => Number(giver.area) === area))
    }
    const [areaList, setAreaList] = useState(getAreaList())
    const [locations, setLocations] = useState(locationAPI.getLocations())

    const [selectedMarker, setSelectedMarker] = useState(false)
    const nonUsedAreas = () => {
        return (

            <ul>
                {
                    areaList.map((area) => (
                        <li>{area}</li>
                    ))
                }
            </ul>

        )
    }

    const updateGiver = (giver) => {
        const newGiversList = givers
        const index = newGiversList.findIndex(giver2 => giver2.id === giver.id)
        newGiversList[index] = giver;
        setGivers(newGiversList)
        setAreaList(areaList.filter(area => !givers
            .some(giver => Number(giver.area) === area)))
        nonUsedAreas()
    }



    const getGiversColumns = () => {
        let lst = [
            {
                title: 'ID', field: 'id', editable: false
            },
            {
                title: 'Name', field: 'name', editable: false
            },
            {
                title: 'Phone Number', field: 'phone', editable: false
            },
            {
                title: 'Email', field: 'email', editable: false
            },
            {
                title: 'Area', field: 'area'
            }
        ];
        return lst;
    }
    const handleClick = (marker, event) => {
        console.log({marker})
        setSelectedMarker(marker)
    }
    return (
        <div>

            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                selectedMarker={selectedMarker}
                markers={locations}
                onClick={handleClick}
            />

            <h3>Areas Left To Assighn:</h3>
            {nonUsedAreas()}

            <Table
                name={"Assign Givers"}
                data={givers}
                columns={getGiversColumns()}
                update={updateGiver}
            />


        </div>
    );
}