import React, { Component } from "react";
import { wrapGrid } from "animate-css-grid";
import localforage from "localforage";
import uuid from "uuid/v4";
import Header from "./Header/Header";
import Grid from "./Grid/Grid";
import "./App.scss";
import "mana-font";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {counters: [], loaded: this.props.loaded};
  }

  loadCounters = () => {
    localforage.getItem('counters', (err, counters) => { 
      this.setState({counters: counters, loaded: true});
    });
  }

  saveCounters = () => {
    localforage.setItem('counters', this.state.counters, function (err) {
      if (err) console.error('Storage error', err);
    });
  }

  addCounter = () => {
    let prevState = this.state;
    if (!prevState.counters) {
      prevState = { counters: [{ id: uuid(), value: 0, icon: 0 }] }
    } else {
      this.setState(prevState => ({ counters: [...prevState.counters, { id: uuid(), value: 0, icon: 0 }] }));
    }
  }

  removeCounter = (id) => {
    this.setState(prevState => ({
      counters: prevState.counters.filter(counter => counter.id !== id)
    }));
  };
  
  componentWillMount = () => {
    this.loadCounters();
  }
  
  componentDidUpdate = () => {
    this.saveCounters();
  }
  
  render() {
    if (!this.state.loaded) {
      return(
        <div className="App"></div>
      );
    } else {
      return (
        <div className={'App ' + (this.state.loaded && 'is-loaded')}>
          <Header />
          <main>
            <div className="manage-counters">
              <button onClick={() => {this.addCounter()}}>Add Counter</button>
              <button onClick={() => { this.setState({counters: []})}}>Remove All</button>
            </div>
            <Grid counters={this.state.counters} removeCounter={this.removeCounter} />
          </main>
        </div>
      );
    }
  }
}

export default App;
