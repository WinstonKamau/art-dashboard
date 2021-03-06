import React, { Component } from 'react';
import { Modal, TransitionablePortal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SemanticToastContainer } from 'react-semantic-toasts';

import '../../_css/ModalComponent.css';

export default class ArtModal extends Component {
  state = { modalOpen: this.props.open || false };

  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    const { children, closeIcon, closeOnEscape, closeOnDimmerClick, modalSize } = this.props;
    const { modalOpen } = this.state;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child,
        { toggleModal: this.toggleModal }
      )
    );

    return (
      <span className={this.props.className}>
        <span
          tabIndex="-1"
          role="button"
          onClick={this.toggleModal}
          onKeyUp={() => {}}
        >
          {this.props.trigger}
        </span>

        <TransitionablePortal open={modalOpen} transition={{ animation: 'scale', duration: 500 }}>
          <Modal
            className="art-modal"
            open={modalOpen}
            onClose={this.toggleModal}
            size={modalSize}
            closeIcon={closeIcon}
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
          >
            <Modal.Header>{this.props.modalTitle} <div className="underline" /></Modal.Header>
            <Modal.Content>
              <Modal.Description style={{ width: '100%' }}>
                {childrenWithProps}
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </TransitionablePortal>
        <SemanticToastContainer />
      </span>
    );
  }
}

ArtModal.propTypes = {
  children: PropTypes.node,
  modalTitle: PropTypes.string,
  trigger: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number
  ]),
  className: PropTypes.string,
  modalSize: PropTypes.string,
  open: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  closeOnDimmerClick: PropTypes.bool,
  closeIcon: PropTypes.bool
};

ArtModal.defaultProps = {
  children: <br />,
  modalTitle: '',
  modalSize: 'small',
  open: false,
  closeOnEscape: true,
  closeOnDimmerClick: true,
  closeIcon: true
};
