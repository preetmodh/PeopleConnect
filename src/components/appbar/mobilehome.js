/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect } from 'react';
import { NavLink,Link ,useHistory} from 'react-router-dom';
import axios from 'axios';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveIcon from '@material-ui/icons/Save';
import Avatar from '@material-ui/core/Avatar';
import { Input, Table } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import Search from './search';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';




const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBar2: {
        top: 'auto',
        bottom: -1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));
  


export default function MobileHome({children}) {
const classes = useStyles();
const theme = useTheme();
const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
const BASE_URL_WS=process.env.REACT_APP_BASE_URL_WS;
const [iconid,setid]=useState();
const [open, setOpen] = useState(false);
const [notiCount, setnotiCount] = useState(0);
const [msgCount, setmsgCount] = useState(0);
const [messageCount, setmessageCount] = useState(0);
const [username,setusername]=useState();
const [profile,setprofile]=useState();
const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};

useEffect(() => {
  const x=localStorage.getItem('token');
  const link = `${BASE_URL_WS}/ws/noticount/?authorization=${x}` ;
  const chatSocket = new WebSocket(link);
  chatSocket.onmessage = function(e) {
  var data = JSON.parse(e.data);
  setusername(data.value.user);
  setprofile(data.value.profile_pic);
  setnotiCount(data.value.count)
  setmessageCount(data.value.message_count)
  };
  chatSocket.onclose = function(e) {
  console.error('Chat socket closed unexpectedly');

};
}, []); 


const changeColor=(idx,s)=>{
setid(idx)
setTimeout(function(){
setid(-1)
}, 250);


}
const logout=()=>{
  localStorage.removeItem('token');
  window.location.replace('/login');
}

return (
  
<div className={classes.root}>




<CssBaseline />
<AppBar
position="fixed"
className={clsx(classes.appBar, {
[classes.appBarShift]: open,
})}
>
<Toolbar>
<Box display='flex' flexGrow={1} >
        <Avatar style={{marginTop:'15px',marginLeft:'3px',marginRight:'3px' }}  src={profile} className={classes.large} />
        <h8 style={{ fontSize: 18,marginTop:'25px',marginRight:'20px',whitespace: 'nowrap'}}>{username}</h8>

<Search/>
      <Button onClick={logout} style={{ fontSize:15,margin:'15px',color:'white' }}>Logout</Button>
</Box>
</Toolbar>
</AppBar>
<main className={classes.content}>
<div className={classes.toolbar} />
<div>{children}</div>
</main>






<AppBar position="fixed" color="primary" className={classes.appBar2} >
    <div style={{
        display:'grid',
        alignContent:'space-evenly',
        gridTemplateColumns:'auto auto auto auto auto auto',

        }}>
        <NavLink  to={'/home'}   style={{ textDecoration: 'none',cursor:'pointer'}} >
            <HomeIcon style={{margin:'5px',color:'white',fontSize:'35px' }}  className={classes.large} />
        </NavLink>
        <NavLink  to={'/peoples'} color='black'  style={{ textDecoration: 'none',cursor:'pointer'}} >
            <PeopleIcon style={{margin:'5px',color:'white',fontSize:'35px' }}   className={classes.large} />
        </NavLink>
        <NavLink  to={'/messages'}   style={{ textDecoration: 'none',cursor:'pointer'}} >
        <Badge badgeContent={messageCount} color="secondary">
          <MessageIcon style={{margin:'5px',color:'white',fontSize:'35px'  }}  className={classes.large} />
          </Badge>
        </NavLink>
        <NavLink  to={`/profile/${username}`}   style={{ textDecoration: 'none',cursor:'pointer'}} >
            <AccountCircleIcon style={{margin:'5px',color:'white',fontSize:'35px'  }}  className={classes.large} />
        </NavLink>
        <NavLink  to={'/notifications'}   style={{ textDecoration: 'none',cursor:'pointer'}} >
        <Badge badgeContent={notiCount} color="secondary">
            <NotificationsIcon style={{margin:'5px',color:'white',fontSize:'35px'  }}  className={classes.large} />
          </Badge>
        </NavLink>
        <NavLink  to={'/todo'}   style={{ textDecoration: 'none',cursor:'pointer'}} >
            <AssignmentTurnedInIcon style={{margin:'5px',color:'white',fontSize:'35px'  }}  className={classes.large} />
        </NavLink>
        </div>
      </AppBar>
</div>

);
}