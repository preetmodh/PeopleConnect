import axios from "axios";
import React, { Component,useEffect, useState } from "react";

import {Navlink} from "react-router-dom";




export default function People(){
    const[suggestedFriends,setsuggestedFriends]=  useState();
    const x=localStorage.getItem('token')
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/user/suggested_friends`,{
            headers: {
                'Authorization': `token ${x}`,
              }}).then((res)=>{
            console.log('donzo');
            console.log(res);
            setsuggestedFriends(res.data.suggested_friends);
        },(error)=>{console.log(error.message,error.response)})
        
    }, [])
    
    return(
        <div style={{marginLeft:300}}>
            <h1>Suggested Friends</h1>
            <div >
                <ul style={{fontSize:30}}>
                    {suggestedFriends&& suggestedFriends.map((Friend)=>{
                        return <li>{Friend.user_name}</li>  
                    })}
                </ul>
            </div>
        </div>
    )
}