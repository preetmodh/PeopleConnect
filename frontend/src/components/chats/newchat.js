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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import { CardHeader, TextField } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';



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

export default function Newchat(props){
    const x=localStorage.getItem('token')
    const classes = useStyles();
    const [searchuser,setSearchuser] = useState('');
    const { onClose, selectedValue, open } = props;
    const [data, setData] = useState([]);
    const handleClose = (value) => {
     onClose(value);
    };
  
function finduser(value){
        setSearchuser(value)
        if (value.length>0){
          axios.get(`http://127.0.0.1:8000/user/finduser/?search=${value}`,{
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
            setSearchuser('')
            setData('')
        }
        }
    return(
        <>
        <Dialog onClose={()=>{handleClose({})}}  open={open} style={{maxHeight:400,margin:'auto'}}>
        <TextField  
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="new"
            label="New msg"
            name="recent"
            value={searchuser}
            onChange={(e) => {finduser(e.target.value)}} 
            
    />
    <Card style={{overflow:'auto'}}>
      {data.length==0?'search for valid user':data.map((value)=>{
     return(
       <>

      <CardActionArea onClick={()=>{handleClose({'id':value.id,'name':value.user_name})}}>
          <Paper style={{
            backgroundColor:'#cae8fa',
            width:'100%',
            height:'100%'
            }}>
                <h1 style={{margin:'5px',textAlign:'center'}}>{value.user_name}</h1>
          </Paper>
      </CardActionArea>
      </>
     )
   })}
   </Card>
    </Dialog>
        </>
    )
}