import React, { Component } from "react";
import uuid from "uuid/v4";
import "./App.css";
import "mana-font";
import Header from "./Header/Header";
import Counter from "./Counter/Counter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [
        { id: uuid(), value: 40, icon: 0 },
        { id: uuid(), value: 50, icon: 1 },
        { id: uuid(), value: 60, icon: 2 },
        { id: uuid(), value: 70, icon: 3 }
      ]
    };
  }

  addCounter = () => {
    this.setState(prevState => ({
      counters: [...prevState.counters, { id: uuid(), value: 0, icon: 0 }]
    }));
  };

  removeCounter = (id) => {
    this.setState(prevState => ({
      counters: prevState.counters.filter(counter => counter.id !== id)
    }));
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Header />
        <main>
          <div className="manage-counters">
            <button onClick={() => {this.addCounter()}}>Add Counter</button>
          </div>
          <div className="all-counters">
            {this.state.counters.map((counter, i) => (
              <Counter
                removeCounter={this.removeCounter}
                counter={counter}
                key={counter.id}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
