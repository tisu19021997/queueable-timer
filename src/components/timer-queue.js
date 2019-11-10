import React from 'react';

class TimerQueue extends React.Component {
  render() {
    return (
      <li key={this.props.id}>
        <h1>{`${this.props.label} for ${this.props.formattedTime}`}</h1>
      </li>
    );
  }
}

export default TimerQueue;
