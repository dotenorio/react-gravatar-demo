import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Gravatar from "./Gravatar/Gravatar";
import About from "./About/About";
import NotFound404 from "./NotFound404/NotFound404";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={Gravatar} />
        <Route path="/about" component={About} />
        <Route path='*' component={NotFound404} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);