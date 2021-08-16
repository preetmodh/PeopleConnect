import React, { Component, useState } from "react";
import Button from '@material-ui/core/Button';
import PostLayout from "./post_layout";
import AddPost from "./actions/add_post";


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
        <div className="Post" style={{border:'none'}}>
          <Button variant="outlined" onClick={()=>{setOpenAddPost(true)}}>Add Post</Button>
        </div>        { OpenAddPost && <AddPost  open={OpenAddPost} onClose={handleCloseAddPost}/>}


        <PostLayout params={parameters}/>
      </>
    )

}