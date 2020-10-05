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
      queueError: false,
      submitValue: 'Add to Queue',
      label: 'Default Label',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.queue = this.queue.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.skipTask = this.skipTask.bind(this);
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

    if (!target.value) {
      return false;
    }

    let { value, name } = target;

    if (!Number.isNaN(parseInt(value, 10)) && name !== 'label') {
      if (parseInt(value, 10) < 0) {
        value = Math.abs(value);
      }
    }

    this.setState({
      [name]: value,
    });

    return true;
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

    if (!hour && !minute && !second) {
      this.setState({
        queueError: true,
      });

      return false;
    }

    this.setState({
      count: count + 1,
      submitValue: 'Added',
      queueError: false,
      queue: [
        ...queue,
        {
          id: count,
          hour: time.hour || 0,
          minute: time.minute || 0,
          second: time.second || 0,
          label,
          formattedTime: helper.timeToStr(time),
        },
      ],
    });

    setTimeout(() => {
      this.setState({
        submitValue: 'Add to Queue',
      });
    }, 1000);

    const { onQueue } = this.props;

    onQueue(time, count);

    return true;
  }

  playSound() {
    this.audio = new Audio(`${process.env.PUBLIC_URL}/ting.mp3`);
    this.audio.play();
  }

  deleteItem(id) {
    const { queue } = this.state;
    const newQueue = queue.filter((item) => (item.id.toString() !== id.toString()));

    this.setState({
      queue: newQueue,
    });

    return true;
  }

  skipTask() {
    const { interval } = this.props;

    // TODO: implement skip task function
  }

  render() {
    let currentQueue;
    let actionButton;
    const { queue, queueError, submitValue } = this.state;
    const {
      showQueue, toggleQueueModal, onPause,
      isRunning, isPaused, onResume,
    } = this.props;
    const inputClass = queueError ? 'error' : '';

    if (queue.length) {
      currentQueue = queue.map((item) => (
        <TimerQueue
          deleteItem={this.deleteItem}
          key={item.id}
          id={item.id}
          label={item.label}
          formattedTime={item.formattedTime}
          onRun={this.runTimer}
        />
      ));
    }

    if (!isRunning) {
      actionButton = (
        <button
          className="form-on-btn btn"
          type="button"
          onClick={this.runTimer}
        >
          Run
        </button>
      );
    } else if (isRunning && !isPaused) {
      actionButton = (
        <button
          className="form-on-btn btn"
          type="button"
          onClick={onPause}
        >
          Pause
        </button>
      );
    } else {
      actionButton = (
        <button
          className="form-on-btn btn"
          type="button"
          onClick={onResume}
        >
          Resume
        </button>
      );
    }

    this.myRef = React.createRef();

    return (
      <div>
        <form onSubmit={this.queue} className="form">

          <div className="form-title">New task</div>

          <div className="form-control">

            <div className="form-group">
              <div className="form-group-label">Give your task a name</div>
              <div className="form-group-input">
                <input
                  onChange={this.handleInputChange}
                  name="label"
                  type="text"
                  placeholder="name"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-group-label">How long does it take?</div>
              <div className="form-group-input">
                <input
                  className={inputClass}
                  onChange={this.handleInputChange}
                  name="hour"
                  type="number"
                  min={0}
                  placeholder="hh"
                />

                <input
                  className={inputClass}
                  onChange={this.handleInputChange}
                  name="minute"
                  type="number"
                  min={0}
                  placeholder="mm"
                />

                <input
                  className={inputClass}
                  onChange={this.handleInputChange}
                  name="second"
                  type="number"
                  min={0}
                  placeholder="ss"
                />
              </div>
            </div>

            <input
              className="form-submit-btn btn"
              value={submitValue}
              type="submit"
            />

            {actionButton}

          </div>

        </form>

        {
          /*
          isRunning
            ? (
              <button
                type="button"
                onClick={this.skipTask}
                className="btn task-skip"
              >
                Skip
              </button>
            )
            : ''

           */
        }

        <audio id="ting" ref={this.myRef} src={SoundFile}>
          <track kind="captions" />
        </audio>

        {showQueue ? (
          <div className="queue-modal">
            <div className="queue-modal__wrapper">
              <div className="queue-title">current queue</div>

              <button
                type="button"
                className="close"
                onClick={toggleQueueModal}
              >

                <svg width="24" height="24" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="0.969925"
                    y="0.434853"
                    width="0.560681"
                    height="6.72818"
                    transform="rotate(-45 0.969925 0.434853)"
                    fill="black"
                  />
                  <rect x="5.68907" width="0.560681" height="6.72818" transform="rotate(45 5.68907 0)" fill="black" />
                </svg>

              </button>

              <button
                type="button"
                className="queue-clear btn"
                onClick={() => {
                  this.setState({
                    queue: [],
                  });
                }}
              >
                Clear
              </button>

              <ol className="queue">
                {currentQueue}
              </ol>
            </div>
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
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  showQueue: PropTypes.bool.isRequired,
  toggleQueueModal: PropTypes.func.isRequired,
  interval: PropTypes.number,
};

TimerController.defaultProps = {
  interval: null,
};

export default TimerController;
