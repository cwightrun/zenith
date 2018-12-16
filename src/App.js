import React, { Component } from "react";
import { wrapGrid } from "animate-css-grid";
import localforage from "localforage";
import uuid from "uuid/v4";
import Header from "./Components/Header/Header";
import Grid from "./Components/Grid/Grid";
import DiceModal from "./Components/DiceModal/DiceModal";
import Footer from "./Components/Footer/Footer";
import "./App.scss";
import "mana-font";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {counters: [], loaded: this.props.loaded};
  }

  loadCounters = () => {
    localforage.getItem('counters', (err, counters) => { 
      this.setState({
        counters: counters,
        modal: false,
        loaded: true});
    });
  }

  saveCounters = () => {
    localforage.setItem('counters', this.state.counters, function (err) {
      if (err) console.error('Storage error', err);
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
    if (!this.state.loaded) {
      return(
        <div className="App"></div>
      );
    } else {
      return (
        <div className={'App ' + (this.state.loaded && 'is-loaded')}>
          <Header />
          <main>
            <div className="manage-counters">
              <button onClick={() => {this.addCounter()}}>Add Counter</button>
              <button onClick={() => {this.setState({counters: []})}}>Remove All</button>
              <button onClick={() => {this.toggleModal()}}>Roll Dice</button>
            </div>
            <Grid counters={this.state.counters} removeCounter={this.removeCounter} />
            <DiceModal show={this.state.modal} toggleModal={this.toggleModal} />
          </main>
          <Footer />
        </div>
      );
    }
  }
}

export default App;
