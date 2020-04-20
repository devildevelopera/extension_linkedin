import React, { Component } from 'react';
import person from './person.png';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        { this.props.photo ? (
          <img src={this.props.photo} className="App-logo" alt="logo" />
        ):(
          <img src={person} className="App-logo" alt="logo" />
        )}
        </header>
        <div className="App-body">
          <p className="App-intro">
            <font color="red">Name: </font>{this.props.name}
          </p>
          <p className="App-intro">
          <font color="red">Position: </font>{this.props.position}
          </p>
          <p className="App-intro">
          <font color="red">Url: </font>{this.props.url}
          </p>
          <p className="App-intro">
          <font color="red">Phone: </font>{this.props.phone}
          </p>
          <p className="App-intro">
          <font color="red">Email: </font>{this.props.email}
          </p>
          <p className="App-intro">
          <font color="red">Twitter: </font>{this.props.twitter}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
