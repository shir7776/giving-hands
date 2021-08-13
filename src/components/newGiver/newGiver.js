import React from "react";
//I DONT THINK WE NEED THIS COMPONENT ANYMORE!!
export const NewGiver=(props)=>{

        return (
            <div >
                <div >
                    <h2>New Giver</h2>
                    <form >
                        <div className="user-box" >
                            <input type="text" name="name" id="name"  onChange={(e)=>(props.setName(e.target.value))}required/>
                            <label>Name*</label>
                        </div>
                        <div className="user-box">

                            <input type="text" name="phone" required={true} onChange={(e)=>(props.setPhone(e.target.value))}/>
                            <label>Phone Number*</label>
                        </div>
                        <div className="user-box">

                            <input type="text" name="Email" required={true} onChange={(e)=>(props.setEmail(e.target.value))}/>
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