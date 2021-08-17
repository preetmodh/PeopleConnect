import axios from "axios";
import React, { Component,useEffect, useState } from "react";
<<<<<<< HEAD
=======
import { useParams } from "react-router-dom";
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
import { makeStyles } from '@material-ui/core/styles';


//components
import Followers from "./followers";
import Following from "./following";
import PostLayout from "../Post/post_layout";
<<<<<<< HEAD
const emails = ['username@gmail.com', 'user02@gmail.com'];
=======
import AddPost from "../Post/actions/add_post";
import User_followUnfollow from "./Action/user_followUnfollow";
import { Button } from "@material-ui/core";

>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
const useStyles = makeStyles((theme) => ({
    follow_following_div:{
        display: 'flex',
        columnGap: 20,
        // justifyContent: 'space-between',
    }
  }));

export default function Profile(){
    
<<<<<<< HEAD
=======
    
    
    const {username}  = useParams();
    
    
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
    const x=localStorage.getItem('token')
    //hooks 
    const[followState,setfollowState]=useState(0);
    const changeFollowState=(val)=>{setfollowState(val)};


    const [open, setOpen] = React.useState(false);
<<<<<<< HEAD
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
=======
    
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1

    const handleClickOpen = () => {
        setOpen(true);
    };

<<<<<<< HEAD
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        setfollowState(0);
    };
=======
    const handleClose = () => {
        setOpen(false);
        
        setfollowState(0);
    };
    const [OpenAddPost,setOpenAddPost]=useState(false);
    const handleCloseAddPost = () => {
        setOpenAddPost(false);
      
    };
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
    
      const classes = useStyles();
      const parameters={
        type: 'profile',
<<<<<<< HEAD
=======
        url:`http://127.0.0.1:8000/posts/profile_post/${username}`
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
      }
    return(
        <div style={{marginLeft:100}}>

            <h1 >Profile</h1>
<<<<<<< HEAD
            <div className={classes.follow_following_div}>
        
                <button onClick={()=>{changeFollowState(1);setOpen(true)}}>Followers</button>
                <button onClick={()=>{changeFollowState(2);setOpen(true)}}>Following</button>
                
            </div>
            { followState!=0&&(followState===1?<Followers selectedValue={selectedValue} open={open} onClose={handleClose}/>:<Following selectedValue={selectedValue} open={open} onClose={handleClose}/>)}
=======
            <h2>{username}</h2>
            <div className={classes.follow_following_div}>
                <User_followUnfollow username={username}/>
            
                <Button variant='outlined' onClick={()=>{changeFollowState(1);setOpen(true)}}>Followers</Button>
                <Button variant='outlined' onClick={()=>{changeFollowState(2);setOpen(true)}}>Following</Button>
                
            </div>
            { followState!=0&&(followState===1?<Followers username={username} open={open} onClose={handleClose}/>:<Following username={username} open={open} onClose={handleClose}/>)}

           
            
           
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
            <div className={classes.profilePosts}>
                <PostLayout params={parameters}/>
            </div>
        </div>
    )
}