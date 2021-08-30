import React, {useState} from "react";
import Table from "../../components/table/table_component";
import {giversAPI} from "../../API/giversAPI";

export const GiversManagement = () => {
    const [givers, setGivers] = useState([])
    const [flag, setFlag] = useState(false)

    React.useEffect(async () => {
        await fetch("/users.json")
            .then((res) => res.json())
            .then((data1) => {
                    setGivers(data1);
                    setFlag(true)
                }
            );
    }, []);

    const getGiversList = () => givers

    const updateGiver = async (giver) => {
        await giversAPI.updateGiver(giver)
    }
    const addGiver = async (giver) => {
        const mes = await giversAPI.addGiver(giver)
    }
    const deleteGiver = async (giver) => {
        await giversAPI.deleteGiver(giver)
    }


    const getGiversColumns = () => {
        let lst = [
            {
                title: 'First Name', field: 'fname'
            },
            {
                title: 'Last Name', field: 'lname'
            },
            {
                title: 'Email', field: 'email',
            },{
                title: 'Address', field: 'address'
            },
            {
                title: 'Salary', field: 'salery'
            },
            {
                title: 'Age', field: 'age'
            },
            {
                title: 'Phone Number', field: 'phone_number'
            },
            {
                title: 'Type', field: 'type'
            },
        ];
        return lst;
    }


    return (
        flag?
        <Table
            name={"Givers Management"}
            data={givers}
            columns={getGiversColumns()}
            update={updateGiver}
            delete={deleteGiver}
            add={addGiver}
        />:
            <h2>Loading...</h2>
    );


}