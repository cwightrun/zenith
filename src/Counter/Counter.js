import React, { Component } from 'react';
import mtgThemes from '../mtgThemes';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.counter.value,
      icon: this.props.counter.icon
    };
  }

  handleChange = (dir, amt = 1) => {
    let value = this.state.value;
    if (dir === "negative") value = value - amt;
    if (dir === "positive") value = value + amt;
    if (dir === "reset") value = amt;
    this.setState({ value });
  };

  changeIcon = () => {
    if (this.state.icon <= 5) {
      this.setState({ icon: this.state.icon + 1 });
    } else {
      this.setState({ icon: 0 });
    }
  };

  render() {
    return (
      <div
        className="counter-wrapper"
        // style={{ backgroundColor: mtgThemes[this.state.icon]["bg"] }}
      >
        <div className="counter">
          <div className="increment-group col-pos button-group has-3-buttons">
            <button
              className="value-1"
              onClick={() => {
                this.handleChange("positive", 1);
              }}
            >
              +1
            </button>
            <button
              className="value-5"
              onClick={() => {
                this.handleChange("positive", 5);
              }}
            >
              +5
            </button>
            <button
              className="value-10"
              onClick={() => {
                this.handleChange("positive", 10);
              }}
            >
              +10
            </button>
          </div>

          <div className="value-wrapper">
            <button
              onClick={() => this.changeIcon()}
              className="counter-icon"
              style={{ backgroundColor: mtgThemes[this.state.icon]["fg"] }}
            >
              <i className={"ms ms-" + mtgThemes[this.state.icon]["icon"]} />
            </button>
            <h4 className="current-value">{this.state.value}</h4>
          </div>

          <div className="decrement-group col-neg button-group has-3-buttons">
            <button
              className="value-10"
              onClick={() => {
                this.handleChange("negative", 10);
              }}
            >
              -10
            </button>
            <button
              className="value-5"
              onClick={() => {
                this.handleChange("negative", 5);
              }}
            >
              -5
            </button>
            <button
              className="value-1"
              onClick={() => {
                this.handleChange("negative", 1);
              }}
            >
              -1
            </button>
          </div>
        </div>

        

        <div className="resets button-group has-5-buttons">
          <button onClick={() => this.handleChange("reset", 0)}>0</button>
          <button onClick={() => this.handleChange("reset", 20)}>20</button>
          <button onClick={() => this.handleChange("reset", 40)}>40</button>
          <button onClick={() => this.handleChange("reset", 60)}>60</button>
          <button onClick={() => this.handleChange("reset", 80)}>80</button>
        </div>
      </div>
    );
  }
}

export default Counter;