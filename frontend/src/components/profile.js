import axios from "axios";
import React, { Component,useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


//components
import Followers from "./user/followers";
import Following from "./user/following";
import PostLayout from "./Post/post_layout";
import AddPost from "./Post/actions/add_post";
import User_followUnfollow from "./user/Action/user_followUnfollow";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    follow_following_div:{
        display: 'flex',
        columnGap: 20,
        // justifyContent: 'space-between',
    }
  }));

export default function Profile(){
    
    
    
    const {username}  = useParams();
    
    
    const x=localStorage.getItem('token')
    //hooks 
    const[followState,setfollowState]=useState(0);
    const changeFollowState=(val)=>{setfollowState(val)};


    const [open, setOpen] = React.useState(false);
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        
        setfollowState(0);
    };
    const [OpenAddPost,setOpenAddPost]=useState(false);
    const handleCloseAddPost = () => {
        setOpenAddPost(false);
      
    };
    
      const classes = useStyles();
      const parameters={
        type: 'profile',
        url:`http://127.0.0.1:8000/posts/profile_post/${username}`
      }
    return(
        <div style={{marginLeft:100}}>

            <h1 >Profile</h1>
            <div className={classes.follow_following_div}>
                <User_followUnfollow username={username}/>
            
                <Button variant='outlined' onClick={()=>{changeFollowState(1);setOpen(true)}}>Followers</Button>
                <Button variant='outlined' onClick={()=>{changeFollowState(2);setOpen(true)}}>Following</Button>
                
            </div>
            { followState!=0&&(followState===1?<Followers username={username} open={open} onClose={handleClose}/>:<Following username={username} open={open} onClose={handleClose}/>)}

           
            
           
            <div className={classes.profilePosts}>
                <PostLayout params={parameters}/>
            </div>
        </div>
    )
}