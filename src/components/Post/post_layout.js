import React, { Component, useEffect, useRef, useState } from "react";
import "../assests/post.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import AddPost from "./actions/add_post";
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import { Avatar, Card, CardActions, CardContent, CardHeader, Paper, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import ForumIcon from '@material-ui/icons/Forum';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
      margin: theme.spacing.unit,
      padding:'2px'
    },
    input: {
      display: 'none',
    },
  }));

  





  export default function PostLayout(props)  {
    const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
    const params=props.params
    const url=props.params.url
    const classes = useStyles();
    const [Posts,setPosts]=useState();
    const [isLiked,setisLiked]=useState({});
    const [likedCount,setlikedCount]=useState({});
    const[PageCount,setPageCount]=useState(1);
    const[totalpageCnt,settotalpageCnt]=useState(PageCount+1);
    const x=localStorage.getItem('token');
    const handleScroll = () => {

      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
  
      if (bottom&&(PageCount<totalpageCnt)) {
        setPageCount(PageCount+1);
      }
    };
    const likeDislike=(id)=>{
      if(isLiked[id]==1){
        axios.delete(`${BASE_URL_HTTP}/posts/like_dislike`, {
          headers: {
            'Authorization': `token ${x}`,
          },
          data: {
            post_id:id,
          }
        }).then((res)=>{
          
          setisLiked({...isLiked,[id]:0});
          setlikedCount({...likedCount,[id]:likedCount[id]-1});
      },(error)=>{console.log(error.message,error.response)})
      
      }
      else{
        axios.post(`${BASE_URL_HTTP}/posts/like_dislike`,{post_id:id}, {
          headers: {
            'Authorization': `token ${x}`,
          },
         
        }).then((res)=>{
          
          setisLiked({...isLiked,[id]:1});
          setlikedCount({...likedCount,[id]:likedCount[id]+1});
      },(error)=>{console.log(error.message,error.response)})
      
      }
    }
    useEffect(() => { 
        window.addEventListener('scroll', handleScroll, {
        passive: true
      });

    
      
        axios.get(url,{
            headers: {
                'Authorization': `token ${x}`,
                
              },
                params:{
                  page:PageCount,
                  type:params.type,
                }
            }).then((res)=>{
              
              if(!Posts){
                setPosts(
                  res.data.posts_data, 
                );
              }
              else{
                
                setPosts([...Posts, ...res.data.posts_data]);
              }
              settotalpageCnt(res.data.pageCnt);
              setisLiked( Object.assign({}, isLiked,res.data.likeDict ))
              // setisLiked(res.data.likeDict);
              
              setlikedCount(Object.assign({},likedCount ,res.data.likeCount));
            
        }
        ,(error)=>{console.log(error.message,error.response)})
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [PageCount])
    const [Open,setOpen]=useState(false);
    const handleClose = () => {
      setOpen(false);
      
    };

const convertDriveUrl = (url) => {
      // Check if the URL is a Google Drive image URL
      if (url.includes('drive.google.com')) {
          // Extract the file ID from the URL
          const fileId = url.match(/[-\w]{25,}/);
          if (fileId) {
              // Construct the viewable URL format
              return `https://lh3.google.com/u/0/d/${fileId[0]}`;
          } else {
              console.error('Invalid Google Drive URL');
              return url; // Return original URL if unable to extract file ID
          }
      } else {
          return url; // Return original URL if not a Google Drive URL
      }
  };

    return (
      <>
      

      { Posts&& Posts.map((post)=>{
        var isvideo=true;
        return(
        
        <>
          
          <article className="Post" >

            <header>

              <div className="Post-user">


                <Avatar  src={post.userphoto} className={classes.large} />
          

   

                <div className="Post-user-nickname">
                <NavLink to={`/profile/${post.username}`}  style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>
                  <span>{post.username}</span>
                </NavLink>

                </div>

              </div>

            </header>
              <div className="Post-image">

                <div className="Post-image-bg">
                
                {post.Image &&  <img  src={convertDriveUrl(post.Image)} onError={(e)=>{isvideo=true;e.target.onerror = null; e.target.src="";}}/>}
                {/* {post.Image && isvideo && <video  controls >
                <source src={post.Image} type="video/mp4"  />
                </video>}
                 */}
                </div>

              </div>
            <div className="Post-caption">
            
            <IconButton onClick={()=>likeDislike(post.id)} color={isLiked[post.id]==1? "secondary":""} className={classes.button} aria-label="Add an alarm">
        <Icon><FavoriteIcon /></Icon>
      </IconButton>
            {likedCount[post.id]}&nbsp;
            
            <IconButton  className={classes.button}  color={""}>
            <NavLink to={`/post/${post.id}`} style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}> <Icon><ForumIcon /></Icon></NavLink>
      </IconButton>
            <div>Caption:{post.caption}</div>
            </div>

          </article>
          
        </>
        
      )})
    
      }
      {PageCount<totalpageCnt?<CircularProgress style={{marginLeft:'50%'}}/>:<></>}
      <br></br>

      </>
    )

}
