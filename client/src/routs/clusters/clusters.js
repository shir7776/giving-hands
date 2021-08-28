import React, {useState} from "react";
import {SpacingGrid} from "../../components/grid/grid";

export const Clusters = () => {
    const [givers, setGivers] = useState([])
    const [locations, setLocations] = useState([])
    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState("false")


    React.useEffect(async () => {
        await fetch("/users.json")
            .then((res) => res.json())
            .then((data1) => {
                    setGivers(data1);
                    setFlag(true)
                }
            );
    }, []);

    React.useEffect(async () => {

        await fetch("/locations.json")
            .then((res) => res.json())
            .then((data1) => {
                    setLocations(data1);
                    setFlag2(true)
                }
            );
    }, []);

    return (
        <div>


            {flag&&flag2&&<SpacingGrid givers={givers} locations={locations}/>}

        </div>

    );


}