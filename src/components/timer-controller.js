/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import TimerQueue from './timer-queue';
import SoundFile from './ting.mp3';
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
      document.getElementById('ting').play();

      // if queue is not empty, then continue to run
      if (queue.length) {
        this.runTimer();
      }
    }
  }

  handleInputChange(e) {
    const { target } = e;

    this.setState({
      [target.name]: target.value ? target.value : 0,
    });
  }

  runTimer() {
    const { queue, count } = this.state;
    const { onRun } = this.props;

    if (queue.length <= 0) {
      return;
    }

    const topOfQueue = queue.shift();

    onRun(topOfQueue);

    this.setState({
      count: count - 1,
    });
  }

  queue(e) {
    e.preventDefault();

    const {
      hour = 0, minute = 0, second = 0, count, queue, label,
    } = this.state;
    const time = helper.normalizeTime({ hour, minute, second });

    if (hour || minute || second) {
      this.setState({
        count: count + 1,
        queue: [
          ...queue,
          {
            id: count,
            hour: time.hour || 0,
            minute: time.minute || 0,
            second: time.second || 0,
            label: label || 'Default Label',
            formattedTime: helper.timeToStr(time),
          },
        ],
      });
    }

    const { onQueue } = this.props;

    onQueue(time, count);
  }

  playSound() {
    this.audio = new Audio(`${process.env.PUBLIC_URL}/ting.mp3`);
    this.audio.play();
  }

  render() {
    let currentQueue;
    const { queue } = this.state;

    if (queue.length) {
      currentQueue = queue.map((item) => (
        <TimerQueue
          key={item.id}
          label={item.label}
          formattedTime={item.formattedTime}
          onRun={this.runTimer}
        />
      ));
    }

    this.myRef = React.createRef();

    return (
      <div>
        <form onSubmit={this.queue} className="form">

          <div className="form__title">New task</div>

          <div className="form__control">

            <div className="form__group">
              <div className="form__group-label">Give your task a name</div>
              <div className="form__group-input">
                <input
                  onChange={this.handleInputChange}
                  name="label"
                  type="text"
                  placeholder="name"
                />
              </div>
            </div>

            <div className="form__group">
              <div className="form__group-label">How long does it take?</div>
              <div className="form__group-input">
                <input
                  onChange={this.handleInputChange}
                  name="hour"
                  type="number"
                  placeholder="hh"
                />

                <input
                  onChange={this.handleInputChange}
                  name="minute"
                  type="number"
                  placeholder="mm"
                />

                <input
                  onChange={this.handleInputChange}
                  name="second"
                  type="number"
                  placeholder="ss"
                />
              </div>
            </div>

            <input className="form__submit-button" type="submit" value="Add to queue" />
            <button type="button" onClick={this.runTimer}>
            Run
            </button>
          </div>
        </form>

        <audio id="ting" ref={this.myRef} src={SoundFile}>
          <track kind="captions" />
        </audio>

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
