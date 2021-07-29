import React, { Component } from "react";
import "./post.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  





  export default function Post()  {
    const classes = useStyles();


 

    return (
    <article className="Post" >

        <header>

          <div className="Post-user">

            <div className="Post-user-profilepicture">

              <img src="https://i.pinimg.com/originals/2f/e0/6c/2fe06c3acec7d5a78c1706ad7a96a821.jpg" alt="Preet Modh" />

            </div>

            <div className="Post-user-nickname">

              <span>Preet Modh</span>

            </div>

          </div>

        </header>

        <div className="Post-image">

          <div className="Post-image-bg">

            <img alt="Icon Living" src="https://i.pinimg.com/originals/2f/e0/6c/2fe06c3acec7d5a78c1706ad7a96a821.jpg" />

          </div>

        </div>

        <div className="Post-caption">
        <ThumbUpAltIcon style={{color:'#ff0066',marginBottom:'-7px',marginLeft:'-10px',marginRight:'10px'}}/>
        
        <strong>Preet Modh </strong> Oii oii oiii
        </div>
        <TextField
          style={{marginBottom:'7px',marginLeft:'10px'}}
          id="standard-textarea"
          label="comment here"

          multiline
          variant="outlined"
          size="small"
        />

      </article>
    )

}