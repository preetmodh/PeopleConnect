import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
const App2=()=>{
    return (
        <>
            
            <BrowserRouter>
            
                <Switch>
                    {/* <Route exact path='/' component={Singup} /> */}
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                  
                </Switch>
            </BrowserRouter>

        </>
    )
};

export default App2;