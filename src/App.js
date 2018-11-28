import React, { Component } from 'react';
import './App.css';

// class Header extends Component {}
function Header(props) {
  return (
    <header className="header">
      <h3>Zenith Commander Counter.</h3>
    </header>
  )
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  handleSet(amt) {
    this.setState({value: amt});
  }

  handleReset() {
    this.setState({value: 0});
  }

  handleIncrement(dir) {
    let newValue = this.state.value;
    if (dir === 'negative') newValue = newValue - 1;
    if (dir === 'positive') newValue = newValue + 1;

    this.setState({value: newValue});
  }

  render() {
    return (
      <div className="counter-wrapper">
        <div className="resets">
          <button onClick={() => this.handleReset()}>Reset</button>
          <button onClick={() => this.handleSet(20)}>Set to 20</button>
          <button onClick={() => this.handleSet(40)}>Set to 40</button>
        </div>
        <div className="counter">
          <button onClick={() => {this.handleIncrement('positive')}}>+</button>
          <h1 className="current-value">{this.state.value}</h1>
          <button onClick={() => {this.handleIncrement('negative')}}>-</button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [{
        value: 0
      }, {
        value: 0
      }, {
        value: 0
      }]
    }
  }

  addCounter(type) {
    var newCounters = this.state.counters.slice();
    newCounters.push({value: 0});
    this.setState({counters: newCounters});
  }

  render() {
    let counters = this.state.counters;
    return (
      <div className="App">
        <Header />

        <main>

          <p>Here's a thing.</p>

          <button onClick={() => {this.addCounter('life')}}>Add Life Counter</button>
          {counters.map((counter, i) =>
            <Counter key={i} value={counter.value} />
          )}

          <style jsx>{`
            p {
              color: red;
            }
          `}</style>

        </main>
      </div>
    );
  }
}

export default App;
