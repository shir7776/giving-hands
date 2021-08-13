import React, {useState} from "react";
import Table from "../../components/table/table_component";

export const GiversManagement=()=>{
    const getGiversList=()=>{
        let lst=[
            {id:1, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
            {id:2, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
            {id:3, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
            {id:4, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
            {id:5, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
            {id:6, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
            {id:7, name:"rgte",phone:23, email:"sdfgsdfg", area:1}

        ]
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