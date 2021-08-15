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
import { NavLink} from 'react-router-dom';

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
    const username=props.username;
    const { onClose, open } = props;

    const handleClose = () => {
      onClose();
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    const[followers,setfollowers]=useState()
    const[followers_id,setfollowers_id]=useState({})
    const [iscurrentuser,setiscurrentuser]=useState(false);
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
      axios.delete(`http://127.0.0.1:8000/user/followers_followings/${username}`, {
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
        
        setfollowers_id({...followers_id,[id]:0});
    },(error)=>{console.log(error.message,error.response)})
    }
    useEffect(() => {
      
        axios.get(`http://127.0.0.1:8000/user/followers_followings/${username}`,{
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
            setiscurrentuser(res.data.iscuruser);
            const dict={}
            for (let i = 0; i < res.data.followers.length; i++) {
              dict[res.data.followers[i].id]=1;
            //   setfollowers_id(prevState => ({
            //     ...prevState,
            //     [res.data.followers[i].id]:1, 
            //  }));  
              
            }
            return dict;
            
        }
        ,(error)=>{console.log(error.message,error.response)}).then((dict)=>{
          setfollowers_id(dict);
          

        },(error)=>{console.log(error.message)});
      
    }, [])
    return( 
        <>
        <Dialog onClose={handleClose}  open={open}>
      <DialogTitle >Followers</DialogTitle>
      <List>
        {followers&&followers.map((follower) => (
            <ListItem>
                    <ListItemAvatar>
                    <Avatar src={follower.picture}>
                        
                    </Avatar>
                    </ListItemAvatar>
                    <NavLink to={`/profile/${follower.user_name}`}  style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>
                      <ListItemText primary={follower.user_name} secondary={follower.first_name+" "+follower.last_name} />
                    </NavLink>
                    
                
                
                {iscurrentuser==true? followers_id[follower.id]===1? <ColorButton onClick={()=>removeFollower(follower.id)} variant="contained" color="primary" className={classes.followButton}>
                      Remove
                  </ColorButton>:
                  <ColorButton disabled variant="contained" color="primary" className={classes.followButton}>
                      Removed
                  </ColorButton>
                  :
                  <></>
                }

                
            </ListItem>
            ))}
        </List>
    </Dialog>


    
        </>
    )
}