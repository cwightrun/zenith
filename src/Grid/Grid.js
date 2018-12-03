import React, { Component } from "react";
import { wrapGrid } from "animate-css-grid";
import Counter from "../Counter/Counter";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.grid = React.createRef();
  }
  componentDidMount() {
    // will automatically clean itself up when dom node is removed
    wrapGrid(this.grid, { easing : 'backOut', stagger: 10, duration: 400 });
  }

  render() {
    return (
      <div className="grid all-counters" ref={this.grid}>
      {this.props.counters && this.props.counters.map((counter, i) => (
        <Counter
          removeCounter={this.props.removeCounter}
          counter={counter}
          key={counter.id}
        />
      ))}
      </div>
    );
  }
}

export default Grid;