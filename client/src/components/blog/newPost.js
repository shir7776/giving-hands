import React from "react";

export const NewPost = ({setTitle,setContent,setUserEmail,setLabels,newPostVisibility,addNewPost})=>{
    return (
        <div >
            <div className="login-box">
                <h2>New Post</h2>
                <form >
                    <div className="user-box" >
                        <input type="text" name="title" id="title"  onChange={(e)=>(setTitle(e.target.value))}required/>
                        <label>Title*</label>
                    </div>
                    <div className="user-box">

                        <input type="text" name="" required={true} onChange={(e)=>(setContent(e.target.value))}/>
                        <label>What Do Yo Want To Write About?*</label>
                    </div>
                    <div className="user-box">

                        <input type="text" name="" required={true} onChange={(e)=>(setUserEmail(e.target.value))}/>
                        <label>Your Email*</label>
                    </div>
                    <div className="user-box">

                        <input type="text" name="" required={true} onChange={(e)=>(setLabels(e.target.value))}/>
                        <label>Labels You Want To Add?</label>
                        <h5 style={{margin:-10}}>*required fields</h5>
                    </div>
                    <a onClick={addNewPost}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Add Post
                    </a><a onClick={newPostVisibility}>cancle</a>
                </form>
            </div>
        </div>
    )
}
