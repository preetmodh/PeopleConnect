import React,{useEffect,useState} from 'react';
import axios from "axios";
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
      },
    followingButton:{
        marginLeft:100,
    },
    
  }));
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blue[500]),
    
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }))(Button);
  const ColorButtonFollow = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blue[700]),
    
      '&:hover': {
        backgroundColor: blue[700],
      },
    },
  }))(Button);

export default function User_followUnfollow(props){
    const x=localStorage.getItem('token')
    const classes = useStyles();
    const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
    
    const [iscurrentuser,setiscurrentuser]=useState(true);
    const [isFollowing,setisFollowing]=useState(false);
    const username=props.username
    const[id,setid]=useState();
    const removefollowing=()=>{
        axios.delete(`${BASE_URL_HTTP}/user/followers_followings/${username}`, {
          headers: {
            'Authorization': `token ${x}`,
          },
          data: {
            type: 'unfollow_other_user',
            id:id,
          }
        }).then((res)=>{
          console.log('donzo');
          console.log(res);
          setisFollowing(false);
          
          
          
      },(error)=>{console.log(error.message,error.response)})
    }


    const Follow=()=>{
      axios.post(`${BASE_URL_HTTP}/user/followers_followings/${username}`,{following:id}, {
        headers: {
          'Authorization': `token ${x}`,
        },
       
      }).then((res)=>{
        console.log('donzo');
        console.log(res);
        setisFollowing(true);
        
    },(error)=>{console.log(error.message,error.response)})
  }
    useEffect(() => {
      
        axios.get(`${BASE_URL_HTTP}/user/followers_followings/${username}`,{
            headers: {
                'Authorization': `token ${x}`,
                
              },
              params: {
                type: 'is_following_curuser',
                
            }
            }).then((res)=>{
            
            console.log(res);
            
            setiscurrentuser(res.data.iscuruser);
            setisFollowing(res.data.is_following_curuser);
            setid(res.data.other_user_id);
            
        }
        ,(error)=>{console.log(error.message,error.response)})
      
    }, [])
    return(
        <>
         {iscurrentuser==false ? (isFollowing===true? <ColorButton onClick={()=>removefollowing()} variant="contained" color="primary" className={classes.followingButton}>
                      Unfollow
                  </ColorButton>:
                  <ColorButtonFollow onClick={()=>Follow()} variant="contained" color="primary" className={classes.followingButton}>
                      Follow
                  </ColorButtonFollow>):<></>
                }
           </>
    )
}