import React, {useState} from "react";
import {loginAPI} from "../../API/loginAPI";
import { Loading } from "../loading/loading";

export const Login = ({setPerson,person})=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [flag,setFlag]=useState(false)
    const login =async(email,password)=>{
        setFlag(true);
        const person2= await loginAPI.login(email,password)
        console.log(person2)
        if(person2){
            setPerson(person2)
        }
        else{
            setFlag(false)
            alert("wrong Email address or password :(")
        }
    }
    return (
        <div >
            {!flag?<div className="login-box">
                <h2>Login</h2>
                <form >
                    <div className="user-box" >
                        <input type="text" name="title" id="title"  onChange={(e)=>(setEmail(e.target.value))}required/>
                        <label>Email</label>
                    </div>
                    <div className="user-box">

                        <input type="password" name="" required={true} onChange={(e)=>(setPassword(e.target.value))}/>
                        <label>Password</label>
                    </div>

                    <a onClick={()=>login(email,password)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        login
                    </a>
                </form>
            </div>:<Loading/>}
        </div>
    )
}
