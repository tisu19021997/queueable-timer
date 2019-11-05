/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import TimerQueue from './timer-queue';
import * as helper from '../helper/function';

class TimerController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      count: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.queue = this.queue.bind(this);
    this.runTimer = this.runTimer.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { timeRemaining } = this.props;
    const { queue } = this.state;

    // catch the moment when one cycle of timer is finished
    if (prevProps.timeRemaining !== 0 && timeRemaining === 0) {
      // if queue is not empty, then continue to run
      if (queue.length) {
        this.runTimer();
      }
    }
  }

  handleInputChange(e) {
    const { target } = e;

    this.setState({
      [target.name]: target.value,
    });
  }

  runTimer() {
    const { queue, count } = this.state;
    const { onRun } = this.props;
    const topOfQueue = queue.shift();

    onRun(topOfQueue);

    this.setState({
      count: count - 1,
    });
  }

  queue(e) {
    e.preventDefault();

    const {
      hour = 0, minute = 0, second = 0, count, queue,
    } = this.state;
    const time = helper.normalizeTime({ hour, minute, second });

    if (hour || minute || second) {
      this.setState({
        count: count + 1,
        queue: [
          ...queue,
          {
            id: count,
            hour: time.hour,
            minute: time.minute,
            second: time.second,
            formattedTime: helper.timeToStr(time),
          },
        ],
      });
    }

    const { onQueue } = this.props;

    onQueue(time, count);
  }

  render() {
    let currentQueue;
    const { queue } = this.state;

    if (queue.length) {
      currentQueue = queue.map((item) => (
        <TimerQueue
          key={item.id}
          formattedTime={item.formattedTime}
          onRun={this.runTimer}
        />
      ));
    }

    return (
      <div>
        <form onSubmit={this.queue}>
          <input
            onChange={this.handleInputChange}
            name="hour"
            type="number"
            placeholder="hour"
          />
          <input
            onChange={this.handleInputChange}
            name="minute"
            type="number"
            placeholder="minute"
          />
          <input
            onChange={this.handleInputChange}
            name="second"
            type="number"
            placeholder="second"
          />
          <input type="submit" value="Add to queue" />
          <button type="button" onClick={this.runTimer}>
            Run
          </button>
        </form>

        <div className="queue">{currentQueue}</div>
      </div>
    );
  }
}

TimerController.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  onRun: PropTypes.func.isRequired,
  onQueue: PropTypes.func.isRequired,
};

export default TimerController;
