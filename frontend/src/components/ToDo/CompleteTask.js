import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import {  purple } from '@material-ui/core/colors'

const CompleteTask=(props)=>{
  const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
  
    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(purple[500]),
          backgroundColor: purple[300],
          '&:hover': {
            backgroundColor: purple[500],
          },
        },
      }))(Button);

    const task=props.props;
    
    
    const tok=localStorage.getItem('token');
    const [open, setOpen] = React.useState(false);
    const [CompleteAlertId, setCompleteAlertId] = React.useState(0);
    const handleClose = () => {
        setOpen(false);
        setCompleteAlertId(0);
      };
    

    const CompleteTask=()=>{

        Axios.put(`${BASE_URL_HTTP}/todo/${task.id}/`,
        {title:task.title,desc:task.desc,due_date:task.due_date,complete:true}
        ,{
            headers: {
            'Authorization': `token ${tok}`,
           
        }

          }).then(()=>{
            window.location.reload();
            console.log('hell');
            // task.complete=true;
          },
          (error)=>{console.log(error.response);
            console.log(error.request);
            console.log(error.message);alert('Confirm Task Unsuccessfull');})

    };
    
    

    return (<>


         
         <ColorButton
                            variant="contained"
                            
                            
                            startIcon={<DoneOutlineIcon />}
                            onClick={()=>{setOpen(true);setCompleteAlertId(task.id)}}
                            disabled={task.complete}
                        >
                            Complete
                        </ColorButton>
                        
            {open&& task.id==CompleteAlertId &&
                          
            
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Are you sure you completed it?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Task Title: {task.title}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={CompleteTask} color="primary" autoFocus>
                Complete
            </Button>
            </DialogActions>
        </Dialog>
            }
        </>);
}
export default CompleteTask;