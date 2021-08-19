import React, {useState} from "react";
import './blog.css'
import styles from './blog.css';
import ShowMore from 'react-show-more';

import {NewPost} from "../../components/blog/newPost";
import {Post} from "../../components/blog/post";
import {blogAPI} from "../../API/blogAPI";

export const Blog = () => {
    const [posts,setPosts] = useState(blogAPI.getBlog())
    const [addPost, setAddPost] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [labels, setLabels] = useState(null);
    const newPostVisibility = () => {
        setAddPost(!addPost);
    };

    const renderPosts = () => {
        return (<div className={styles.blog}>
            <ul className='tickets'>
                {posts.map((post, index) => (
                    <Post post={post}/>
                ))}
            </ul>
        </div>);
    };
    const allThePosts=()=>{
        console.log("in all the post function")
        fetch("/blogs.json")
        .then(response => response.json())


};
    return (
        <main>

            <body className='body2'>
            <header>
                <button onClick={newPostVisibility}>{"Add New Post"}</button>
                {addPost && <NewPost newPostVisibility={newPostVisibility}
                                     setUserEmail={setUserEmail}
                                     setTitle={setTitle}
                                     setLabels={setLabels}
                                     setContent={setContent}/>}
            </header>
            <div>
                { posts ? renderPosts() : <h2>Loading..</h2>}

            </div>
            </body>
        </main>

    );
}