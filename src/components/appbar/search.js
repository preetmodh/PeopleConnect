import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function Search() {
  const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
      
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const x=localStorage.getItem('token');
  const [data,setData]=useState();
  const [searchValue,setsearchValue]=useState();
  
  function search(value){
    setsearchValue(value)
    if (value.length>0){
      axios.get(`${BASE_URL_HTTP}/user/finduser/?search=${value}`,{
            headers: { 
                'Authorization': `token ${x}`,
              }
              })
              .then((res) => {
                console.log(res.data);
                setData(res.data)
              }, (error) => {console.log(error);})
    
    }
    else{
        setsearchValue('')
        setData('')
    }
    }
  return (
    <div className={classes.root}>
      <div>
      <Input
       ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          value={searchValue}
            onChange={(e) => {search(e.target.value)}}
           style={{ fontSize:20,margin:'18px',marginRight:'500px',minWidth:'30%' ,color:'white',}}></Input>
        
 
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal  style={{overflow:'auto',maxHeight:300}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList  id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {data&& data.map((user)=>{
                      return(
                          <NavLink to={`/profile/${user.user_name}`}  style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>

                            <MenuItem value={user.user_name} onClick={(e) => {setsearchValue(user.user_name);handleClose(e)}}>{user.user_name}</MenuItem>
                          </NavLink>
                      )
                  })}
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
            )}
            </Popper>
          </div>
        </div>
      );
    }