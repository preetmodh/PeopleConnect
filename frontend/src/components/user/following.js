import React,{useEffect,useState} from 'react';
import axios from "axios";
export default function Following(){
    const x=localStorage.getItem('token')
    
    

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/user/followers_followings`,{
            headers: {
                'Authorization': `token ${x}`,
              }}).then((res)=>{
            console.log('donzo');
            console.log(res);
        },(error)=>{console.log(error.message,error.response)})
        
    }, [])
    return(
        <>
            <h1>Following</h1>
        </> 
    )
}