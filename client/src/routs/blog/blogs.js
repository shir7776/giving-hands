import React, {useState} from "react";
import './blog.css'
import styles from './blog.css';
import ShowMore from 'react-show-more';

import {NewPost} from "../../components/blog/newPost";
import {Post} from "../../components/blog/post";
import {BlogAPI} from "../../API/blogAPI";

export const Blog = ({type}) => {
    //
    const [posts,setPosts] = useState(null);
    const [addPost, setAddPost] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [flag ,setFlag]=useState(false);
    const [flagAdd ,setFlagAdd]=useState(false);

    const [labels, setLabels] = useState(null);
    const newPostVisibility = () => {
        setAddPost(!addPost);
    };
    const addNewPost =()=>{
        const date =new Date();
       var creationTime =date.valueOf();
        BlogAPI.addBlog({title,content,userEmail,creationTime});
        setAddPost(!addPost);
    }
    React.useEffect(async() => {
         await fetch("/blogs.json")
        .then((res) => res.json())
        .then((data1) =>{setPosts(data1);
                        setFlag(true);}
        
        );
    }, []);

//     React.useEffect(async() => {
//         const date =new Date();
//        var creationTime =date.valueOf();
//         console.log(creationTime);
//         const ans={title,content,userEmail,creationTime};
//             const options = {
//                 method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(ans)
//             };
//             console.log("befor fetch")
//             await fetch("/addNewBlog",options);
//    }, []);
    
    

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
            {type&&<header>
                 <button onClick={newPostVisibility}>{"Add New Post"}</button>
                {addPost && <NewPost newPostVisibility={newPostVisibility}
                    setUserEmail={setUserEmail}
                    setTitle={setTitle}
                    setLabels={setLabels}
                    setContent={setContent}
                    addNewPost={addNewPost}/>}
            </header>}
            <div>
                { flag ? renderPosts() : <h2>Loading..</h2>}

            </div>
            </body>
        </main>

    );
}