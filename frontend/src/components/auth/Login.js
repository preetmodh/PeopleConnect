<<<<<<< HEAD
import React,{useState} from 'react';
import './assests/App.css';
import '../index.css';
import axios from 'axios';


import { makeStyles } from '@material-ui/core/styles';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
<<<<<<< HEAD
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const Login=()=>{
    function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    const useStyles = makeStyles((theme) => ({
        body: {
            minHeight: '100vh',
            display: 'flex',
            
            fontWeight: '400',
            // font-family: sans-serif,
            background:'#12c2e9',  /* fallback for old browsers */
            background: '-webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9)',  /* Chrome 10-25, Safari 5.1-6 */
            background: 'linear-gradient(to right, #f64f59, #c471ed, #12c2e9)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            justifyContent:'center',
          },
          
        //   body, html, .App, #root, .outer {
        //     width: 100%,
        //     height: 100%,
        //   }
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
          avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          },
          form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
          },
          submit: {
            margin: theme.spacing(3, 0, 2),
          },
      }));
      const classes = useStyles();

    const loginStyle={marginLeft:'50%'};
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const emailChange=(event)=>{
        setEmail(event.target.value);
    };
    const passChange=(event)=>{
        setPassword(event.target.value);
    };

    const postData=()=>{
        axios.post('http://127.0.0.1:8000/user/token',{
            // email:email,
            username:email,
            password:'AAA@#123',
            // password:password,
            headers: { 
                xsrfCookieName: 'XSRF-TOKEN',
                xsrfHeaderName: 'X-XSRF-TOKEN',
              }

        }
        
            ).then((response)=>{
                console.log(response.data);
                if(response.data){
                    console.log(response.data);
                    localStorage.setItem('token',response.data.token);
                    window.location.replace('/home');
                    
                }
                else{
                    alert('Invalid credentials');    
                }
                
            },(error)=>{
                console.log(error.response);
                console.log(error.request);
                console.log(error.message);
                alert('Invalid credentials');
            })
    };
    return (
        <>
        {/* <div style={loginStyle}>
            <label htmlFor="email">Email:</label>
            <input type='email' name='email' label='email' onChange={emailChange} value={email} ></input>
            <br/>
            <label htmlFor="password">Password:</label>
            <input type='password' name='password' label='Password' onChange={passChange} value={password} ></input>
            <br/><br/>
            <Button color="primary" onClick={postData} >Submit</Button>

            
        </div> */}
        <div className={classes.body}>
        <div className="outer">
            <div className="inner">

                
                 
<Container component="main" maxWidth="xs">
=======
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { ReactComponent as Svg } from '../assests/svg/PeopleConnect2.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  svg:{
    position:'relative',
    minHeight:300,
    minWidth:300,
    maxWidth: '30%',
     maxHeight: '30%',
     marginTop:80,
     marginLeft:80
  },
  container:{
    position:'relative',
    maxWidth: '30%',
     maxHeight: '30%',
     marginTop:40,
     marginLeft:80
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));





export default function Login() {
  const token =localStorage.getItem('token');
  const [condition, setCondition] = useState();
  var l =0
  if(token===null){
    l=0
  }
  else{
    l=token.length
  }
  
  useEffect(() =>{
    
   if (l===0){
    setCondition(false)
   }
  else{
    setCondition(true)
  }
  if (condition){
      window.location.replace('/home')  
  } }, [token, condition, l]); 
  



  const classes = useStyles();
  const[email,setEmail]=useState('');
  const [password, setPass] = useState('');

  

  function signIn() {
    

    axios.post('http://127.0.0.1:8000/user/token', {
        username: email,
        password:password,
        headers: { 
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
        }
      })
      .then((response) => {
        if (response.data){
          localStorage.setItem('token', response.data.token);
             window.location.replace('/home') 
        }
        else{
            alert("Invalid username or password")
        }
      },(error) => {
        if (error.response){

          alert("Invalid username or password")
          
          }else if(error.request){
          
            alert("Invalid username or password")
          
          }else if(error.message){
          
            alert("Invalid username or password")
          
          }
      });

}

  return (
    <div  style={{display:'flex'}} >
    <Svg className={classes.svg}/>
    <Container className={classes.container} component="main" maxWidth="xs" >
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
<<<<<<< HEAD
        
=======
        <form className={classes.form} noValidate>
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
<<<<<<< HEAD
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={emailChange} value={email}
=======
            label="Email"
            name="email"
            autoFocus
            onChange={event => setEmail(event.target.value)}
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
<<<<<<< HEAD
            onChange={passChange} value={password}
          />
         
          <Button
            type="submit"
=======
            onChange={event => setPass(event.target.value)}
          />
        
          <Button
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
<<<<<<< HEAD
            onClick={postData}
          >
            Sign In
          </Button>
         
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
      </div>
     
    </Container>
        </div>
    </div>
</div>

        </>
    );

};

export default Login;
=======
            onClick={()=>signIn()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}
>>>>>>> dd49ae9ab51db3c47598ea51a373a979fccb53c1
