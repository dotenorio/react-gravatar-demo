import React from 'react'
import { NavLink } from "react-router-dom";

import Layout from "../Layout/Layout";
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