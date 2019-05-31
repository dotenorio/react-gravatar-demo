import React from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';
import jsonp from 'universal-jsonp'
import './index.css';

function Header(props) {
  return (
    <div className="header">
      <h1>
        {props.title}
      </h1>
    </div>
  );
}

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'dotenorio@gmail.com',
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
    this.setState({
      res: {
        status: 'Loading..'
      }
    });
    try {
      const request = await jsonp(`https://www.gravatar.com/${valueMd5}.json`, { timeout: 1000 })
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
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Enviar" />
        </form>
        <Result res={this.state.res} />
      </div>
    );
  }
}

function Result(props) {
  return (
    <div className="result">
      <img src={props.res.thumbnailUrl} alt={props.res.preferredUsername} className="thumbnailUrl" />
      <pre>
        {JSON.stringify(props.res, null, 2)}
      </pre>
    </div>
  );
}

class Gravatar extends React.Component {
  render() {
    return (
      <div>
        <Header title="React Gravatar Demo" />
        <div className="content">
          <EmailForm />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Gravatar />,
  document.getElementById('root')
);