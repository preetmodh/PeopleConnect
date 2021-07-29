import React,{useState} from 'react';
import '../App.css';
import '../index.css';
import axios from 'axios';


import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
                    localStorage.setItem('email',response.data.email);
                    alert('logged in');
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
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={emailChange} value={email}
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
            onChange={passChange} value={password}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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