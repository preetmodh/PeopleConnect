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
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  root: {
    minWidth: 450,
    maxHeight:450,
    minHeight:450,
    maxWidth:500 ,
  },

});


export default function Chat(params) {
  
  const id= params.id;
  const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
  const BASE_URL_WS=process.env.REACT_APP_BASE_URL_WS;
  const classes = useStyles();
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([]);
  const [currentuser, setCurrentuser] = useState();
  const [message,setMessage] = useState('');
  const x=localStorage.getItem('token');

  
    useEffect(() => {
      axios.get(`${BASE_URL_HTTP}/chat/inbox/${id}/`,{
            headers: { 
                'Authorization': `token ${x}`,
              }
      })
      .then((res) => {
        setMessages(res.data.messages);
        setCurrentuser(res.data.current_user);
      }, (error) => {console.log(error);})



        const link = `${BASE_URL_WS}/ws/chat/${id}/?authorization=${x}` ;
        const chatSocket = new WebSocket(link);
        chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        //setMessages(data.value.messages);
        if(data.value.messages.length>0){
        }
        else
        {
          setMessages(prevState => ([
            ...prevState,
            data.value.messages, 
          ]));
        }
        }

        
        chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
      };

      return () => {
        chatSocket.close();
    }
}, [params.id]); 
  
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
const sendMessage = () => {
  const body = {
    sender: currentuser,
    receiver: id,
    message:message,
    
};
  axios.post(`${BASE_URL_HTTP}/chat/inbox/${id}/`, body,{
    
      headers: { 
          'Authorization': `token ${x}`,
        }
})
.then((response) => {
  setMessage('')
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}, (error) => {console.log(error);})
}

const MessageChange=(event)=>{
  setMessage(event.target.value);
};




return (
<div className={classes.root}  style={{border:'ridge',maxHeight:'85vh',maxWidth:'50vw'}}>
  <NavLink to={`/profile/${params.name}`}  style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>
      <h2 style={{margin:'5px'}}>{params.name}</h2>
  </NavLink>
  
  <div style={{
    overflow:'auto',
    marginBottom:'20px',
    height:'60vh',
    width:'100%',
    }}>
      
      
    <CardContent>
    
      {messages.length!==0&& messages.map((msg)=>{
     return(
       <>
      <Paper style={{
        marginTop:'5px',
        backgroundColor:msg.sender===currentuser ? '#bcd4e3':'#cae8fa',
        position:'relative',
        right:msg.sender===currentuser ? '0%':'50%',
        left:msg.sender===currentuser ? '50%':'0%',
        maxWidth:'51%',
        }}>
        <div style={{
        padding:'4px',
        fontSize:'14px',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        }}>{msg.message}
        </div>
        {msg.sendername}: {msg.get_time_ago}
      </Paper>
      </>
     )
   })}


    </CardContent>
    
    <div ref={messagesEndRef} />
    
  </div >
  <Container  maxWidth="xs" style={{position: 'relative',bottom:'35px'}}>
   <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="type here"
            name="message"
            autoComplete="email"
            onChange={MessageChange} value={message}
    />
    <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={sendMessage}
    >
    GO
    </Button>
    </Container >
  
  </div>
);


   }
    




