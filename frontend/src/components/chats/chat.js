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
    minWidth: 500,
    maxHeight:600,
    // minHeight:500,
   // maxWidth:800 ,
  },

});


export default function Chat(params) {
  console.log(params);
  const id= params.id;
  console.log(id);
  const classes = useStyles();
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([]);
  const [currentuser, setCurrentuser] = useState();
  const [message,setMessage] = useState('');
  const x=localStorage.getItem('token');

  
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/chat/inbox/${id}/`,{
            headers: { 
                'Authorization': `token ${x}`,
              }
      })
      .then((res) => {
        console.log(res.data)
        setMessages(res.data.messages);
        setCurrentuser(res.data.current_user);
      }, (error) => {console.log(error);})



        const link = `ws://127.0.0.1:8000/ws/chat/${id}/?authorization=${x}` ;
        const chatSocket = new WebSocket(link);
        chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        console.log(data)
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
}, []); 
  
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
const sendMessage = () => {
  const body = {
    sender: currentuser,
    receiver: id,
    message:message,
    
};
  axios.post(`http://127.0.0.1:8000/chat/inbox/${id}/`, body,{
    
      headers: { 
          'Authorization': `token ${x}`,
        }
})
.then((response) => {
  console.log(response,"for post");
  setMessage('')
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}, (error) => {console.log(error);})
}

const MessageChange=(event)=>{
  setMessage(event.target.value);
};




return (
<>

  <Card className={classes.root} style={{
    overflow:'auto',
    marginTop:'5px',
    marginBottom:'15px',
    marginRight:'100px',}}>
      
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
        fontSize:'18px',
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
    <Container  maxWidth="xs" style={{position: 'relative',bottom:'10px'}}>
   <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="type here"
            name="message"
            autoComplete="email"
            autoFocus
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
    <div ref={messagesEndRef} />
  </Card >
  
  </>
);


   }
    




