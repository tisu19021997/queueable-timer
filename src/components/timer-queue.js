/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

function TimerQueue(props) {
  const {
    id, label, formattedTime, deleteItem,
  } = props;

  const deleteItemHandle = (event) => {
    const id = event.currentTarget.getAttribute('data-item');

    return deleteItem(id);
  };

  return (
    <li key={id} className="queue-item">
      <button
        data-item={id}
        type="button"
        className=""
        onClick={deleteItemHandle}
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
