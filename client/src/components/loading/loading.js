import loadingGIF from "../../loading.gif";
import React from "react";
import style from './loading.module.css'

export const  Loading=()=>{
    return <img className={style.loading} src={loadingGIF} alt="loading..." />
}