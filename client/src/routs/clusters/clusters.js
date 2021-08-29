import React, {useState} from "react";
//import { options } from "../../../../server/routes/clusterAlg";
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
    const clusterAlg=async()=>{
        var obj={
            addresses:[
                {
                    _id:"611e32c64fe2e555356139db",
                    address:"1",
                    lat:"31",
                    lng:"35",
                    status:"1"
                },
                {
                    _id:"611e332a4fe2e555356139dc",
                    address:"2",
                    lat:"32",
                    lng:"35",
                    status:"1"
                },
                {
                    _id:"611e332a4fe2e555356139da",
                    address:"2",
                    lat:"37",
                    lng:"35",
                    status:"1"
                },
                {
                    _id:"611e332a4fe2e555356139de",
                    address:"2",
                    lat:"37",
                    lng:"37",
                    status:"1"
                },
                {
                    _id:"611e332a4fe2e555356139df",
                    address:"2",
                    lat:"37",
                    lng:"37",
                    status:"1"
                }
            ],
            users:[
                {
                    _id:"611e33934fe2e555356139de",
                    fname:"shir",
                    lname:"yehuda",
                    address:"jerusalem 5",
                    age:"20",
                    salery:"7,000",
                    phone_number:"05050505",
                    email:"bla@gmail.com",
                    type:"cluster",
                    status:"1"
                },
                {
                    _id:"611e33934fe2e555356139de",
                    fname:"shir",
                    lname:"yehuda",
                    address:"jerusalem 5",
                    age:"20",
                    salery:"7,000",
                    phone_number:"05050505",
                    email:"bla@gmail.com",
                    type:"cluster",
                    status:"1"
                }
            ]

        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        };
        await fetch("/clusterAlg",options).then((res) => res.json())
        .then((data1) => {
                console.log(data1);
            }
        );

    }

    return (
        <div>


            {flag&&flag2&&<SpacingGrid givers={givers} locations={locations}/>}
            <button onClick = {clusterAlg} >clusterAlg</button>

        </div>


    );


}