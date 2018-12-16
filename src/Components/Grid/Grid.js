import React, { Component } from "react";
import { wrapGrid } from "animate-css-grid";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Counter from "../Counter/Counter";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.grid = React.createRef();
  }

  componentDidMount() {
    // will automatically clean itself up when dom node is removed
    wrapGrid(this.grid.current, { easing : 'easeInOut', stagger: 10, duration: 360 });
  }
  
  render() {
    return (
      <div className="grid all-counters" ref={this.grid}>
      {this.props.counters && this.props.counters.map((counter, i) => (
        <div className="counter" key={counter.id}>
          <Counter
            removeCounter={this.props.removeCounter}
            counter={counter}
            key={counter.id}
          />
        </div>
      ))}
      </div>
    );
  }
}

export default Grid;