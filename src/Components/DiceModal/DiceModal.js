import React, { Component } from 'react';

class DiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      results: []
    }
  }

  rollDie(amount, type) {
    // console.log('The amount ' + amount + ' was hit.');
    let resultMsg = 'Rolled ' + amount + 'x D' + type + ' totaling __';
    this.setState({results: [...this.state.results, resultMsg]});
  }

  render() {
    let modalClassName = this.props.show ? "modal modal-show" : "modal modal-hide";
    return (
      <div className={modalClassName}>
        <div className="modal-curtain" onClick={this.props.toggleModal}></div>
        <div className="modal-content">
          <p>How many?
            <input className="multiplier" type="number" pattern="[0-9]*" min="1" max="10" placeholder="1" />
          </p>
          <p>What type of die?
            <button onClick={() => {this.rollDie(1, 4)}}>4</button>
            <button onClick={() => {this.rollDie(1, 6)}}>6</button>
            <button onClick={() => {this.rollDie(1, 8)}}>8</button>
            <button onClick={() => {this.rollDie(1, 10)}}>10</button>
            <button onClick={() => {this.rollDie(1, 12)}}>12</button>
            <button onClick={() => {this.rollDie(1, 20)}}>20</button>
          </p>
          <ul>
          {this.state.results.map((result) =>
            <li>{result}</li>
          )}
          </ul>
          <p>{this.state.results}</p>
        </div>
      </div>
    );
  }
}

export default DiceModal;