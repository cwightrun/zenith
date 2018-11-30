import React, { Component } from 'react';
import mtgThemes from '../mtgThemes';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      value: this.props.value,
      icon: this.props.icon
    };
  }

  handleChange(dir, amt = 1) {
    let newValue = this.state.value;
    if (dir === 'negative') newValue = newValue - amt;
    if (dir === 'positive') newValue = newValue + amt;
    if (dir === 'reset') newValue = amt;
    this.setState({value: newValue});
    console.log('counter state', this.state);
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

        <button onClick={() => this.props.removeCounter(this.props.id)}>Delete</button>

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

export default Counter;