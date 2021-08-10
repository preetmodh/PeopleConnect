import React,{useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './assests/App.css';
import '../index.css';
import axios from 'axios';

export default function Messages() {

  const [messages, setMessages] = useState([]);
  const [sender, seSender] = useState();
  const y=localStorage.getItem('username');
  console.log(y)

    useEffect(() => {
        const x=localStorage.getItem('token');
        const link = `ws://127.0.0.1:8000/ws/chat/2/?authorization=${x}` ;
        const chatSocket = new WebSocket(link);
        chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        //setMessages(data.value.messages);
        if(data.value.messages.length>0){
          setMessages(data.value.messages);
        }
        else
        {
          setMessages(prevState => ([
            ...prevState,
            data.value.messages, 
          ])); 
        }
        
        

        //setMessages(messages => [...messages, data.value.messages])
        // setMessages({...messages,data.value.messages}) 
        console.log(messages) 
        
        }; 
        const body = {
            sender: 1,
            receiver: 2,
            message: "THIS IS WORKING againnnnnn123",
            
      };
      //   axios.post('http://127.0.0.1:8000/chat/2/', body,{
            
      //       headers: { 
      //           'Authorization': `token ${x}`,
      //         }
      // })
      // .then((response) => {
      //   //console.log(response,"for post");
      // }, (error) => {console.log(error);})
        chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
      };
}, []); 
  

return(
  <>
   {messages.length!==0&& messages.map((msg)=>{
     return(
      <div style={{
        marginTop:'5px',
        marginLeft:'500px',
        marginRight:'500px',
        backgroundColor:msg.get_sendername==y ? '#6cd1a4':'#9dfcbe',
        float:msg.get_sendername==y ? 'right':'left',
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
      </div>
      

      )
   })}
    </>
)
   }
