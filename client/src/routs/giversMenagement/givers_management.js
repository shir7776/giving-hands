import React, {useState} from "react";
import Table from "../../components/table/table_component";
import {giversAPI} from "../../API/giversAPI";
import loadingGIF from "../../loading.gif";
import {Loading} from "../../components/loading/loading";

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
        window.location.reload(true);
    }
    const deleteGiver = async (giver) => {
        await giversAPI.deleteGiver(giver)
    }


    const getGiversColumns = () => {
        let lst = [
            {
                title: 'First Name', field: 'fname',validate: rowData => rowData.fname === '' ? 'Name cannot be empty' : ''
            },
            {
                title: 'Last Name', field: 'lname',validate: rowData => rowData.lname === '' ? 'Last name cannot be empty' : ''
            },
            {
                title: 'Email', field: 'email',validate: rowData => rowData.email === '' ? 'Email cannot be empty' : ''
            },
            {
                title: 'Address', field: 'address',validate: rowData => rowData.address === '' ? 'Address cannot be empty' : ''
            },
            {
                title: 'Salary', field: 'salery',validate: rowData => rowData.salery === '' ? 'Salary cannot be empty' : ''
            },
            {
                title: 'Age', field: 'age',validate: rowData => rowData.age === '' ? 'Age cannot be empty' : ''
            },
            {
                title: 'Phone Number', field: 'phone_number',validate: rowData => rowData.phone_number === '' ? 'Phone number cannot be empty' : ''
            },
            {
                title: 'Type', field: 'type',lookup: { manager: 'Manager', giver: 'Giver' },
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
            <Loading/>
    );


}