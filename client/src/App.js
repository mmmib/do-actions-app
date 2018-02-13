import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const QuickActionsForm = ({ getData }) => {

  // Return JSX
  return (
    <div>
      <button onClick={() => {
        //Boost case
        getData(1, "Boost");
      }}>
        Boost...
      </button>
      <button onClick={() => {
        //Cooldown
        getData(2, "Cooldown");
      }}>
        Cooldown...
      </button>
    </div>
  );
};

const Title = () => {
  return (
    <div>
      <div>
        <h1>Quick Actions App</h1>
        <h3>Home ID: 169731 Zone:e Living Room </h3>
      </div>
    </div>
  );
}

class App extends React.Component {

  constructor(props) {

    // Pass props to parent class
    super(props);

    // Set initial state
    this.state = {
      message: "No actions executed..."
    }
  }

  // Get data handler
  getData(actionId, actionName) {

    /*
      Note: 
      For simplicity ==> HomeId & ZoneId is hardcoded .
      It should be enhanced to get values dynamically from user HomeList
      Aslo , celsius degree & overlay expiray are hardcoded.
    */

    fetch(`/actions/${actionId}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'PUT',
      body: JSON.stringify({ homeId: 169731, zoneId: 1, celsius: 25, expiray: 30 })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Server data ' + JSON.stringify(data));
        let updatedMessage = data === {} ? `[${actionName}] Action is executed successfully...` : `[${actionName}] Action executed with ERROR...`
        console.log('updatedMessage ' + JSON.stringify(updatedMessage));
        this.setState({ message: updatedMessage })
      }
      );
  }

  render() {
    // Render JSX
    return (
      <div className="App">
        <Title />
        <QuickActionsForm getData={this.getData.bind(this)} />
        <p>{this.state.message}</p>
      </div>
    );
  }
}


export default App;
