/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

function TimerQueue(props) {
  const { id, label, formattedTime } = props;
  return (
    <li key={id} className="queue-item">
      <span className="queue-label one-line">{label}</span>
      <span className="queue-time">{formattedTime}</span>
    </li>
  );
}

TimerQueue.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  formattedTime: PropTypes.string.isRequired,
};

export default TimerQueue;
