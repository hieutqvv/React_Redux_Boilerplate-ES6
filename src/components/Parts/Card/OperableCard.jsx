import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Card, CardBody, CardHeader} from 'reactstrap';
import 'react-table/react-table.css';
import OperationPanel from './OperationPanel';

/**
 * OperableCard component
 *
 * - Implement operation method for components included.
 */
class OperableCardComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    onReload: PropTypes.func,
    onCollapseConfig: PropTypes.func,
    onCreate: PropTypes.func,
    /** The component display when the property is true. */
    displayable: PropTypes.bool,
    configurable: PropTypes.bool,
  };

  static defaultProps = {
    displayable: false,
    configurable: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isDisplayOperationPanel: false,
    };
    this.toggleConfig = this.toggleConfig.bind(this);
  }

  /**
   * Toggle display operation panel for the component inside `CardBody`.
   */
  toggleConfig() {
    this.setState({isDisplayOperationPanel: !this.state.isDisplayOperationPanel});
  }

  render() {
    return (
      <div className={this.props.displayable ? 'animated fadeIn' : 'hidden'}>
        <Card>
          <CardHeader>
            <FormattedMessage id={this.props.title}/>
            <div className="card-header-actions">

              {this.props.configurable && <button
                onClick={this.toggleConfig}
                className="card-header-action btn btn-setting"
                title={this.props.intl.formatMessage({id: 'Configuration'})}
              ><i className="fa fa-cog"/></button>}

              {this.props.onCreate && <button
                onClick={this.props.onCreate}
                className="card-header-action btn btn-setting"
                title={this.props.intl.formatMessage({id: 'Create'})}
              ><i className="fa fa-plus"/></button>}

            </div>
          </CardHeader>
          <CardBody>{this.props.children}</CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.http = storeState.controlledHttpClient;

  return newState;
};

const mapDispatchToProps = dispatch => {
  return {};
};

const OperableCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(OperableCardComponent));
export default OperableCard;
