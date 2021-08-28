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
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import Newchat from './newchat';
import Chat from './chat';



const useStyles = makeStyles((theme) => ({
    root: {
    minWidth: 450,
    maxHeight:450,
    minHeight:450,
    maxWidth:500 ,
    },
    root1: {
      minWidth: 250,
      maxHeight:'85vh',
      minHeight:'50vh',
      maxWidth:'25vw' ,
      },
    root2:{
      flexGrow: 1,
    },
    
  
  }));



export default function ChatsRecent() {
    const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
    const BASE_URL_WS=process.env.REACT_APP_BASE_URL_WS;
    const classes = useStyles();
    const x=localStorage.getItem('token');
    const recentEndRef = useRef(null)
    const isseenref = React.createRef();
    isseenref.current = {};
    const [isSeen,setisSeen]=useState({});  
    const showchatid = useRef(0)
    const [sendername,setSendername] = useState();
    const [recent, setRecent] = useState([]);
    const [currentuser, setCurrentuser] = useState();
    const [searchuser, setSearchuser] = useState('')
    const [open, setOpen] = React.useState(false);
    // const [showchatid.current,setshowchatid.current] = useState(0);
    


    const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = (value) => {
    if ('id' in value){
      showchatid.current=value['id']
      setSendername(value['name'])
    }
      setOpen(false);
  };

    useEffect(() => { 
      axios.get(`${BASE_URL_HTTP}/chat/recent/`,{
        headers: { 
            'Authorization': `token ${x}`,
          }
          })
          .then((res) => {
            console.log(res.data);
            setRecent(res.data.recent)
            setCurrentuser(res.data.current_user);
            setisSeen(res.data.seen);
          }, (error) => {console.log(error);})

      const link = `${BASE_URL_WS}/ws/recent/?authorization=${x}` ;
          const chatSocket = new WebSocket(link);
          chatSocket.onmessage = function(e) {
          var data = JSON.parse(e.data);
          var user=data.user;
          data=data.value.recent_message;


          if(showchatid.current==data.sender|| data.sender==user){
            setisSeen((prevPersonInfo) => ({...prevPersonInfo, [data.room_name]: 1})) 
            Seen(data.room_name);
          }
          else{
            setisSeen((prevPersonInfo) => ({...prevPersonInfo, [data.room_name]: 0}))
          } 
          
          setRecent(oldArray=>{return oldArray.filter(function(prevVal){     
              return prevVal.room_name!=data.room_name
          })})
          setRecent(oldArray => [data,...oldArray]); 
        }

        
        chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
      };

      isseenref.current={name:"preet"}
       

        return () => {
         console.log(isseenref,"on dismountttttttttttttttttttt")
          chatSocket.close();
   
      }
    },[])//end useEffect

const Seen =(room_name) =>{
        axios.post(`${BASE_URL_HTTP}/chat/recent/`,
        {isSeen,room_name}
    , {
        headers: {
          'Authorization': `token ${x}`,
        },
       
      }).then((res)=>{
    },(error)=>{console.log(error.message,error.response)})

  }





return(
    <div style={{
      marginLeft: '15%',
      display:'flex',
      }}>
      
      <div className={classes.root1} style={{border:'ridge'}}>
      <h3 style={{margin:'5px',textAlign:'center'}}>RECENT</h3>
      <div style={{
        overflow:'auto',
        marginBottom:'10px',
        width:'100%',
        height:'85%',
    }}>
      
     
    <CardContent >
      {recent.length!==0&& recent.map((rec)=>{
     return(
       <>
       
      <CardActionArea onClick={()=>{
        rec.sender===currentuser?showchatid.current= (rec.receiver):showchatid.current=(rec.sender);
        rec.sender===currentuser?setSendername(rec.receivername):setSendername(rec.sendername)
        setisSeen((prevPersonInfo) => ({...prevPersonInfo, [rec.room_name]: 1}))

      Object.keys(isSeen).length === 0?isseenref.current={}:isseenref.current=isSeen 
      console.log(isseenref.current,"refffffffffffffffffffff")
      Seen(rec.room_name)
        }}>
        <Badge  variant="dot" color="secondary" badgeContent={ rec.sender==currentuser || isSeen[rec.room_name]==1?0:" "}>
          <Paper style={{
            marginTop:'5px',
            backgroundColor:'#cae8fa',
            width:'100%',
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
  <Container  maxWidth="xs" style={{position: 'relative',bottom:10}}>
    <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={()=>{setOpen(true)}}
            style={{marginTop:'4px'}}
    >
    New Chat 
    </Button>
    </Container >
  </div>

  {(open===true?<Newchat  open={open} onClose={handleClose}/>:<></>)}


  <div>
          {showchatid.current===0?<h1 style={{marginLeft:'20px'}}>INBOX</h1>:<Chat id={showchatid.current} name={sendername} />}
  </div>
    
    </div>
)



}
