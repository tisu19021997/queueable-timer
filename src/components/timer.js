/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import TimerController from './timer-controller';
import {
  timeToSecond,
  secondToTime,
  timeToStr,
} from '../helper/function';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      queue: [],
    };

    this.onRun = this.onRun.bind(this);
    this.onQueue = this.onQueue.bind(this);
  }

  onQueue(time) {
    this.setState({
      queue: time,
    });
  }

  onRun(time) {
    const timeObj = time;
    let seconds = timeToSecond(timeObj);

    const interval = setInterval(() => {
      const theTime = secondToTime(seconds);
      this.setState({
        time: timeToStr(theTime),
      });

      seconds -= 1;

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <div>
          <h1>{time}</h1>
        </div>
        <div>
          <TimerController onRun={this.onRun} onQueue={this.onQueue} />
        </div>
        <div />
      </div>
    );
  }
}

export default Timer;
