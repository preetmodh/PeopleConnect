import axios from "axios";
import React, { Component,useEffect, useState } from "react";
import "./assests/post.css";
import {NavLink} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";


export default function People(){
    const[suggestedFriends,setsuggestedFriends]=  useState();
    const x=localStorage.getItem('token')
    const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;

    useEffect(() => {
        axios.get(`${BASE_URL_HTTP}/user/suggested_friends`,{
            headers: {
                'Authorization': `token ${x}`,
              }}).then((res)=>{
            setsuggestedFriends(res.data.suggested_friends);
        },(error)=>{console.log(error.message,error.response)})
        
    }, [])
    
    return(
        <div style={{marginBottom:'15%'}}>
            <h1>Suggested Friends</h1>
            <Grid container spacing={6}> 
                    {suggestedFriends&& suggestedFriends.map((Friend)=>{
                        return(
                            <NavLink to={`/profile/${Friend.user_name}`}  style={{ textDecoration: 'none',cursor:'pointer',color:'black',margin:'20px'}}>
                            <Card style={{ overflow:'auto', height: '30vh', width: '50vh'}}>
                            <h3 style={{
                                padding:'8px',
                                fontSize:'18px',
                                whiteSpace: 'pre-wrap',
                                overflowWrap: 'break-word',
                                }}>
                                    {Friend.user_name}
                            </h3> 
                            <Avatar src={Friend.picture} style={{ height: '15vh', width: '15vh',margin:'5px'}} />
                            </Card>
                            </NavLink>
   
                        )
                    })}
            </Grid>
        </div>
    )
}