import ShowMore from "react-show-more";
import React from "react";

export const Post=({post})=>{
    return (
        <li key={post._id} className='ticket'>

            <h5 className='title'>{post.title}</h5>
            <p className='content'><ShowMore>{post.content}</ShowMore></p>

            <footer>
                <table>

                    <td>
                        <div
                            className='meta-data'>By {post.userEmail} | {new Date(post.creationTime).toLocaleString()}</div>
                    </td>
                    <td>
                        <div className="flexWrap">
                            {post.labels ?
                                post.labels.map((lable) => (<div className="lableWrapper">
                                    <div className="flexCol">{lable}</div>
                                </div>)) :
                                null}
                        </div>
                    </td>
                </table>
            </footer>
        </li>)
}