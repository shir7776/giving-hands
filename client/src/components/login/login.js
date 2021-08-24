import React, {useState} from "react";
import {loginAPI} from "../../API/loginAPI";

export const Login = ({setPerson})=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const login =(email,password)=>{
        const person=loginAPI.login(email,password)
        if(person){
            setPerson(person)
        }
        else{
            alert("wrong Email address or password :(")
        }
    }
    return (
        <div >
            <div className="login-box">
                <h2>Login</h2>
                <form >
                    <div className="user-box" >
                        <input type="text" name="title" id="title"  onChange={(e)=>(setEmail(e.target.value))}required/>
                        <label>Email</label>
                    </div>
                    <div className="user-box">

                        <input type="text" name="" required={true} onChange={(e)=>(setPassword(e.target.value))}/>
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
            </div>
        </div>
    )
}
