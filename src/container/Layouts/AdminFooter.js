import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class AdminFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span className="ml-auto">&copy; 2019 make by Ta Quang Hieu</span>
      </React.Fragment>
    );
  }
}

AdminFooter.propTypes = propTypes;
AdminFooter.defaultProps = defaultProps;

export default AdminFooter;
