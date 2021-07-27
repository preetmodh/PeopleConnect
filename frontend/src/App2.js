import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/Login';
const App2=()=>{
    const is_student=localStorage.getItem('is_student');
    return (
        <>
            
            <BrowserRouter>
            
                <Switch>
                    {/* <Route exact path='/' component={Singup} /> */}
                    <Route exact path='/' component={Login} />
                  
                </Switch>
            </BrowserRouter>

        </>
    )
};

export default App2;