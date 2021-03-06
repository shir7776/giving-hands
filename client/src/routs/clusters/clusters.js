import React, {useState} from "react";
//import { options } from "../../../../server/routes/clusterAlg";
import {SpacingGrid} from "../../components/grid/grid";
import loadingGIF from "../../loading.gif";
import {Loading} from "../../components/loading/loading";

export const Clusters = () => {
    const [givers, setGivers] = useState([])
    const [locations, setLocations] = useState([])
    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)


    React.useEffect(async () => {
        await fetch("/givers.json")
            .then((res) => res.json())
            .then((data1) => {
                    setGivers(data1);
                    setFlag(true)
                }
            );
            await fetch("/addresses-for-distribution.json")
            .then((res) => res.json())
            .then((data1) => {
                setLocations(data1);
                    setFlag2(true)
                }
            );
    }, []);


    return (
        <div>


            {flag&&flag2?<SpacingGrid givers={givers} locations={locations}/>:<Loading/>}

        </div>


    );


}