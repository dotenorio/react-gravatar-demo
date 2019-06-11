import React from 'react'
import Layout from "./Layout";
import { NavLink } from "react-router-dom";

import './NotFound404.css';

function NotFound404 () {
  return (
    <div>
      <Layout title="Oops!!">
        <p>Page Not Found</p>
        <p>:(</p>
        <p>
          <NavLink to="/" exact activeClassName="active" title="back to Home Page">back</NavLink>
        </p>
      </Layout>
    </div>
  );
}

export default NotFound404