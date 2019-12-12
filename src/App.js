import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './componenets/Layout/Navbar';
import Users from './componenets/users/Users';
import User from './componenets/users/User';
import Search from './componenets/users/Search';
import Alert from './componenets/Layout/Alert';
import About from './componenets/pages/About';

import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'


const App = () => {

    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div>
                        <Navbar/>
                        <div className="container">
                            <Alert/>
                            <Switch>
                                <Route exact path='/' render={() => (
                                    <>
                                        <Search/>
                                        <Users/>
                                    </>
                                )}/>
                                <Route exact path='/about' component={About}/>
                                <Route exact path='/user/:login' component={User}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );


};

export default App;
