import React, { Component, useEffect, useState } from "react";
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
          
          console.log(res);
          
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
          console.log('donzo');
          console.log(res);
          
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
            console.log(res);
            
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



    return (
      <>
      

      { Posts&& Posts.map((post)=>{return(
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
            <NavLink to={`/post/${post.id}`}>
              <div className="Post-image">

                <div className="Post-image-bg">

                {post.Image && <img alt="Icon Living" src={post.Image} />}

                </div>

              </div>
            </NavLink>
            <div className="Post-caption">
            
            <IconButton onClick={()=>likeDislike(post.id)} color={isLiked[post.id]==1? "secondary":""} className={classes.button} aria-label="Add an alarm">
        <Icon><FavoriteIcon /></Icon>
      </IconButton>
            {likedCount[post.id]}&nbsp;
            
            
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