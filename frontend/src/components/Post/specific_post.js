import React, { Component, useEffect, useState,useRef } from "react";
import "../assests/post.css";
import '../assests/App.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Avatar, Card } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import { Container } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import AddPost from "./actions/add_post";
import Icon from '@material-ui/core/Icon';
import { NavLink, useHistory, useParams } from "react-router-dom";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  grid: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  Comment: {
    minWidth: 100,
    maxHeight:510,
    minHeight:510,
    maxWidth:500 ,
    
  },
  Comment2:{
    minWidth: 450,
    maxHeight:450,
    minHeight:450,
    maxWidth:500 ,
  }
  
}));



export default function SpecificPost(){

    const {id}  = useParams();
    const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
    const classes = useStyles();
    const messagesEndRef = useRef(null)
    const [newcomment, setNewcomment] = useState('');
    const x=localStorage.getItem('token');
    const [post,setpost]=useState();
    const [Likes,setLikes]=useState();
    const [Comments,setComments]=useState();
    const[isLiked,setisLiked]=useState();
    const[likedCount,setlikedCount]=useState();
    const likeDislike=()=>{
      if(isLiked==1){
        axios.delete(`${BASE_URL_HTTP}/posts/like_dislike`, {
          headers: {
            'Authorization': `token ${x}`,
          },
          data: {
            post_id:id,
          }
        }).then((res)=>{
          console.log('donzo');
          console.log(res);
          
          setisLiked(0);
          setlikedCount(likedCount-1);
      },(error)=>{console.log(error.message,error.response)})
      
      }
      else{
        axios.post(`${BASE_URL_HTTP}/posts/like_dislike`,{post_id:id}, {
          headers: {
            'Authorization': `token ${x}`,
          },
         
        }).then((res)=>{
          console.log('donzo');
          console.log(res);
          
          setisLiked(1);
          setlikedCount(likedCount+1);
      },(error)=>{console.log(error.message,error.response)})
      
      }
    }
    useEffect(() => {
          axios.get(`${BASE_URL_HTTP}/posts/${id}`,{
              headers: {
                  'Authorization': `token ${x}`,
                  
                },
               
              }).then((res)=>{
              console.log('donzo');
              console.log(res);
              setpost(res.data.post_data);
              setLikes(res.data.likes);
              setComments(res.data.comments);
              setisLiked(res.data.isLiked);
              setlikedCount(res.data.post_data.likes)
          }
          ,(error)=>{console.log(error.message,error.response)})
            
  
          }, []);
         

          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
          
const sendcomment =(e) =>{
  e.preventDefault();
  const body={
    body:newcomment,
    post:id,
  }
  axios.post(`${BASE_URL_HTTP}/comments/new`,body, {
        headers: {
          'Authorization': `token ${x}`,
        },
       
      }).then((res)=>{
        setComments([...Comments,...[res.data]])
        setNewcomment('')
    },(error)=>{console.log(error.message,error.response)})

}


          return(
            
              <div  style={{display:'flex'}} >
              {post&& window.innerWidth > 700 &&
              <Card display='flex' className={classes.Comment} flexGrow={1} style={{marginLeft:'5%',minWidth: 450,overflow:'auto',
    maxHeight:'85vh',
    maxWidth:'75vw'}}>
              
                

                <div className="Post-user">

                <Avatar  src={post.userphoto} className={classes.large} />
          
                  
                  <div className="Post-user-nickname">

                  <NavLink to={`/profile/${post.username}`}  style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>
                  <span>{post.username}</span>
                </NavLink>

                  </div>

                </div>


              <CardContent>
              <div className="Post-image">
              <div>
                  {post&&< img src={post.Image}style={{ width:"100%",height:'100%'}}/>}
              </div>
                  
                  <div className="Post-caption">

                  <IconButton onClick={()=>likeDislike(post.id)} color={isLiked==1? "secondary":""} className={classes.button} aria-label="Add an alarm">
                  <Icon><FavoriteIcon /></Icon>
                  </IconButton>
                  {likedCount}&nbsp;

                  <div>{post.caption}</div>
                  </div>
              </div>
              </CardContent>
              
</Card>}
<div className="rootc"  style={{border:'ridge'}}>
<NavLink to={`/home`}  style={{textDecoration: 'none',cursor:'pointer',color:'black'}}>
  <KeyboardBackspace style={{float:'left',marginTop:'5px'}}/>
  </NavLink>
  <h2 style={{margin:'5px'}}>Comments</h2>

  
  <div style={{
    overflow:'auto',
    marginBottom:'20px',
    marginTop:'40px',
    height:'50vh',
    width:'100%',
    }}>

      
      
    <CardContent >
    
      {Comments&& Comments.map((Comment)=>{
     return(
       <>
      <Paper style={{
        marginTop:'5px',
        position:'relative',
        backgroundColor:'#cae8fa',
        maxWidth:'91%',
        }}>
        <NavLink to={`/profile/${Comment.username}`}  style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>
          <strong>{Comment.username}</strong>
        </NavLink>
        
        <div style={{
        padding:'4px',
        fontSize:'14px',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        width:'100%',
        }}>{Comment.body}
        <br/><br/>
        {Comment.time_ago}
        </div>
        
      </Paper>
      </>
     )
   })}


    </CardContent>
    
    <div ref={messagesEndRef} />
    
  
  
  </div>
  <br/>
  <Container  maxWidth="xs" style={{position: 'relative',bottom:'15px' }}>
<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="type here"
            name="message"
            autoComplete="email"
            value={newcomment}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                sendcomment(event);
              }
            }}
            onChange={(event)=>{setNewcomment(event.target.value)}}
            
    />
<Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e)=>{sendcomment(e)}}
            
    >
    GO
    </Button>

    </Container >
</div>
               
              </div>
          )
};