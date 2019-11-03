import React from "react";
import TimerController from "./timer-controller";
import { timeToString, timeToSecond, secondToTime } from "../helper/function";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      queue: []
    };

    this.onRun = this.onRun.bind(this);
    this.onQueue = this.onQueue.bind(this);
  }

  onRun(time) {
    this.setState({
      running: {
        hour: time.hour,
        minute: time.minute,
        second: time.
      },
      time: `${timeToString(time.hour)} : ${timeToString(time.minute)} : ${timeToString(time.second)}`
    });
  }

  onQueue(time) {
    this.setState({
      queue: time
    });
  }

  countDown(time) {
    // decrease time by 1 every second
    setInterval(() => {
      let timeInSecond = timeToSecond(time);
      let timeToDisplay = timeToString(secondToTime(time));
  
      timeInSecond -= 1;
      
    }, 1000)
  }
  

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.time}</h1>
        </div>
        <div>
          <TimerController onRun={this.onRun} onQueue={this.onQueue} />
        </div>
        <div></div>
      </div>
    );
  }
}

export default Timer;
