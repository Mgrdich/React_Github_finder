import React, {Component} from 'react';
import Navbar from './componenets/Layout/Navbar'
import Users from './componenets/users/Users'
import Search from './componenets/users/Search'
import './App.css';
import axios from 'axios';

class App extends Component {

    state={
      users: [],
      loading: false
    };
    async componentDidMount() {
        this.setState({loading: true});

        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({users: res.data, loading:false});
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <Search />
                    <Users loading={this.state.loading} users={this.state.users}/>
                </div>
            </div>
        );

    }
}

export default App;
