import React from 'react'

import Layout from "./Layout";
import "./About.css";

function About () {
  return (
    <div>
      <Layout title="About This Demo">
        <p>A React Gravatar Demo..</p>
        <p>See more <a href="https://github.com/dotenorio/react-gravatar-demo" title="See this on Github">on Github</a>.</p>
      </Layout>
    </div>
  );
}

export default About;
