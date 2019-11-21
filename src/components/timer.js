/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import NoSleep from 'nosleep.js';
import TimerController from './timer-controller';
import Modal from './modal';
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
      showQueue: false,
      isFullScreen: false,
    };

    this.onRun = this.onRun.bind(this);
    this.onQueue = this.onQueue.bind(this);
    this.toggleQueueModal = this.toggleQueueModal.bind(this);
    this.expandTimer = this.expandTimer.bind(this);
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

  toggleQueueModal() {
    const { showQueue } = this.state;
    this.setState({
      showQueue: !showQueue,
    });
  }

  expandTimer() {
    const { isFullScreen } = this.state;
    this.setState({
      isFullScreen: !isFullScreen,
    });
  }

  render() {
    const {
      time, timeRemaining, running, label, showQueue, isFullScreen,
    } = this.state;

    const taskName = !running ? 'Nothing' : label;
    const taskTime = !running ? '00:00:00' : time;
    let timerModal = '';

    if (isFullScreen) {
      timerModal = <Modal center close={this.expandTimer}><div className="modal-time">{taskTime}</div></Modal>;
    }

    return (
      <div className="wrapper">

        {timerModal}

        <div className="page-header">
          <div className="page-title">queue -able timer</div>

          <button
            type="button"
            className="page-menu"
            onClick={this.toggleQueueModal}
          >
            <svg width="6" height="22" viewBox="0 0 6 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="3" cy="3" r="3" fill="#333333" />
              <circle cx="3" cy="11" r="3" fill="#333333" />
              <circle cx="3" cy="19" r="3" fill="#333333" />
            </svg>
          </button>
        </div>


        <div className="task">
          <div className="task-name">{taskName}</div>
          <div className="task-time">{taskTime}</div>
          <button type="button" className="btn js-modal" onClick={this.expandTimer}>Expand</button>
        </div>

        <TimerController
          onRun={this.onRun}
          onQueue={this.onQueue}
          showQueue={showQueue}
          toggleQueueModal={this.toggleQueueModal}
          timeRemaining={timeRemaining}
        />
      </div>
    );
  }
}

export default Timer;
