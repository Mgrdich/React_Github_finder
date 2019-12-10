import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './componenets/Layout/Navbar';
import Users from './componenets/users/Users';
import User from './componenets/users/User';
import Search from './componenets/users/Search';
import Alert from './componenets/Layout/Alert';
import About from './componenets/pages/About';
import axios from 'axios';

import GithubState from './context/github/GithubState'

import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    //search GitUsers
    const searchUsers = async (text) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        setUsers(res.data.items);
        setLoading(false);
    };

    //Get a single Github User
    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUser(res.data);
        setLoading(false);
    };
    //get user repos

    const getUserRepos = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setRepos(res.data);
        setLoading(false);

    };
    //clear Users from state
    const clearUsers = () => {
        setLoading(false);
        setUsers([]);
    };

    //set Alert
    const showAlert = (msg, type) => {
        setAlert({msg, type});

        setTimeout(() => setAlert(null), 5000);
    };
    return (
        <GithubState>
        <Router>
            <div>
                <Navbar/>
                <div className="container">
                    <Alert alert={alert}/>
                    <Switch>
                        <Route exact path='/' render={props => (
                            <Fragment>
                                <Search searchUsers={searchUsers} clearUsers={clearUsers}
                                        showClear={users.length > 0}
                                        showAlert={showAlert}/>
                                <Users loading={loading} users={users}/>
                            </Fragment>
                        )}/>
                        <Route exact path='/about' component={About}/>
                        <Route
                            exact path='/user/:login'
                            render={props => (
                                <User
                                    {...props}
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
                                    user={user}
                                    repos={repos}
                                    loading={loading}/>
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
        </GithubState>
    );


};

export default App;
