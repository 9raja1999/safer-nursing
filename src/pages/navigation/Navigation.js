import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom'
import axios from 'axios';
// IMPORTING ALL PAGES
import Home from '../Home';
import About from '../About';
import Login from '../Login';
import Registration from '../Registration';
import Hospital from '../Hospital';

axios.defaults.baseURL = "http://localhost:3001/v1/api";
// axios.defaults.baseURL = "https://parhaicastle.com/v1/api";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';


export default function Navigation() {
    return (
        <Switch>
            <Route
                exact
                path='/'
                component={Home}
            />
            <Route
                path='/About'
                component={About}
            />
            <Route
                path='/Login'
                component={Login}
            />
            <Route
                path='/Registration'
                component={Registration}
            />
            <Route
                path='/Hospital'
                component={Hospital}
            />
        </Switch>
    )
}
