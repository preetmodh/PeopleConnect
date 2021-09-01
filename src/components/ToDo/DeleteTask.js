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
import { red } from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
        
    button:{
        float:'right',
    },
    
  }));


const DeleteTask=(props)=>{
  const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
  let history = useHistory();
    const task=props.props;
    //delete button actions:
    const tok=localStorage.getItem('token');
    const [open, setOpen] = React.useState(false);
    const [deleteAlertId, setDeleteAlertId] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
        
      };
   
    const handleClose = () => {
        setOpen(false);
        setDeleteAlertId(0);
      };
    

    const DeleteTask=()=>{
        Axios.delete(`${BASE_URL_HTTP}/todo/${task.id}/`,{
            headers: {
            'Authorization': `token ${tok}`,
           
        }

          }).then(()=>{
            history.push('/todo');
          }
          ,(error)=>{console.log(error.message);
            console.log(error.response);
            console.log(error.request);
            alert('Delete Unsuccessfull');})
    };
    // const classes = useStyles();
    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(red[500]),
          backgroundColor: red[400],
          '&:hover': {
            backgroundColor: red[700],
          },
        },
      }))(Button);


    return (<>


         
         <ColorButton
            variant="contained"
            
            style={{marginLeft:'75px',marginRight:'10px'}}
            startIcon={<DeleteIcon />}
            onClick={()=>{setOpen(true);setDeleteAlertId(task.id)}}
        >
              {window.innerWidth > 700 && 'Delete'}
            </ColorButton>
            {open&& task.id==deleteAlertId &&
                          
            
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Task Title: {task.title}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={DeleteTask} color="primary" autoFocus>
                Delete
            </Button>
            </DialogActions>
        </Dialog>
            }
        </>);
}
export default DeleteTask;