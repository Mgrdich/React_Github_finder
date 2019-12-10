import React,{ useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props =>{
const initialState={
    users:[],
    user:{},
    repos:[],
    loading:false
};

const [state, dispatch] = useReducer(GithubReducer,initialState);

//Search User

//    Get User

//    Get repos

//    Clear User

//    Set Loading

    return <GithubContext.provider
    value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading
    }}
    >
        {props.children}
    </GithubContext.provider>
};

export default GithubState;