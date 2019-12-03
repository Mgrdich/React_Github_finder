import React, { Fragment, Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './componenets/Layout/Navbar';
import Users from './componenets/users/Users';
import Search from './componenets/users/Search';
import Alert from './componenets/Layout/Alert';
import About from './componenets/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {

    state = {
        users: [],
        loading: false,
        alert: null
    };

    // async componentDidMount() {
    //     this.setState({loading: true});
    //
    //     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //
    //     this.setState({users: res.data, loading: false});
    // }

    //search GitUsers
    searchUsers = async (text) => {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({users: res.data.items, loading: false});
    };

    //clear Users from state
    clearUsers = () => this.setState({loading: false, users: []});

    //set Alert
    setAlert = (msg, type) => {
        this.setState({alert: {msg: msg, type: type}});

        setTimeout(()=> this.setState({alert:null}),5000);
    };

    render() {
        const {users, loading} = this.state;
        return (
            <Router>
            <div>
                <Navbar/>
                <div className="container">
                    <Alert alert={this.state.alert}/>
                    <Switch>
                        <Route exact path='/' render={props=>(
                            <Fragment>
                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0}
                            setAlert={this.setAlert}/>
                    <Users loading={loading} users={users}/>
                            </Fragment>
                        )}/>
                        <Route exact path='/about' component={About}/>
                    </Switch>
                </div>
            </div>
            </Router>
        );

    }
}

export default App;
