import React, { useState,useEffect } from "react";
import axios from 'axios';
import './assests/App.css';
import { NavLink } from "react-router-dom";
export default function Notification(){

    const x=localStorage.getItem('token');
    const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;

    useEffect(() => {
        setTimeout(() => {
            axios.get(`${BASE_URL_HTTP}/notifications/`, {
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

    
    

   

      const array=[]
      var url =''
      for (var i=0;i<list.length;i++){
        var title=''
        if (list[i]['notification_type']==1){
            title= ' Liked your post.'
            url='/post/'+list[i]['post']
        }
        else if (list[i]['notification_type']==2){
            title= ' Commented on your post.'
            url='/post/'+list[i]['post']
        }
        else{
            title= ' Followed you.'
            url=`/profile/${list[i]['get_sendername']}`
        }
        

            array.push(
                <NavLink to={url}  style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>
                    <div  class="notification" style={{backgroundColor:list[i]['is_seen'] ? '#6cd1a4':'#9dfcbe'}} >
                    <div class="element" >
                        <span >{list[i]['get_sendername']}  {title}</span>
                        <span class="subelement">{list[i]['get_time_ago']}</span>
                    </div>
                    </div>
                </NavLink>
            )

      }

  


    return(
        <div style={{marginTop:'5px'}}>
        {array}
        
        </div>
        
    )
}

