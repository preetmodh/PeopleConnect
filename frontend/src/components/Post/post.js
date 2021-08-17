<<<<<<< HEAD
import React, { Component } from "react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PostLayout from "./Post/post_layout";

=======
import React, { Component, useState } from "react";
import Button from '@material-ui/core/Button';
import PostLayout from "./post_layout";
import AddPost from "./actions/add_post";
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1


export default function Post()  {
  const parameters={
              type: 'all',
<<<<<<< HEAD
            }
  return (
      <>
=======
              url:`http://127.0.0.1:8000/posts/profile_post/ `
            }
  const [OpenAddPost,setOpenAddPost]=useState(false);
  const handleCloseAddPost = () => {
      setOpenAddPost(false);
    
  };
  return (
      <>
        <div className="Post" style={{border:'none'}}>
          <Button variant="outlined" onClick={()=>{setOpenAddPost(true)}}>Add Post</Button>
        </div>        { OpenAddPost && <AddPost  open={OpenAddPost} onClose={handleCloseAddPost}/>}


>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
        <PostLayout params={parameters}/>
      </>
    )

}