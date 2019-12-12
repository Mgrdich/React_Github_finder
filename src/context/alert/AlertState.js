import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Show Alert
    const showAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {msg,type}
        });

        setTimeout(() => dispatch({type: REMOVE_ALERT}), 5000);
    };

    return <AlertContext.provider
        value={{
            alert: state,
            showAlert
        }}
    >
        {props.children}
    </AlertContext.provider>
};

export default AlertState;