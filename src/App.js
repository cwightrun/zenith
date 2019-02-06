import React, { Component } from "react";
import localforage from "localforage";
import uuid from "uuid/v4";
import Header from "./Components/Header/Header";
import Grid from "./Components/Grid/Grid";
import DiceModal from "./Components/DiceModal/DiceModal";
import Footer from "./Components/Footer/Footer";
import "./App.scss";
import "mana-font";
import firebase from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [],
      loaded: false,
    };
  }

  loadCounters = () => {
    // Acquire the counters from local storage:
    localforage.getItem('counters', (err, counters) => {
      this.setState({
        counters: counters,
        modal: false,
        loaded: true
      });
    });

    // Set a unique Game ID:
    localforage.getItem('gameID', (err, gameID) => {
      if (!gameID) {
        this.setState({gameID: uuid()});
      } else {
        this.setState({gameID: gameID});
      }

      localforage.setItem('gameID', this.state.gameID);
    });
  }

  saveCounters = () => {
    localforage.setItem('counters', this.state.counters, function (err) {
      if (err) console.error('Storage error', err);
    });

    // const countersRef = firebase.database().ref('counters');
    // const currentState = {
    //   counters: this.state.counters
    // }
    // countersRef.push(currentState);
  }

  removeAllCounters = () => {
    localforage.clear(() => {
      this.setState({counters: []});
    });
  }

  addCounter = () => {
    let prevState = this.state;
    let newState;
    if (prevState.counters === null) {
      newState = { counters: [{ id: uuid(), value: 0, icon: 0 }] };
    } else {
      newState = { counters: [...prevState.counters, { id: uuid(), value: 0, icon: 0 }] };
    }
    this.setState(newState);
  }

  removeCounter = (id) => {
    this.setState(prevState => ({
      counters: prevState.counters.filter(counter => counter.id !== id)
    }));
  };

  toggleModal = (modalState) => {
    let modal = !this.state.modal;
    this.setState({modal});
  }

  componentWillMount = () => {
    this.loadCounters();
  }

  componentDidUpdate = () => {
    this.saveCounters();
  }

  render() {
    return (
      <div className={'App ' + (this.state.loaded && 'is-loaded')}>
        <Header />
        <main className="main">
          <div className="manage-counters">
            <button onClick={() => {this.addCounter()}}>Add Counter</button>
            <button onClick={() => {this.removeAllCounters()}}>Remove All</button>
            {
              // <button onClick={() => {this.toggleModal()}}>Roll Dice</button>
            }
          </div>
          {this.state.counters &&
            <Grid
              counters={this.state.counters}
              saveCounters={this.saveCounters}
              loadCounters={this.loadCounters}
              removeCounter={this.removeCounter}
              />
          }
          <DiceModal show={this.state.modal} toggleModal={this.toggleModal} />
        </main>
        <Footer />
        <div className="stripes layer-1">
          <div className="stripe"></div>
          <div className="stripe"></div>
          <div className="stripe"></div>
          <div className="stripe"></div>
          <div className="stripe"></div>
          <div className="stripe"></div>
        </div>
      </div>
    );
  }
}

export default App;


// localforage.getItem('counters', (err, counters) => {
//   counters.forEach(counter => {
//     if (counter.id === this.state.id) {
//       this.setState({
//         id: counter.id,
//         value: this.state.counter.value,
//         icon: this.props.counter.icon
//       });
//     }
//   });
// });