import React, { Component, useEffect, useState } from "react";
import "./post.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import AddPost from "./actions/add_post";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  





  export default function PostLayout(props)  {
    const link=props.link
    const classes = useStyles();
    const [Posts,setPosts]=useState();

    const x=localStorage.getItem('token');
    useEffect(() => {
      
        axios.get(`${link}`,{
            headers: {
                'Authorization': `token ${x}`,
                
              },
              
            }).then((res)=>{
              setPosts(res.data);
            console.log(res);
            
        }
        ,(error)=>{console.log(error.message,error.response)})
      
    }, [])
    const [Open,setOpen]=useState(false);
    const handleClose = () => {
      setOpen(false);
      
    };

    return (
      <>
      <div className="Post">
        
        <button onClick={()=>{setOpen(true)}}>Add Post</button>
        
        
    </div>
    
    { Open && <AddPost  open={Open} onClose={handleClose}/>}
      { Posts&& Posts.map((post)=>{return(
        <>
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

                <img alt="Icon Living" src={post.Image} />

              </div>

            </div>

            <div className="Post-caption">
            <button>
            <ThumbUpAltIcon style={{color:'#ff0066',marginBottom:'-7px',marginLeft:'-10px',marginRight:'10px'}}/>
            </button>
            <strong>Preet Modh </strong> 
            <div>{post.caption}</div>
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
        </>
      )})
    
      }
      </>
    )

}