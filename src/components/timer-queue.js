/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

function TimerQueue(props) {
  const { id, label, formattedTime } = props;
  return (
    <li key={id} className="queue__item">
      <span className="queue__label">{label}</span>
      <span className="queue__time">{formattedTime}</span>
    </li>
  );
}

TimerQueue.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  formattedTime: PropTypes.string.isRequired,
};

export default TimerQueue;
