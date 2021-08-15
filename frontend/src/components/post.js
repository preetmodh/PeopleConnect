import React, { Component, useState } from "react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PostLayout from "./Post/post_layout";
import AddPost from "./Post/actions/add_post";


export default function Post()  {
  const parameters={
              type: 'all',
              url:`http://127.0.0.1:8000/posts/profile_post/ `
            }
  const [OpenAddPost,setOpenAddPost]=useState(false);
  const handleCloseAddPost = () => {
      setOpenAddPost(false);
    
  };
  return (
      <>
        <div className="Post">
          <button onClick={()=>{setOpenAddPost(true)}}>Add Post</button>
        </div>
        { OpenAddPost && <AddPost  open={OpenAddPost} onClose={handleCloseAddPost}/>}


        <PostLayout params={parameters}/>
      </>
    )

}