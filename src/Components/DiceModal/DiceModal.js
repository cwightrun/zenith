import React, { Component } from 'react';
import localforage from "localforage";

class DiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      results: [],
      type: 6,
      multiplier: 1
    }
  }

  loadResults = () => {
    localforage.getItem('results', (err, results) => { 
      this.setState({results: results});
    });
  }

  saveResults = () => {
    localforage.setItem('results', this.state.results, function (err) {
      if (err) console.error('Storage error', err);
    });
  }

  changeMultiplier = (amount) => {
    this.setState({multiplier: amount});
  }

  changeDie = (type) => {
    this.setState({type: type});
  }

  buttonGroup(type) {
    let buttonGroup = [];

    if (type === 'multiplier') {
      for (let i = 1; i < 7; i++) {
        buttonGroup.push(<button onClick={() => {this.changeMultiplier(i)}}>{i}</button>);
      }
    }

    if (type === 'dice') {
      let dice = [4, 6, 8, 10, 12, 20];
      for (let i = 1; i < dice.length; i++) {
        buttonGroup.push(<button onClick={() => {this.changeDie(dice[i])}}>{dice[i]}</button>);
      }
    }

    return buttonGroup;
  }

  rollDie = () => {
    let multiplier = this.state.multiplier;
    let result = 0;

    while (multiplier-- > 0) {
      result += 1 + Math.floor(Math.random() * this.state.type);
    }
    
    let resultMsg = 'Rolled ' + this.state.multiplier + 'x D' + this.state.type + ' totaling ' + result;
    let newResults;
    
    if (this.state.results === null) {
      newResults = [resultMsg];
    } else {
      newResults = [...this.state.results, resultMsg];
    }
    
    this.setState({results: newResults});
  }
  
  clearResults = () => {
    localforage.removeItem('results', () => {
      this.setState({results: []});
    });
  }

  componentWillMount = () => {
    this.loadResults();
  }
  
  componentDidUpdate = () => {
    this.saveResults();
  }

  render() {
    let modalClassName = this.props.show ? "modal modal-show" : "modal modal-hide";
    const multValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const diceValues = [4, 6, 8, 10, 12, 20];

    return (
      <div className={modalClassName}>
        <div className="modal-curtain" onClick={this.props.toggleModal}></div>
        <div className="modal-content">
          <p>How many?</p>
          { multValues.map((val, i) =>
            <button key={i} onClick={() => {this.changeMultiplier(val)}}>{val}</button>
          )}
          <p>What type of die?</p>
          { diceValues.map((val, i) =>
            <button key={i} onClick={() => {this.changeDie(val)}}>{val}</button>
          )}

          <button onClick={() => (this.rollDie())}>Roll Die.</button>
          <button onClick={() => (this.clearResults())}>Clear Results.</button>
          <ul>
          {this.state.results && this.state.results.map((result, i) =>
            <li key={i}>{result}</li>
          )}
          </ul>
        </div>
      </div>
    );
  }
}

export default DiceModal;