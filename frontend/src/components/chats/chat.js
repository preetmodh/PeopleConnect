import React,{useState,useEffect,useRef } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import '../assests/App.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxHeight:600,
   // maxWidth:800 ,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function Chat() {
  const classes = useStyles();
  const messagesEndRef = useRef(null)
  const {id}  = useParams();
  const [messages, setMessages] = useState([]);
  const [currentuser, setCurrentuser] = useState();
  const [otheruser, setOtheruser] = useState();
  const [message,setMessage] = useState('');





  const x=localStorage.getItem('token');
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/chat/${id}/`,{
            headers: { 
                'Authorization': `token ${x}`,
              }





      })
      .then((res) => {
        if (res.data.current_user===res.data.messages[0].sender){
            setOtheruser(res.data.messages[0].receiver)
          }
          else{
            setOtheruser(res.data.messages[0].sender)
          }
        console.log(res.data)
        setMessages(res.data.messages);
        setCurrentuser(res.data.current_user);
      }, (error) => {console.log(error);})



        const link = `ws://127.0.0.1:8000/ws/chat/2/?authorization=${x}` ;
        const chatSocket = new WebSocket(link);
        chatSocket.close()
        console.log(chatSocket.readyState,"lllllllll")
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
        console.log(messages)


        chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
      };
}, []); 
  
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
const sendMessage = () => {
  const body = {
    sender: currentuser,
    receiver: otheruser,
    message:message,
    
};
  axios.post(`http://127.0.0.1:8000/chat/${otheruser}/`, body,{
    
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
  <Typography className={classes.title} color="textSecondary" gutterBottom>
      {currentuser}
  </Typography>
  <Card className={classes.root} style={{
    overflow:'auto',
    marginTop:'5px',
    marginBottom:'15px',
    marginLeft:'500px',
    marginRight:'500px',}}>
    <CardContent>
      {messages.length!==0&& messages.map((msg)=>{
     return(
       <>
      <div style={{
        marginTop:'5px',
        backgroundColor:msg.sender===currentuser ? '#6cd1a4':'#9dfcbe',
        float:msg.sender===currentuser ? 'right':'left',
        }}>
        <div style={{
        padding:'4px',
        whitespace: 'pre',
        fontSize:'24px'
        }}>{msg.message}
        </div>
        {msg.sendername}: {msg.get_time_ago}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </>
     )
   })}


    </CardContent>
    <Container ref={messagesEndRef} maxWidth="xs" style={{position: 'relative',bottom:'30px'}}>
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
    </Container>
  </Card>
  </>
);


   }
    




