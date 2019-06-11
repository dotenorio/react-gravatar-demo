import React, { Component } from 'react';
import md5 from 'md5';
import jsonp from 'universal-jsonp';

import Layout from "../Layout/Layout";
import "./Gravatar.css";

function Result(props) {
  return (
    <div className="result">
      {props.res.thumbnailUrl &&
        <img src={props.res.thumbnailUrl} alt={props.res.preferredUsername} className="thumbnailUrl" />
      }
      <pre>
        {JSON.stringify(props.res, null, 2)}
      </pre>
    </div>
  );
}

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      res: {
        HowTo: 'Insert your email above to see results!'
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleRes(res) {
    this.setState({ res });    
  }

  async handleSubmit(event) {
    event.preventDefault();
    const valueMd5 = md5(this.state.value);
    this.handleRes({
      res: {
        status: 'Loading..'
      }
    });
    try {
      const request = await jsonp(`https://www.gravatar.com/${valueMd5}.json`, { timeout: 10000 })
      const response = await request.json();
      this.handleRes(response.entry[0]);
    } catch (err) {
      this.handleRes(err.message);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Your e-mail here.." />
          </label>
          <input type="submit" value="Enviar" />
        </form>
        <Result res={this.state.res} />
      </div>
    );
  }
}

function Gravatar () {
  return (
    <div>
      <Layout>
        <EmailForm />
      </Layout>
    </div>
  );
}

export default Gravatar;
