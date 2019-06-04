import React from 'react';
import { NavLink } from "react-router-dom";

import './Layout.css';

function Header(props) {
  return (
    <div className="header">
      <h1>
        {props.title}
      </h1>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active" title="Home Page">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active" title="About Project">About</NavLink>
        </li>
      </ul>
    </div>
  );
}

function Layout (props) {
  return (
    <div>
      <Header title={ props.title ? props.title : "React Gravatar Demo"} />
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

export default Layout;