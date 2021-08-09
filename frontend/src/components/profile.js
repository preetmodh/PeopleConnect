import axios from "axios";
import React, { Component,useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';


//components
import Followers from "./user/followers";
import Following from "./user/following";
const emails = ['username@gmail.com', 'user02@gmail.com'];
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
    const changeFollowState=(val)=>{setfollowState(val)};


    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        setfollowState(0);
    };
    
      const classes = useStyles();
    
    return(
        <div style={{marginLeft:100}}>

            <h1 >Profile</h1>
            <div className={classes.follow_following_div}>
        
                <button onClick={()=>{changeFollowState(1);setOpen(true)}}>Followers</button>
                <button onClick={()=>{changeFollowState(2);setOpen(true)}}>Following</button>
                
            </div>
            { followState!=0&&(followState===1?<Followers selectedValue={selectedValue} open={open} onClose={handleClose}/>:<Following selectedValue={selectedValue} open={open} onClose={handleClose}/>)}
        </div>
    )
}