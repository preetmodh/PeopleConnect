/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import '../index.css';
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
import { Input } from '@material-ui/core';

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
  



export default function Home() {
const classes = useStyles();
const theme = useTheme();


const [iconid,setid]=useState();
const [open, setOpen] = useState(false);
const [notiCount, setnotiCount] = useState(0);
const [messageCount, setmessageCount] = useState(0);

const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};
const icons = [
  HomeIcon,
  PeopleIcon,
  MessageIcon,
  NotificationsIcon,
  AccountCircleIcon,
  SaveIcon,
  SettingsIcon,
  ExitToAppIcon,
];

useEffect(() => {
  const x=localStorage.getItem('token');
  const link = `ws://127.0.0.1:8000/ws/noticount/?authorization=${x}` ;
  const chatSocket = new WebSocket(link);
  chatSocket.onmessage = function(e) {
  var data = JSON.parse(e.data);
  setnotiCount(data.value.count)
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
<IconButton
  color="inherit"
  aria-label="open drawer"
  onClick={handleDrawerOpen}
  edge="start"
  className={clsx(classes.menuButton, {
    [classes.hide]: open,
  })}
>
  <MenuIcon />
</IconButton>

<Box display='flex' flexGrow={1} style={{marginRight:'20px'}}>
        <Avatar style={{margin:'15px' }} alt="Remy Sharp" src="https://i.pinimg.com/originals/2f/e0/6c/2fe06c3acec7d5a78c1706ad7a96a821.jpg" />
        <h8 style={{ fontSize: 18,marginTop:'25px',whitespace: 'nowrap',marginRight:'10px'}}>Preet Modh</h8>
</Box>
<Box display='flex'>
      <h8 style={{ fontSize: 20,marginTop:'23px' ,marginRight:'3px'}}>Search</h8>
      <Input style={{ fontSize:20,margin:'18px',marginRight:'500px',color:'white', }} label="Email Address"></Input>
      <Button style={{ fontSize:15,margin:'15px',color:'white' }}>Logout</Button>
</Box>
</Toolbar>
</AppBar>
<Drawer
variant="permanent"
className={clsx(classes.drawer, {
[classes.drawerOpen]: open,
[classes.drawerClose]: !open,
})}
classes={{
paper: clsx({
  [classes.drawerOpen]: open,
  [classes.drawerClose]: !open,
}),
}}
>
<div className={classes.toolbar}>
<IconButton onClick={handleDrawerClose}>
  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
</IconButton>
</div>
<Divider  style={{ marginTop:'7px'}}/>
<List>
{['Home','Peoples','Messages','Notifications','Profile','Saved','Settings','Logout',].map((iconnames, idx) => {
const Icon = icons[idx];
return (
<NavLink to={`${iconnames.toLowerCase()}`} activeClassName="active-link" style={{ textDecoration: 'none',cursor:'pointer'}} activeClassName="selected">
<div onClick={()=>{changeColor(idx)}} >
<Tooltip title={<h3>{iconnames}</h3>}  placement="right">
  <ListItem key={iconnames}>
    <ListItemIcon>
      {idx<4? <Badge badgeContent={idx===3?notiCount:0} color="secondary">
        <Icon style={{color:iconid===idx?'black':'#6b6b6b'}} />
      </Badge>: <Icon style={{color:iconid===idx?'black':'#6b6b6b'}} />}
      <ListItemText primary={iconnames} style={{marginLeft:'35px' , color:iconid===idx?'black':'#6b6b6b' }}/>
    </ListItemIcon>
</ListItem>
</Tooltip>
</div>
{idx===3?<Divider />:<></>}
</NavLink>
)
})}
</List>
</Drawer>


<main className={classes.content}>
<div className={classes.toolbar} />
</main>
</div>
);
}