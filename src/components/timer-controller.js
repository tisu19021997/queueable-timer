import React from "react";
import TimerQueue from "./timer-queue";
import * as helper from "../helper/function";

class TimerController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      count: 0,
      running: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.queue = this.queue.bind(this);
    this.runTimer = this.runTimer.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;

    this.setState({
      [target.name]: target.value
    });
  }

  queue(e) {
    e.preventDefault();

    let hour = this.state.hour ? this.state.hour : 0;
    let minute = this.state.min ? this.state.min : 0;
    let second = this.state.sec ? this.state.sec : 0;

    let time = helper.processTime({ hour, minute, second });

    if (hour || minute || second) {
      this.setState({
        count: this.state.count + 1,
        queue: [
          ...this.state.queue,
          {
            id: this.state.count,
            hour: time.hour,
            minute: time.minute,
            second: time.second,
            formattedTime: `${helper.timeToString(time.hour)} : ${helper.timeToString(time.minute)} : ${helper.timeToString(time.second)}`
          }
        ]
      });
    }
  }

  runTimer() {
    let topOfQueue = this.state.queue.shift();

    if (topOfQueue) {
      this.setState({
        running: topOfQueue
      });

      this.props.onRun(topOfQueue);
    }
  }

  render() {
    let queue;

    if (this.state.queue.length) {
      queue = this.state.queue.map(item => {
        return (
          <TimerQueue
            key={item.id}
            formattedTime={item.formattedTime}
            onRun={this.runTimer}
          />
        );
      });
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
            name="min"
            type="number"
            placeholder="minute"
          />
          <input
            onChange={this.handleInputChange}
            name="sec"
            type="number"
            placeholder="second"
          />
          <input type="submit" value="Add to queue" />
          <button type="button" onClick={this.runTimer}>
            Run
          </button>
        </form>

        <div className="queue">{queue}</div>
      </div>
    );
  }
}

export default TimerController;
