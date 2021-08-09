import React, { Component } from "react";
import "./post.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PostLayout from "./Post/post_layout";



export default function Post()  {
  const link=`http://127.0.0.1:8000/posts/profile_post`
  return (
      <>
        <PostLayout link={link}/>
      </>
    )

}