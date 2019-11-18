/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import NoSleep from 'nosleep.js';
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
      timeRemaining: 0,
      running: null,
    };

    this.onRun = this.onRun.bind(this);
    this.onQueue = this.onQueue.bind(this);
  }

  onQueue(time, count) {
    const { queue } = this.state;

    this.setState({
      queue: [
        ...queue,
        {
          id: count,
          label: time.label,
          hour: time.hour,
          minute: time.minute,
          second: time.second,
        },
      ],
    });
  }

  onRun(time) {
    const timeObj = time;
    const noSleep = new NoSleep();
    let seconds = timeToSecond(timeObj);
    noSleep.enable();

    const interval = setInterval(() => {
      const theTime = secondToTime(seconds);

      this.setState({
        time: timeToStr(theTime),
        label: time.label,
        timeRemaining: seconds,
        running: time,
      });

      if (seconds === 0) {
        clearInterval(interval);
      }

      seconds -= 1;
    }, 1000);
  }

  render() {
    const {
      time, timeRemaining, running, label,
    } = this.state;

    const taskName = !running ? 'Nothing' : label;
    const taskTime = !running ? '00:00:00' : time;

    return (
      <div className="wrapper">

        <div className="page-title">queue -able timer</div>

        <div className="task">
          <div className="task__name">{taskName}</div>
          <div className="task__time">{taskTime}</div>
        </div>

        <TimerController
          onRun={this.onRun}
          onQueue={this.onQueue}
          timeRemaining={timeRemaining}
        />
      </div>
    );
  }
}

export default Timer;
