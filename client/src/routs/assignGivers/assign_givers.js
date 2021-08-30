import MyMapComponent from "../../components/map/map_component";
import Table from "../../components/table/table_component";
import React, {useState} from "react";
import {locationAPI} from "../../API/locationAPI";
import {giversAPI} from "../../API/giversAPI";
import style from './assingGiversStyle.module.css'

export const AssignGivers = (props) => {

    const [locations, setLocations] = useState([])
    const [givers, setGivers] = useState([])
    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)
    const [areaList, setAreaList] = useState([])

    React.useEffect(async () => {
        await fetch("/usersDayly.json")
            .then((res) => res.json())
            .then((data1) => {
                    setGivers(data1);
                    setFlag(true)
                }
            );
            await fetch("daily-distribution.json").then((res) => res.json())
            .then((data1) => {
                    setLocations(data1);
                    setFlag2(true)
                }
            );
    }, []);
    React.useEffect(async () => {
        setAreaList(getAreaList)
    }, [givers]);


    const getAreaList = () => {
        const lst = []
        for (var i = 1; i < givers.length; i++) {
            lst.push(i);
        }
        return lst.filter(area => !givers
            .some(giver => Number(giver.area) === area))
    }
    
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
    const isEveryGiverHasDifferentArea = () => {

        if (givers.filter(g => givers.filter(g2 => g.area === g2.area).length > 1).length === 0) {
            return true
        }
        return false
    }
    const [isGiversHasDifferentArea, setIsGiversHasDifferentArea] = useState(isEveryGiverHasDifferentArea())

    const updateGiver = async (giver) => {
        const newGiversList = givers
        const index = newGiversList.findIndex(giver2 => giver2._id === giver._id)
        newGiversList[index] = giver;
        setGivers(newGiversList)
        setAreaList(areaList.filter(area => !givers
            .some(giver => Number(giver.area) === area)))
        nonUsedAreas()
        await giversAPI.updateGiverWithArea(giver)
        setIsGiversHasDifferentArea(isEveryGiverHasDifferentArea())

    }


    const getGiversColumns = () => {
        let lst = [
            {
                title: 'First Name', field: 'fname', editable: false
            },
            {
                title: 'Last Name', field: 'lname', editable: false
            },
            {
                title: 'Email', field: 'email', editable: false
            },
            {
                title: 'Phone Number', field: 'phone_number', editable: false
            },
            {
                title: 'Area', field: 'area'
            },
        ];
        return lst;
    }
    const handleClick = (marker, event) => {
        console.log({marker})
        setSelectedMarker(marker)
    }
    return flag&&flag2?(
        
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
            <h3>Areas Left To Assign:</h3>
            {nonUsedAreas()}
            {isGiversHasDifferentArea &&
            <h4 className={style.redHeadline}>You Cannot Assign Two Givers To The Same Area</h4>}
             <Table
                name={"Assign Givers"}
                data={givers}
                columns={getGiversColumns()}
                update={updateGiver}
            /> 
        </div>
        
    ):<h2>Loading..</h2>;
}