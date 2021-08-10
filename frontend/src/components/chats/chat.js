import React,{useState,useEffect } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import '../assests/App.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';





export default function Chat() {
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
        };
        
        chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
      };
}, []); 
  

const sendMessage = () => {


  const body = {
    sender: currentuser,
    receiver: otheruser,
    message:message,
    
};
console.log(body)
  axios.post(`http://127.0.0.1:8000/chat/${otheruser}/`, body,{
    
      headers: { 
          'Authorization': `token ${x}`,
        }
})
.then((response) => {
  //console.log(response,"for post");
  setMessage('')
}, (error) => {console.log(error);})
}

const MessageChange=(event)=>{
  setMessage(event.target.value);
};







return(
  <div style={{
    marginTop:'5px'
    }}>
      <h1>{currentuser}</h1>
      
   {messages.length!==0&& messages.map((msg)=>{
     return(
      <div style={{
        marginTop:'5px',
        marginLeft:'500px',
        marginRight:'500px',
        backgroundColor:msg.sender===currentuser ? '#6cd1a4':'#9dfcbe',
        float:msg.sender===currentuser ? 'right':'left',
        borderradius: '25px',
        fontsize: '28px',
        }}>
        <h1 style={{
        marginTop:'5px',
        marginLeft:'5px',
        marginRight:'5px',
        fontsize: '28px'
        }}>{msg.message}
        </h1>
        <span>{msg.sendername}</span>
      </div>
      )
   })}
   <Container  maxWidth="xs" style={{marginBottom:'20px'}}>
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
    </div>
)
   }
