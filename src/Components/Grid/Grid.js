import React, { Component } from "react";
import { wrapGrid } from "animate-css-grid";
import Counter from "../Counter/Counter";
import { Transition } from 'react-spring'

class Grid extends Component {
  constructor(props) {
    super(props);
    this.grid = React.createRef();
  }

  componentDidMount() {
    wrapGrid(this.grid.current, { easing : 'easeInOut', stagger: 10, duration: 360 });
  }
  
  render() {
    const items = this.props.counters;
    return (
      <div className="grid all-counters" ref={this.grid}>
      <Transition
        items={items} keys={item => item.id}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
        config={{ duration: 180 }}>
        {item => props =>
          <div style={props} className='counter-transition-item'>
            <Counter
              removeCounter={this.props.removeCounter}
              counter={item}
              key={item.id}
            />
          </div>
        }
      </Transition>
      </div>
    );
  }
}

export default Grid;