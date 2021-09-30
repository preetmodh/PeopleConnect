import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

// components 
import CompletedTask from './CompletedTask';
import PendingTask from './PendingTask';
import CreateTask from './CreateTask';
import ShowTask from './ShowTask';
import './App.css';

const useStyles = makeStyles((theme) => ({
  styleh1:{
            textAlign:'center',fontFamily:'Roboto',
          }
}));

export default function ContainedButtons() {
  
  const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;
  const classes = useStyles();
  const [showPage,setShowPage]=useState(0);
  
  
  

  const[taskList,settaskList]=useState([]);
  const x=localStorage.getItem('token');
  useEffect(()=>{
      axios.get(`${BASE_URL_HTTP}/todo/`,{
          headers: {
              'Authorization': `token ${x}`,
            }
      }).then((res)=>{
          settaskList(res.data);

          
      },(error)=>{
          console.log(error.response);
          console.log(error.request);
          console.log(error.message);

      })
  },[]);

  const complete = (id) => {
    settaskList(taskList.map((task)=>{
      if(task.id==id)task.complete=true;
      return task;
    }))
    setShowPage(0);
};
  

  return (
    <div className="todo">
    <div>
    <br/>
    <div style={{
        display:'grid',
        alignContent:'space-evenly',
        gridTemplateColumns:'auto auto auto auto ',
        }}>
      <Button style={{fontSize:'15px',marginLeft:'10px',padding:'5px'}}onClick={()=>{setShowPage(0)}} variant="contained" color="secondary">All Tasks</Button>
      <Button style={{fontSize:'14px',marginLeft:'10px',padding:'5px'}}onClick={()=>{setShowPage(1)}} variant="contained" color="primary">
        Create Task
      </Button>
      <Button style={{fontSize:'14px',marginLeft:'10px',padding:'5px'}}onClick={()=>{setShowPage(2)}} variant="contained" color="secondary">
        Pending Task
      </Button>
      <Button style={{fontSize:'12px',marginLeft:'10px',padding:'5px'}}onClick={()=>{setShowPage(3)}} variant="contained" color="primary" >
      Completed Task
      </Button>
      </div>
     
      
      <br/>
      {showPage==0&&<ShowTask props={taskList}   />}
      {showPage==1&&<CreateTask/>}
      {showPage==2&&<PendingTask props={taskList}/>}
      {showPage==3&&<CompletedTask props={taskList} parentCompleteFunction={complete} />}
    </div>
    </div>
  );
}
