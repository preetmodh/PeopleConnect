import axios from "axios";
import React, { Component,useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import {NavLink} from 'react-router-dom';

//components
import Followers from "./user/followers";
import Following from "./user/following";

const useStyles = makeStyles((theme) => ({
    follow_following_div:{
        display: 'flex',
        columnGap: 20,
        // justifyContent: 'space-between',
    }
  }));

export default function Profile(){
    
    const x=localStorage.getItem('token')
    //hooks 
    const[followState,setfollowState]=useState(0);

    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:8000/user/followers_followings`,{
    //         headers: {
    //             'Authorization': `token ${x}`,
    //           }}).then((res)=>{
    //         console.log('donzo');
    //         console.log(res);
    //     },(error)=>{console.log(error.message,error.response)})
        
    // }, [])
      const classes = useStyles();

    return(
        <div style={{marginLeft:100}}>

            <h1 >Profile</h1>
            <div className={classes.follow_following_div}>
        
                <button onClick={()=>setfollowState(1)}>Followers</button>
                <button onClick={()=>setfollowState(2)}>Following</button>
                { followState!=0&&(followState===1?<Followers/>:<Following/>)}
            </div>
        </div>
    )
}