import React, { Component } from "react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PostLayout from "./Post/post_layout";



export default function Post()  {
  const parameters={
              type: 'all',
            }
  return (
      <>
        <PostLayout params={parameters}/>
      </>
    )

}