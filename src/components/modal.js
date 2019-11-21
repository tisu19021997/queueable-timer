/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { close } = this.props;
    close();
  }

  render() {
    const { children, center } = this.props;

    const classList = ['modal'];

    if (center) {
      classList.push('modal--center');
    }

    const modalClassName = classList.join(' ');

    return (
      <div className={modalClassName}>
        <div className="modal-content">
          {children}
          <button type="button" className="modal-close" onClick={this.closeModal}>
            <svg width="24" height="24" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.969925" y="0.434853" width="0.560681" height="6.72818" transform="rotate(-45 0.969925 0.434853)" fill="black" />
              <rect x="5.68907" width="0.560681" height="6.72818" transform="rotate(45 5.68907 0)" fill="black" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  center: PropTypes.bool,
  close: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  center: false,
};


export default Modal;
