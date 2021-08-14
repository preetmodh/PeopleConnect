import React,{useState,useEffect,useRef } from 'react';
import { NavLink,useParams } from 'react-router-dom';
//import '../assests/App.css';
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

import clsx from 'clsx';

import Badge from '@material-ui/core/Badge';



const useStyles = makeStyles((theme) => ({
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
    },
    
  
  }));



export default function ChatsRecent() {
    const classes = useStyles();
    const x=localStorage.getItem('token');
    const recentEndRef = useRef(null)
    const isseenref = React.createRef();
    const [isSeen,setisSeen]=useState({});  
    const showchatid = useRef(0)
    const [recent, setRecent] = useState([]);
    const [currentuser, setCurrentuser] = useState();
    // const [showchatid.current,setshowchatid.current] = useState(0);
    
    const [sendername,setSendername] = useState();


    useEffect(() => { 
      axios.get(`http://127.0.0.1:8000/chat/recent/`,{
        headers: { 
            'Authorization': `token ${x}`,
          }
          })
          .then((res) => {
            console.log(res.data);
            console.log(res.data.recent);
            setRecent(res.data.recent)
            setCurrentuser(res.data.current_user);
            setisSeen(res.data.seen);
            isseenref.current=res.data.seen
          }, (error) => {console.log(error);})

      const link = `ws://127.0.0.1:8000/ws/recent/?authorization=${x}` ;
          const chatSocket = new WebSocket(link);
          chatSocket.onmessage = function(e) {
          var data = JSON.parse(e.data);
          var user=data.user;
          data=data.value.recent_message;

          console.log(showchatid.current,data.sender,user);

          if(showchatid.current==data.sender|| data.sender==user){
            setisSeen((prevPersonInfo) => ({...prevPersonInfo, [data.room_name]: 1})) 
            isseenref.current=(prevPersonInfo) => ({...prevPersonInfo, [data.room_name]: 1})
          }
          else{
            setisSeen((prevPersonInfo) => ({...prevPersonInfo, [data.room_name]: 0}))
            isseenref.current=(prevPersonInfo) => ({...prevPersonInfo, [data.room_name]: 0})
          } 
          
          setRecent(oldArray=>{return oldArray.filter(function(prevVal){     
              return prevVal.room_name!=data.room_name
          })})
          setRecent(oldArray => [data,...oldArray]); 
        }

        
        chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
      };

      
       

        return () => {
          console.log(isseenref.current)
          axios.post(`http://127.0.0.1:8000/chat/recent/`,
          isseenref.current
      , {
          headers: {
            'Authorization': `token ${x}`,
          },
         
        }).then((res)=>{
          console.log(res);

      },(error)=>{console.log(error.message,error.response)})
        
          




          chatSocket.close();
   
      }

        
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
      {recent.length!==0&& recent.map((rec)=>{
     return(
       <>
       
      <CardActionArea onClick={()=>{
        rec.sender===currentuser?showchatid.current= (rec.receiver):showchatid.current=(rec.sender);
        rec.sender===currentuser?setSendername(rec.receivername):setSendername(rec.sendername)
        
            setisSeen((prevPersonInfo) => ({...prevPersonInfo, [rec.room_name]: 1}))
            isseenref.current=(prevPersonInfo) => ({...prevPersonInfo, [rec.room_name]: 1})
        
        }}>
        <Badge  variant="dot" color="secondary" badgeContent={ rec.sender!=currentuser||isSeen[rec.room_name]==1?0:" "}>
          <Paper style={{
            marginTop:'5px',
            backgroundColor:'#cae8fa',
            }}>
            <div style={{
            padding:'8px',
            fontSize:'18px',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            }}>{rec.sender===currentuser?rec.receivername:rec.sendername}
            </div>
            {rec.send_msg} :{rec.get_time_ago}
          </Paper>
      </Badge>
      </CardActionArea>
      </>
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
          {showchatid.current===0?<h1 style={{marginLeft:'20px'}}>INBOX</h1>:<div id={showchatid.current} name={sendername} />}
  </div>
    
    </div>
)



}