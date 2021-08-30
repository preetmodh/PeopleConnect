import React , { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import Home from './components/appbar/home';
import Notification from './components/notification';
import ChatsRecent from './components/chats/chatrecent';
import Post from './components/Post/post';
import People from './components/people';
import Profile from './components/user/profile';
import SpecificPost from './components/Post/specific_post';
import Todo from './components/ToDo/Todo';
import MobileHome from './components/appbar/mobilehome';
export class App2 extends Component{
   
   render(){
    return (
    <div>    

        <BrowserRouter basename="/">
        
            <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path="/logout" component={ Logout }></Route>
            
             
            
                <div>
                {window.innerWidth > 1000 ?
                    <Home >
                    <div style={{margin:'auto'}}>
                        <Route exact path='/notifications'  render={() => <Notification   key={uuidv4()}/>} />
                        <Route exact path='/messages' component={ChatsRecent} />
                        <Route exact path='/peoples' render={() => <People   key={uuidv4()}/>}/>
                        <Route exact path='/profile/:username' render={() => <Profile   key={uuidv4()}/>}   />
                        <Route exact path='/home' component={Post} />
                        <Route exact path='/post/:id' component={SpecificPost} />
                        <Route exact path='/todo' render={() => <Todo   key={uuidv4()}/> }/>
                        </div>
                    </Home>:
                    
                    <MobileHome>
                        <Route exact path='/notifications'  render={() => <Notification   key={uuidv4()}/>} />
                        <Route exact path='/messages' component={ChatsRecent} />
                        <Route exact path='/peoples' render={() => <People   key={uuidv4()}/>}/>
                        <Route exact path='/profile/:username' render={() => <Profile   key={uuidv4()}/>}   />
                        <Route exact path='/home' component={Post} />
                        <Route exact path='/post/:id' component={SpecificPost} />
                        <Route exact path='/todo' render={() => <Todo   key={uuidv4()}/> }/>
                    </MobileHome>
                }

                </div>
            </Switch>
        </BrowserRouter>
    </div>
    )
   }
};

export default App2;