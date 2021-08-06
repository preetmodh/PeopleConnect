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
    followButton:{
        marginLeft:100,
    }
  }));
  


export default function Followers(props){
    const x=localStorage.getItem('token')
    const classes = useStyles();

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    const[followers,setfollowers]=useState()
    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(blue[500]),
        //   backgroundColor: red[500],
          '&:hover': {
            backgroundColor: red[700],
          },
        },
      }))(Button);

    const removeFollower=(id)=>{
      axios.delete(`http://127.0.0.1:8000/user/followers_followings`, {
        headers: {
          'Authorization': `token ${x}`,
        },
        data: {
          type: 'followers',
          id:id,
        }
      }).then((res)=>{
        console.log('donzo');
        console.log(res);
        
    },(error)=>{console.log(error.message,error.response)})
    }
    useEffect(() => {
      const body={ name:1,};
        axios.get(`http://127.0.0.1:8000/user/followers_followings`,{
            headers: {
                'Authorization': `token ${x}`,
                
              },
              params: {
                type: 'followers',
                
            }
            }).then((res)=>{
            console.log('donzo');
            console.log(res);
            setfollowers(res.data.followers);
        },(error)=>{console.log(error.message,error.response)})
        
    }, [])
    return(
        <>
        <Dialog onClose={handleClose}  open={open}>
      <DialogTitle >Followers</DialogTitle>
      <List>
        {followers&&followers.map((follower) => (
            <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={follower.user_name} secondary={follower.first_name+" "+follower.last_name} />
                
                
                <ColorButton onClick={()=>removeFollower(follower.id)} variant="contained" color="primary" className={classes.followButton}>
                    Remove
                </ColorButton>
            </ListItem>
            ))}
        </List>
    </Dialog>


    
        </>
    )
}