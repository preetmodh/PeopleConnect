import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home';
import Notification from './components/notification';
import Messages from './components/messages';
import Post from './components/post';
import People from './components/people';
const App2=()=>{
    return (
    <div>    
        <BrowserRouter>
            <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
            
            
            
                <div>
                        <Home />
                
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/notifications' component={Notification} />
                    <Route exact path='/messages' component={Messages} />
                    <Route exact path='/peoples' component={People} />
                    <Route exact path='/home' component={Post} />
                </div>
            </Switch>
            
        </BrowserRouter>
    </div>
    )
};

export default App2;