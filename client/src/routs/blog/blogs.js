import React, {useState} from "react";
import './blog.css'
import styles from './blog.css';
import ShowMore from 'react-show-more';

import {NewPost} from "../../components/blog/newPost";
import {Post} from "../../components/blog/post";
import {BlogAPI} from "../../API/blogAPI";

export const Blog = () => {
    //
    const [posts,setPosts] = useState(null);
    const [addPost, setAddPost] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [hodaya ,setHodaya]=useState(false);

    const [labels, setLabels] = useState(null);
    const newPostVisibility = () => {
        setAddPost(!addPost);
    };
    React.useEffect(async() => {
         await fetch("/blogs.json")
        .then((res) => res.json())
        .then((data1) =>setPosts((JSON.stringify(data1)))
        
        );
        //var a =await BlogAPI().getBlog().then(data=>{JSON.stringify(data)});
        //console.log(a);
        //setPosts(BlogAPI().getBlog());
        console.log(typeof(posts))
    }, []);
    
    React.useEffect(() => {
        setHodaya(true);
    }, [posts]);

    const renderPosts = () => {
        
        return (<div className={styles.blog}>
            <ul className='tickets'>
                
                {posts.map((post, index) => (
                    <Post post={post}/>
                ))}
            </ul>
        </div>);

        
        
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
                { hodaya ? renderPosts() : <h2>Loading..</h2>}

            </div>
            </body>
        </main>

    );
}