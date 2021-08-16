import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { blue } from "@material-ui/core/colors";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
      },
    followButton:{
        marginLeft:100,
    }
  }));
  


export default function AddPost (props){
    const x=localStorage.getItem('token')
    const classes = useStyles();
    
    const { onClose,  open } = props;

    const handleClose = () => {
      onClose();
    };
    
    const initialFormData = Object.freeze({
		title:'',
        caption:'',
        
        tags:[1],
	});

	const [postData, updateFormData] = useState(initialFormData);

    const[PostImage,setPostImage]=useState(null);
    const[PreviewImage,setPreviewImage]=useState('');
    const changeDetail=(event)=>{
        
        if(event.target.name=='Image'){
            console.log(event.target.files[0])
                setPreviewImage(URL.createObjectURL(event.target.files[0]));
               
               setPostImage(event.target.files[0])   
        }
        else{
               
                updateFormData({
                    ...postData,
                    [event.target.name]: event.target.value,
                });
                
           }  
    };
    const post=(e)=>{
        
        e.preventDefault();

        let formData = new FormData();
		formData.append('title', postData.title);
		formData.append('caption', postData.caption);
		formData.append('tags', postData.tags);
		
		formData.append('Image', PostImage);
        console.log(formData.getAll('Image'));
        axios.post(`http://127.0.0.1:8000/posts/profile_post/aa`,
            formData
        , {
            headers: {
              'Authorization': `token ${x}`,
              'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryGNvWKJmmcVAPkS3a',
              accept: 'application/json',
            },
           
          }).then((res)=>{
            console.log('donzo');
            console.log(res);
            window.location.reload();

        },(error)=>{console.log(error.message,error.response)})
    }
    return( 
        <>
        <Dialog onClose={handleClose}  open={open} style={{minWidth:'400px',minHeight:'40%'}}>
            <DialogTitle >Add Post</DialogTitle>
            

            <TextField
                    autoFocus margin="dense" id="title" label="title" type="text" name="title"
                    onChange={changeDetail} value={postData.title}
                    fullWidth required
                />
            <TextField
                    autoFocus margin="dense" id="caption" label="caption" type="text" name="caption"
                    onChange={changeDetail} value={postData.caption}
                    fullWidth required
                />
            <div>
                <input required accept="image/*"  name="Image" type="file" onChange={changeDetail}/>
            </div>
            <div>
                <img src={PreviewImage} style={{maxHeight:500,maxWidth:500}}/>
            </div>
            <div>
                <Button onClick={post}>Post</Button>
            </div>
        </Dialog>


    
        </>
    )
}