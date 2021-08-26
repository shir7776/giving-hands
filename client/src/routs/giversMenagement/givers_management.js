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
    const updateGiver=async (lst)=>
    {
        await  giversAPI.updateGiver({fname:"rgte",lname:"jjk",phone_number:"1111123",password:"123", email:"sdfgddsdfg",address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",workToday:true})
        console.log("hahahahh")
    }
    const addGiver=async (lst)=>
    {
        const mes = await  giversAPI.addGiver({fname:"rgte",lname:"jjk",phone_number:"23",password:"123", email:"sdfgddsdfg",address:"vxf",age:"4",salary:"ghcg",type:"dfgsd"})
        console.log(mes);
        //const ls = await giversAPI.getDaylyGivers();
        //console.log(ls);
        //await giversAPI.updateGiverWithArea({_id:"6127675a20371c5d10ccf60a",area:"1"})
    }
    const deleteGiver=async(lst)=>
    {
        await  giversAPI.deleteGiver({email:"sdfgddsdfg"})
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