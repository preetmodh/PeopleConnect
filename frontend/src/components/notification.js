import React, { useState } from "react";


export default function Notification(){
    const x=localStorage.getItem('token');
    // const x='0526653f8ddcdb59b0c70684136a3d6bc8c79e2c';

    const [count,setcount]=useState(0);
    const [message,setmessage]=useState('hi');

    const link = `ws://127.0.0.1:8000/ws/noticount/?authorization=${x}` ;
    console.log(link)
    const chatSocket = new WebSocket(
        link
    );

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        setcount(data.value.count)
        setmessage(data.value.title)
        console.log(e.data,count,message)
    }

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };


    return(
        <div>
        <h1 style={{marginTop:'5px',marginLeft:'90px'}}> noticount : {count} </h1>
        <h1 style={{marginTop:'5px',marginLeft:'90px'}}>  {message} </h1>
        </div>
        
    )
}

