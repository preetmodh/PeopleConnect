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
    }
  }));
  


export default function Following(props){
    const x=localStorage.getItem('token')
    const classes = useStyles();

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    const[following,setfollowing]=useState()
    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(blue[500]),
        //   backgroundColor: red[500],
          '&:hover': {
            backgroundColor: red[700],
          },
        },
      }))(Button);

    const removefollowing=(id)=>{
        
    }
    useEffect(() => {
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
            console.log(res.data.following); 
        },(error)=>{console.log(error.message,error.response)})
        
    }, [])
    return(
        <>
        <Dialog onClose={handleClose}  open={open}>
      <DialogTitle >Following</DialogTitle>
      <List>
        {following&&following.map((following) => (
            <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={following.user_name} secondary={following.first_name+" "+following.last_name} />
                
                
                <ColorButton onClick={()=>removefollowing(following.id)} variant="contained" color="primary" className={classes.followButton}>
                    Remove
                </ColorButton>
            </ListItem>
            ))}
        </List>
    </Dialog>


    
        </>
    )
}