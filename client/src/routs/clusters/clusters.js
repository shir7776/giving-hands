import React, {useState} from "react";
import Table from "../../components/table/table_component";
import {giversAPI} from "../../API/giversAPI";

export const Clusters = () => {
    const [givers, setGivers] = useState([])
    const [locations, setLocations] = useState([])
    const [flag, setFlag] = useState([])
    const [flag2, setFlag2] = useState([])

    React.useEffect(async () => {
        await fetch("/users.json")
            .then((res) => res.json())
            .then((data1) => {
                    setGivers(data1);
                    setFlag(true)
                }
            );
        await fetch("/locations.json")
            .then((res) => res.json())
            .then((data1) => {
                    setLocations(data1);
                    setFlag2(true)
                }
            );
    }, []);

    return (

    );


}