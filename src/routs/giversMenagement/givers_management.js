import React, {useState} from "react";
import Table from "../../components/table/table_component";
import {giversAPI} from "../../API/giversAPI";

export const GiversManagement=()=>{
    const getGiversList=()=>{
        let lst=giversAPI.getGivers()
        return lst;
    }

    const getGiversColumns=()=>{
        let lst=[
            {
                title: 'ID', field: 'id', editable: false
            },
            {
                title: 'Name', field: 'name'
            },
            {
                title: 'Phone Number', field: 'phone'
            },
            {
                title: 'Email', field: 'email'
            },
            {
                title: 'Area', field: 'area'
            }
        ];
        return lst;
    }
    const updateGiver=(lst)=>
    {
        console.log("hahahahh")
    }
    const addGiver=(lst)=>
    {
        console.log("hahahahh")
    }
    const deleteGiver=(lst)=>
    {
        console.log("hahahahh")
    }



    return (
        // <main>
        // <body className='body2'>
        // <header>
        //     { this.newGiver() }
        // </header>
        // </body>
        // </main>
        <Table
            name={"Givers Management"}
            data={getGiversList()}
            columns ={getGiversColumns() }
            update={updateGiver}
            delete={deleteGiver}
            add={addGiver}
        />
    );






}