import React,{useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import '../index.css';
import axios from 'axios';

export default function Chat() {



    useEffect(() => {
        const x=localStorage.getItem('token');
        const link = `ws://127.0.0.1:8000/ws/noticount/?authorization=${x}` ;
        const chatSocket = new WebSocket(link);
        chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        console.log(data);
        };
        const body = {
            sender: 1,
            receiver: 2,
            message: "THIS IS MESSAGE TESTING 33333",
            
      };
        axios.post('http://127.0.0.1:8000/chat/register/2', body,{
            
            headers: { 
                'Authorization': `token ${x}`,
              }
      })
      .then((response) => {
        console.log(response,"for post");
      }, (error) => {console.log(error);})
        chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
      };
}, []); 

return(
    <h1 style={{marginTop:'5px',marginLeft:'90px'}}>MESSAGES</h1>
)

}

