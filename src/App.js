import React, { Component } from 'react';
import './App.css';
import 'mana-font';
import mtgThemes from './mtgThemes';

// class Header extends Component {}
function Header(props) {
  return (
    <header className="header">
      <h1>Zenith Counter</h1>
      <p>It's magic, probably.</p>
    </header>
  )
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      icon: this.props.icon
    };

    console.log(mtgThemes[1]);
  }

  handleChange(dir, amt = 1) {
    let newValue = this.state.value;
    if (dir === 'negative') newValue = newValue - amt;
    if (dir === 'positive') newValue = newValue + amt;
    if (dir === 'reset') newValue = amt;
    this.setState({value: newValue});
  }

  changeIcon() {
    if (this.state.icon <= 5) {
      this.setState({icon: this.state.icon + 1});
    } else {
      this.setState({icon: 0});
    }
  }

  render() {
    return (
      <div className="counter-wrapper" style={{backgroundColor: mtgThemes[this.state.icon]['bg']}}>
        <div className="counter">

          <div className="increment-column col-pos button-group has-3-buttons">
          <button className="value-1" onClick={() => {this.handleChange('positive', 1)}}>+1</button>
          <button className="value-5" onClick={() => {this.handleChange('positive', 5)}}>+5</button>
          <button className="value-10" onClick={() => {this.handleChange('positive', 10)}}>+10</button>
          </div>

          <div className="value-wrapper">
            <button onClick={() => this.changeIcon()} className="counter-icon" style={{backgroundColor: mtgThemes[this.state.icon]['fg']}}>
              <i className={'ms ms-' + mtgThemes[this.state.icon]['icon']}></i>
            </button>
            <h4 className="current-value">{this.state.value}</h4>
          </div>

          <div className="increment-column col-neg button-group has-3-buttons">
          <button className="value-10" onClick={() => {this.handleChange('negative', 10)}}>-10</button>
          <button className="value-5" onClick={() => {this.handleChange('negative', 5)}}>-5</button>
          <button className="value-1" onClick={() => {this.handleChange('negative', 1)}}>-1</button>
          </div>

        </div>

        <div className="resets button-group has-5-buttons">
          <button onClick={() => this.handleChange('reset', 0)}>0</button>
          <button onClick={() => this.handleChange('reset', 20)}>20</button>
          <button onClick={() => this.handleChange('reset', 40)}>40</button>
          <button onClick={() => this.handleChange('reset', 60)}>60</button>
          <button onClick={() => this.handleChange('reset', 80)}>80</button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [{value: 0}],
    }
  }

  changeCounters(type) {
    if (type === 'add') {
      var newCounters = this.state.counters.slice();
      newCounters.push({value: 0});
      this.setState({counters: newCounters});
    }
  }

  render() {
    let counters = this.state.counters;
    return (
      <div className="App">
        <Header />
        <main>
          <div className="manage-counters">
            <button onClick={() => {this.changeCounters('add')}}>Add Counter</button>
          </div>
          <div className="all-counters">
            {counters.map((counter, i) =>
              <Counter key={i} value={counter.value} icon={0} />
            )}
          </div>

          <style jsx>{`
            main {
              font-size: 16px;
            }

            .all-counters {
              display: flex;
              flex-flow: row wrap;
              justify-content: space-between;
            }
          `}</style>

        </main>
      </div>
    );
  }
}

export default App;
