import React, {Component} from 'react';
import {SpacingGrid} from "../../components/grid/grid";
import style from './homePageStyle.module.css'
export const Home = () => {

    return (
        <div className={style.body}>
            <h2 className={style.header}> Helping Hand</h2>
            <h3 className={style.content}>With each decade of life, we learn, we grow, we struggle, and hopefully, we triumph.
                By the time we reach an old age, chances are we’re pretty doggone resilient. Not so
                resilient, though, that we never need a helping hand.

            </h3>
            <h1 className={style.bottom}>Thank You All For Your Efforts</h1>
            <img className={style.image}
                src='https://cdn.images.express.co.uk/img/dynamic/1/590x/elderly-1013634.jpg?r=1536191441819'/>
        </div>
);
}
//export default Home;