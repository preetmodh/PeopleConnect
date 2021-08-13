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
    minWidth: 450,
    maxHeight:450,
    minHeight:450,
    maxWidth:500 ,
    },
    root1: {
      minWidth: 150,
      maxHeight:450,
      minHeight:450,
      maxWidth:250 ,
      },
    root2:{
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
    const [sendername,setSendername] = useState();


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
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '30%',
      marginTop: '-50px',
      marginLeft: '-50px',
      display:'flex'
      }}>
      
      <div className={classes.root1} style={{marginBottom:'15px',border:'ridge',maxHeight:610}}>
      <h3 style={{margin:'5px',textAlign:'center'}}>RECENT</h3>
      <div className={classes.root1} style={{
        overflow:'auto',
        marginBottom:'10px',
        width:'10%',
    }}>
     
    <CardContent >
      {recent.length!==0&& recent.map((recent)=>{
     return(
      <CardActionArea onClick={()=>{
        recent.sender===currentuser?setShowchatid(recent.receiver):setShowchatid(recent.sender);
        recent.sender===currentuser?setSendername(recent.receivername):setSendername(recent.sendername)
        }}>
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
    <div ref={recentEndRef} />
  </div>
  <Container  maxWidth="xs" style={{position: 'relative',bottom:'25px'}}>
   <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="recent"
            label="Search here..."
            name="recent"
            
    />
    <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
    >
    GO
    </Button>
    </Container >
  </div>




  <div>
          {showchatid===0?<h1 style={{marginLeft:'20px'}}>INBOX</h1>:<Chat id={showchatid} name={sendername} />}
  </div>
    
    </div>
)



}