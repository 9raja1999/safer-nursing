import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom'

// IMPORTING ALL PAGES
import Home from '../Home';
import About from '../About';
import Login from '../Login';
import Registration from '../Registration';
import Hospital from '../Hospital';

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
