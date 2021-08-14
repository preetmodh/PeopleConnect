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
const emails = ['username@gmail.com', 'user02@gmail.com'];

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

export default function Following(props){
    const x=localStorage.getItem('token')
    const classes = useStyles();

    const { onClose,  open } = props;

    const handleClose = () => {
      onClose();
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    const[following,setfollowing]=useState()
    const[following_id,setfollowing_id]=useState({})
    

    const removefollowing=(id)=>{
        axios.delete(`http://127.0.0.1:8000/user/followers_followings`, {
          headers: {
            'Authorization': `token ${x}`,
          },
          data: {
            type: 'following',
            id:id,
          }
        }).then((res)=>{
          console.log('donzo');
          console.log(res);
          
          setfollowing_id({...following_id,[id]:0});
      },(error)=>{console.log(error.message,error.response)})
    }


    const Follow=(id)=>{
      axios.post(`http://127.0.0.1:8000/user/followers_followings`,{following:id}, {
        headers: {
          'Authorization': `token ${x}`,
        },
       
      }).then((res)=>{
        console.log('donzo');
        console.log(res);
        
        setfollowing_id({...following_id,[id]:1});
    },(error)=>{console.log(error.message,error.response)})
  }
    useEffect(() => {
      const body={ name:1,};
        axios.get(`http://127.0.0.1:8000/user/followers_followings`,{
            headers: {
                'Authorization': `token ${x}`,
                
              },
              params: {
                type: 'following',
                
            }
            }).then((res)=>{
            console.log('donzo');
            console.log(res);
            setfollowing(res.data.following);
            const dict={}
            for (let i = 0; i < res.data.following.length; i++) {
              dict[res.data.following[i].id]=1;
            
              
            }
            return dict;
            
        }
        ,(error)=>{console.log(error.message,error.response)}).then((dict)=>{
          setfollowing_id(dict);
          

        },(error)=>{console.log(error.message)});
      
    }, [])
    return(
        <>
        <Dialog onClose={handleClose}  open={open}>
      <DialogTitle >Following</DialogTitle>
      <List>
        {following&&following.map((following) => (
            <>
              <ListItem key={following.id}>
                      <ListItemAvatar>
                      <Avatar>
                          <ImageIcon />
                      </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={following.user_name} secondary={following.first_name+" "+following.last_name} />
                   
                  
                      {following_id[following.id]===1? <ColorButton onClick={()=>removefollowing(following.id)} variant="contained" color="primary" className={classes.followingButton}>
                      Unfollow
                  </ColorButton>:
                  <ColorButtonFollow onClick={()=>Follow(following.id)} variant="contained" color="primary" className={classes.followingButton}>
                      Follow
                  </ColorButtonFollow>
                }
              </ListItem>
            </>
            ))}
        </List>
    </Dialog>


    
        </>
    )
}