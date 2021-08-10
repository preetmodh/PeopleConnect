import React, { useState,useEffect } from "react";
import axios from 'axios';
import './assests/App.css';
export default function Notification(){

    const x=localStorage.getItem('token');

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://127.0.0.1:8000/notifications/`, {
                headers: {
                    'Authorization': `token ${x}`,
                }
                }).then((res) => {
                    console.log(res.data)
                    setList(res.data)
                }).catch((error) => {
                    console.log(error);
            }
            )
        }, 1000);
      }, []);
      
    

    



    
    const [list, setList] = useState([]);

    
    // const x='0526653f8ddcdb59b0c70684136a3d6bc8c79e2c';

   

      const array=[]

      for (var i=0;i<list.length;i++){
        var title=''
        if (list[i]['notification_type']==1){
            title=list[i]['get_sendername'] + ' Liked your post.'
        }
        else if (list[i]['notification_type']==2){
            title=list[i]['get_sendername'] + ' Commented on your post.'
        }
        else{
            title=list[i]['get_sendername'] + ' Followed you.'
        }

            array.push(
                <div  class="posts" style={{backgroundColor:list[i]['is_seen'] ? '#6cd1a4':'#9dfcbe'}} >
                <div class="element" >
                        <span >{title}</span>
                        <br />
                        <span >{list[i]['get_date']}</span>
                </div>
                </div>
            )

      }

  


    return(
        <div style={{marginTop:'5px',marginLeft:'100px',marginRight:'450px'}}>
        {array}
        
        </div>
        
    )
}

