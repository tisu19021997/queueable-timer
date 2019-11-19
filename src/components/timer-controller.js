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
    const { showQueue, toggleModal } = this.props;

    if (queue.length) {
      currentQueue = queue.map((item) => (
        <TimerQueue
          id={item.id}
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

            <input className="form__submit-btn" type="submit" value="Add to queue" />
            <button className="btn--top-right" type="button" onClick={this.runTimer}>Run</button>
          </div>

        </form>

        <audio id="ting" ref={this.myRef} src={SoundFile}>
          <track kind="captions" />
        </audio>

        {showQueue ? (
          <div className="queue__modal">
            <div className="queue__title">current queue</div>

            <button
              type="button"
              className="close"
              onClick={toggleModal}
            >
              <svg width="24" height="24" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.969925" y="0.434853" width="0.560681" height="6.72818" transform="rotate(-45 0.969925 0.434853)" fill="black" />
                <rect x="5.68907" width="0.560681" height="6.72818" transform="rotate(45 5.68907 0)" fill="black" />
              </svg>
            </button>

            <ol className="queue">
              {currentQueue}
            </ol>
          </div>
        ) : ''}

      </div>
    );
  }
}

TimerController.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  onRun: PropTypes.func.isRequired,
  onQueue: PropTypes.func.isRequired,
  showQueue: PropTypes.bool.isRequired,
};

export default TimerController;
