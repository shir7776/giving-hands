import React, { Component } from "react";
import Table from "./table_component.js"
class GiversManagement extends Component {
    constructor() {
        super();
        this.state={
            name:"",
            phone:"",
            Email:""
        }
    }
    // boxStyle={
    //     "width":"100%",
    //     "position":"relative",
    //     "transforme":"none",
    //     "box-shadow": "none",
    //     "left":"0%",
    //     "top":"0%",
    //     "-webkit-transform":"none"
    // }
    getGiversList=()=>{
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
    getGiversColumns=()=>{
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
    updateGiver=(lst)=>
    {
        console.log("hahahahh")
    }
    addGiver=(lst)=>
    {
        console.log("hahahahh")
    }
    deleteGiver=(lst)=>
    {
        console.log("hahahahh")
    }
    newGiver = ()=>{
        return (
            <div >
                <div >
                    <h2>New Giver</h2>
                    <form >
                        <div className="user-box" >
                            <input type="text" name="name" id="name"  onChange={(e)=>(this.setState({name:e.target.value}))}required/>
                            <label>Name*</label>
                        </div>
                        <div className="user-box">

                            <input type="text" name="phone" required={true} onChange={(e)=>(this.setState({phone:e.target.value}))}/>
                            <label>Phone Number*</label>
                        </div>
                        <div className="user-box">

                            <input type="text" name="Email" required={true} onChange={(e)=>(this.setState({Email:e.target.value}))}/>
                            <label>Email*</label>
                        </div>
                        <div className="user-box">
                            <h5 style={{margin:-10}}>*required fields</h5>
                        </div>
                        <a >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Add Giver
                        </a>
                    </form>
                </div>
            </div>
        )
    }
    render() {
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
                data={this.getGiversList()}
                columns ={this.getGiversColumns() }
                update={this.updateGiver}
                delete={this.deleteGiver}
                add={this.addGiver}
            />
        );
    }
}

export default GiversManagement;