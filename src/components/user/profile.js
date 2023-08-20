import axios from "axios";
import React, { Component,useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import '../assests/App.css';
import Editprofile from './editprofile';
//components
import Followers from "./followers";
import Following from "./following";
import PostLayout from "../Post/post_layout";
import UserfollowUnfollow from "./Action/user_followUnfollow";
import { Avatar, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    follow_following_div:{
        display: 'flex',
        columnGap: 20,
        marginBottom:'20px',
        // justifyContent: 'space-between',
    }
  }));

export default function Profile(){
    
    const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
    
    const {username}  = useParams();
    
    
    const x=localStorage.getItem('token')
    //hooks 
    const[followState,setfollowState]=useState(0);
    const[userphoto,setUserphoto]=useState();
    const [iscurrentuser,setiscurrentuser]=useState(true);
    const [open, setOpen] = React.useState(false);
    const [OpenAddPost,setOpenAddPost]=useState(false);
    const classes = useStyles();
      const parameters={
        type: 'profile',
        url:`${BASE_URL_HTTP}/posts/profile_post/${username}`
      }

    useEffect(()=>{
        axios.get(`${BASE_URL_HTTP}/user/register`,{
            headers: {
                'Authorization': `token ${x}`,  
              },
              params: {
                username: username,
            }
            }).then((res)=>{
                setUserphoto(res.data.userphoto)
                setiscurrentuser(res.data.is_current_user) 
        }
        ,(error)=>{console.log(error.message,error.response)})
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const changeFollowState=(val)=>{setfollowState(val)};

    const handleClose = () => {
        setOpen(false);
        
        setfollowState(0);
    };
    
    const handleCloseAddPost = () => {
        setOpenAddPost(false);
    };
    
      


   

    return(
        <>
         <div>
            {userphoto && <Avatar src={userphoto}/>}
            <h2>{username}</h2>
            <div className={classes.follow_following_div}>

                <UserfollowUnfollow username={username}/>
                {iscurrentuser ?<Button variant='outlined' onClick={()=>{setOpenAddPost(true)}}>Edit Profile</Button>:<></>}
                <Button variant='outlined' onClick={()=>{changeFollowState(1);setOpen(true)}}>Followers</Button>
                <Button variant='outlined' onClick={()=>{changeFollowState(2);setOpen(true)}}>Following</Button>
                { OpenAddPost && <Editprofile  open={OpenAddPost} onClose={handleCloseAddPost}/>}
            </div>
            { followState!=0&&(followState===1?<Followers username={username} open={open} onClose={handleClose}/>:<Following username={username} open={open} onClose={handleClose}/>)}

           
            
           
            <div className={classes.profilePosts}>
                <PostLayout params={parameters}/>
            </div>
        </div>
        </>
    )
}