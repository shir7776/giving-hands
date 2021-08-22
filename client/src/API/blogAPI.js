import { useState } from "react";

export const BlogAPI= ()=>{
    const [data,setData]= useState(null);
const getBlog= ()=>{

   const lst=
       [
           {
               "id": "b7151edd-06bf-5a26-b338-60bf851661ae",
               "title": "Help I am a beginner in javascript!!!",
               "content": "Hi i need help please! i'm a beginner at java script. i'm trying to use an onlick event to change the color of a button in my code, this button links to and other HTML file. Here is the HTML and CSS code.\n\n\nHTML code:\n\n<a  href=\"index.html\"><button  class=\"btn-hm\">HOME</button></a> \n\n<a href=\"Photogallery.html\"><button class=\"btn-gp\">Photo Gallery</button></a>\n\n\nCSS code: \n\n.btn-hm{\n\nfont-family: 'Mansalva', cursive;\ncolor:white;\ntext-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;\nborder: 4px solid white;\npadding:10px 22px;\nfont-size: 35px;\nborder-radius: 10%;\nbackground-color:gray;\ncursor: pointer;\ncursor: hand;   \n\n}\n\n.btn-gp{\n  padding:10px 22px;\n  font-size: 35px;\n border-radius: 10%;\n  font-family: 'Mansalva', cursive;\n  border: 4px solid white;\n  color: white;\ntext-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;\nbackground-color:gray;\ncursor: pointer;\n    cursor: hand;\n  }\n\nI've tried a few things in JS and it fail every time. please someone help me and explain what i need to doe  :(",
               "userEmail": "wogel@foter.bn",
               "creationTime": 1545625643857
           },
           {
               "id": "a18f9ec1-cc1d-5f58-ae85-e2c3cee90b27",
               "title": "How did you make your website on a budget? Would wix work? I am an artist\n",
               "content": "So I am an artist and have 0 experience with websites at all. I am running on a limited budget and haven't made much money yet, but my gallery (and I guess me to some extent) is ranked in the top 10 in my big city (semi large state capital). I need to expand now and get a website, I am not going to sell any art off there as I am trying to stay high brow ish and am only selling at galleries and auctions, I just want to explain my art (it is very... unique) and provide images. Would six work for this? I'm just looking to show people what I am about and give a link on trip advisor as well as gove critics somewhere to look and contact me. My budget is like 300 (enough to use six but probably not a real designer) so what do you guys think https://cnv.to/",
               "userEmail": "fusom@ireruveho.er",
               "creationTime": 1517624146865
           },
           {
               "id": "9581d77e-edec-57d7-8626-72b57fa6037f",
               "title": "Repeaters performance on a dynamic page",
               "content": "Are 15 repeaters (each with 5 items) gonna be too much for a dynamic page to handle?\n\nEach item container will have a button, a text element and 3 pictures of 5 KBs each.\n\nWill this break the page?\n\nThoughts?",
               "userEmail": "kapgip@ite.fo",
               "creationTime": 1525545421561
           },
           {
               "id": "264a85a8-907d-51c5-9647-d25fa4b8f077",
               "title": "Calendar",
               "content": "Has anyone found any good solutions with integrating calendar bookings with Wix Code? I am looking for basic functionality such as the option to book dates, displaying availability and an add to calendar function. ",
               "userEmail": "kiujuma@ul.ua",
               "creationTime": 1529188631674
           }
       ]
        fetch("/blogs.json")
        .then((res) => res.json())
        .then((data1) =>setData(JSON.stringify(data1))
        
        );
   
    return data;
}

const updateBlog=(blog)=>{

}
const addBlog=(blog)=>{

}
const deleteBlog=(blog)=>{

}
return {
    getBlog,
    updateBlog,
    addBlog,
    deleteBlog
}}