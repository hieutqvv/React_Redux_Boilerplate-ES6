import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'react-bootstrap';

class Loading extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Modal centered className="loading" fade={false} isOpen={this.props.isRequesting} zIndex="10000">
        <ModalBody>
          <div className="animated fadeIn pt-1 sk-cube-grid text-center">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);
  newState.isRequesting = storeState.isRequesting;

  return newState;
};
export default connect(
  mapStateToProps
)(Loading);
