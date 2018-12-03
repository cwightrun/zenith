import React, { Component } from "react";
import { wrapGrid } from "animate-css-grid";
import localforage from "localforage";
import uuid from "uuid/v4";
import Header from "./Header/Header";
import Counter from "./Counter/Counter";
import "./App.scss";
import "mana-font";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {counters: []};
    this.allCounters = React.createRef();
  }

  loadCounters = () => {
    localforage.getItem('counters', (err, counters) => { this.setState({counters}); });
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
  }
  
  componentDidMount = () => {
    this.loadCounters();
    if (this.allCounters.current) {
      wrapGrid(this.allCounters.current, { easing : 'easeInOut', stagger: 10, duration: 250 });
    }
  }
  
  componentDidUpdate = () => {
    this.saveCounters();
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <div className="manage-counters">
            <button onClick={() => {this.addCounter()}}>Add Counter</button>
            <button onClick={() => { this.setState({counters: []})}}>Remove All</button>
          </div>
          <div className="all-counters" ref={this.allCounters}>
            {this.state.counters && this.state.counters.map((counter, i) => (
              <div className="counter" key={counter.id}>
              <Counter
                removeCounter={this.removeCounter}
                counter={counter}
                key={counter.id}
              />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
