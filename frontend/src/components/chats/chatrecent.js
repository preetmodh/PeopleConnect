import React,{useState,useEffect,useRef } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import '../assests/App.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { CardHeader } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Chat from './chat';

const useStyles = makeStyles({
    root: {
      minWidth: 200,
      maxHeight:500,
      minHeight:500,
      maxWidth:300 ,
     
    },
    root1:{
      flexGrow: 1,
    }
  });



export default function ChatsRecent() {
    const classes = useStyles();
    const x=localStorage.getItem('token');
    const recentEndRef = useRef(null)
    const [recent, setRecent] = useState([]);
    const [currentuser, setCurrentuser] = useState();
    const [showchatid,setShowchatid] = useState(0);


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/chat/recent/`,{
              headers: { 
                  'Authorization': `token ${x}`,
                }
        })
        .then((res) => {
          console.log(res.data.recent)
          setRecent(res.data.recent)
          setCurrentuser(res.data.current_user);
        }, (error) => {console.log(error);})



        
    },[])//end useEffect



return(
    <div className={classes.root1} style={{
      maxHeight:600,
      marginTop:'5px',
      marginBottom:'15px',
      marginLeft:'500px',
      marginRight:'500px'
      }}>
      
      <Grid container spacing={3} >
      <Grid item xs={12} sm={6} >
        <div className={classes.root} style={{marginBottom:'15px',backgroundColor:'lightgrey'}}>
      <h3 style={{margin:'5px'}}>RECENT</h3>
      <Card className={classes.root} style={{
    overflow:'auto',
    marginBottom:'15px',}}>
     
    <CardContent style={{
        marginTop:'5px',
        }}>
      {recent.length!==0&& recent.map((recent)=>{
     return(
       <CardActionArea onClick={()=>{recent.sender===currentuser?setShowchatid(recent.receiver):setShowchatid(recent.sender)}}>
      <Paper style={{
        marginTop:'5px',
        backgroundColor:'#cae8fa',
        }}>
        <div style={{
        padding:'8px',
        fontSize:'18px',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        }}>{recent.sender===currentuser?recent.receivername:recent.sendername}
        </div>
        {recent.send_msg} :{recent.get_time_ago}
      </Paper>
      </CardActionArea>
     )
   })}
    </CardContent>
  </Card>
  </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          {showchatid===0?<h1>INBOX</h1>:<Chat id={showchatid} />}
        </Grid>
      </Grid>
    
    </div>
)



}