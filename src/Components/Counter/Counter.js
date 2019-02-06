import React, { Component } from 'react';
import localforage from "localforage";
import Color from "color";
import mtgThemes from '../../Theme/mtgThemes';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.counter.id,
      value: this.props.counter.value,
      icon: this.props.counter.icon
    };
  }

  // loadCounter = (id) => {
  //   localforage.getItem(id, (err, value) => { this.setState({value}); });
  // }

  // saveCounter = (id) => {
  //   localforage.setItem(id, this.state, function (err) {
  //     if (err) console.error('Storage error', err);
  //   });
  // }

  handleChange = (dir, amt = 1) => {
    let value = this.state.value;
    switch (dir) {
      case "negative":
        value = value - amt;
        break;
      case "positive":
        value = value + amt;
        break;
      case "reset":
        value = amt;
        break;
      default:
        break;
    }
    this.setState({ value });
    this.props.saveCounters();
  };

  changeIcon = () => {
    if (this.state.icon <= 5) {
      this.setState({ icon: this.state.icon + 1 });
    } else {
      this.setState({ icon: 0 });
    }
  };

  componentDidMount = () => {
    // Grab the data from LF, update the counters to match.
    localforage.getItem(this.props.counter.id, (err, value) => {
      this.setState(value); 
    });

    // localforage.getItem('counters', (err, counters) => {
    //   counters.forEach(counter => {
    //     if (counter.id === this.state.id) {
    //       this.setState({
    //         id: counter.id,
    //         value: this.state.value,
    //         icon: this.state.icon
    //       });
    //     }
    //   });
    // });

    // load all counters
    // update necessary record in the counters
    // save the updated counters


    // this.props.loadCounters();
  }
  
  render() {
    this.props.saveCounters();

    return (
      <div className="counter">
        <button className="delete-counter" onClick={() => this.props.removeCounter(this.props.counter.id)}>
          <div>&#215;</div>
        </button>
        <div className="counter-content" style={{ backgroundColor: Color(mtgThemes[this.state.icon]['color']).darken(0.5).desaturate(0.5).fade(0.2) }}>
          <div className="value-wrapper">
            <div
              onClick={() => this.changeIcon()}
              className="counter-icon"
              style={{ backgroundColor: mtgThemes[this.state.icon]['color'] }}
            >
              <i className={mtgThemes[this.state.icon]["icon"]} />
            </div>
            <h4 className={'current-value ' + (this.state.value < 0 && 'is-negative')}>{this.state.value}</h4>
          </div>

          <div className="increment-group col-pos button-group has-3-buttons">
            <button className="value-10" onClick={() => { this.handleChange("positive", 10); }}>+10</button>
            <button className="value-5" onClick={() => { this.handleChange("positive", 5); }}>+5</button>
            <button className="value-1" onClick={() => { this.handleChange("positive", 1); }}>+1</button>
          </div>
          <div className="decrement-group col-neg button-group has-3-buttons">
            <button className="value-10" onClick={() => { this.handleChange("negative", 10) }}>-10</button>
            <button className="value-5" onClick={() => { this.handleChange("negative", 5) }}>-5</button>
            <button className="value-1" onClick={() => { this.handleChange("negative", 1) }}>-1</button>
          </div>

          <div className="resets button-group has-5-buttons">
            <button onClick={() => this.handleChange("reset", 0) }>0</button>
            <button onClick={() => this.handleChange("reset", 20) }>20</button>
            <button onClick={() => this.handleChange("reset", 40) }>40</button>
            <button onClick={() => this.handleChange("reset", 60) }>60</button>
            <button onClick={() => this.handleChange("reset", 80) }>80</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;