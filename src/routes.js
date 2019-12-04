import { AnimatedSwitch } from 'react-router-transition';
import { Route } from 'react-router-dom';
import Login from './login/login'
import Home from './home/home';
import React from 'react';

export default () => {
    return (
        <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper">
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
        </AnimatedSwitch>
    );
};
