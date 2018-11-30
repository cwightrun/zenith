import React, { Component } from 'react';
import './App.css';
import 'mana-font';
import Header from './Header/Header';
import Counter from './Counter/Counter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [
        {id: 0, value: 40, icon: 0},
        {id: 1, value: 20, icon: 1},
        {id: 2, value: 20, icon: 2},
        {id: 3, value: 20, icon: 3},
      ],
    }

    console.log('this.state.counters', this.state.counters);

    // Bindings
    this.addCounter = this.addCounter.bind(this);
    this.removeCounter = this.removeCounter.bind(this);
  }

  addCounter(type, id) {
    let counters = [...this.state.counters]; // make a separate copy of the array
    let length = counters.length;

    counters.push({id: length, value: 0, icon: 0});
    this.setState({counters: counters});
  }

  removeCounter(index) {
    let counters = this.state.counters.filter((counter, counterIndex) => {
      return counterIndex !== index
    })

    this.setState({ counters })
  }

  render() {
    let counters = this.state.counters;
    return (
      <div className="App">
        <Header />
        <main>
          <div className="manage-counters">
            <button onClick={() => {this.addCounter('add', counters.length)}}>Add Counter</button>
          </div>
          <div className="all-counters">
            {counters.map((counter, i) =>
              <Counter removeCounter={this.removeCounter} id={i} key={i} value={this.state.counters[i].value} icon={this.state.counters[i].icon} />
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
