import React, { useState,useEffect } from "react";
import axios from 'axios';
import './assests/App.css';
import { NavLink } from "react-router-dom";
export default function Notification(){

    const x=localStorage.getItem('token');

    useEffect(() => {
        setTimeout(() => {
            axios.get(`https://peopletoconnectdjango.herokuapp.com/notifications/`, {
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

      for (var i=0;i<list.length;i++){
        var title=''
        if (list[i]['notification_type']==1){
            title= ' Liked your post.'
        }
        else if (list[i]['notification_type']==2){
            title= ' Commented on your post.'
        }
        else{
            title= ' Followed you.'
        }

            array.push(
                <NavLink to={`/profile/${list[i]['get_sendername']}`}  style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>
                    <div  class="posts" style={{backgroundColor:list[i]['is_seen'] ? '#6cd1a4':'#9dfcbe'}} >
                    <div class="element" >
                        <span >{list[i]['get_sendername']}  {title}</span>
                        <br />
                        <span >{list[i]['get_date']}</span>
                    </div>
                    </div>
                </NavLink>
            )

      }

  


    return(
        <div style={{marginTop:'5px',marginLeft:'100px',marginRight:'450px'}}>
        {array}
        
        </div>
        
    )
}

