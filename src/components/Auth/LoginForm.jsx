import React, {Component} from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
  Popover,
  PopoverBody,
} from 'reactstrap';
import { FiMail, FiLock } from 'react-icons/fi';
// import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { updateMe, updateIdentity, isRequesting, raiseError, setTokenOnHttpClient } from '../../lib/redux/actions';
import 'react-toastify/dist/ReactToastify.css';

class LoginFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isOpenLoginPopover: false,
      isOpenPasswordResetPopover: false,
    };
    this.onLoginButton = this.onLoginButton.bind(this);
    this.onPasswordResetButton = this.onPasswordResetButton.bind(this);
  }

  get cannotDoLogin() {
    return !(this.state.email && this.state.password);
  }

  get cannotDoPasswordReset() {
    return !this.state.email;
  }

  onLoginButton(e) {
    e.preventDefault();
    this.props.onLoginButton({component: this, event: e, http: this.props.http});
  }

  onPasswordResetButton(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Modal centered isOpen={this.props.visible}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <Alert isOpen={this.props.isError} color="danger">
            {/* <FormattedMessage id={this.props.errorDescription}/> */}
          </Alert>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text"><FiMail/></span></InputGroupAddon>
            <Input
              type="email"
              name="email"
              value={this.state.email}
              placeholder='E-mail address'
              onChange={e => this.setState({email: e.currentTarget.value})}
            />
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text"><FiLock/></span></InputGroupAddon>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              placeholder='Password'
              onChange={e => this.setState({password: e.currentTarget.value})}
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            id="password-reset-button"
            color="warning"
            disabled={this.cannotDoPasswordReset}
            onClick={this.onPasswordResetButton}
            onMouseOver={e => {
              if (this.cannotDoPasswordReset) {
                this.setState({isOpenPasswordResetPopover: true});
              }
            }}
            onMouseLeave={e => {
              this.setState({isOpenPasswordResetPopover: false});
            }}
          >Forgot password</Button>{' '}
          <Button
            id="login-button"
            color="primary"
            disabled={this.cannotDoLogin}
            onClick={this.onLoginButton}
            onMouseOver={e => {
              if (this.cannotDoLogin) {
                this.setState({isOpenLoginPopover: true});
              }
            }}
            onMouseLeave={e => {
              this.setState({isOpenLoginPopover: false});
            }}
          >Login</Button>
          <Popover
            placement="bottom"
            isOpen={this.state.isOpenLoginPopover}
            target="login-button"
          >
            <PopoverBody>Please enter email address and password.</PopoverBody>
          </Popover>
          <Popover
            placement="bottom"
            isOpen={this.state.isOpenPasswordResetPopover}
            target="password-reset-button"
          >
            <PopoverBody>Please enter email address.</PopoverBody>
          </Popover>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newProps = Object.assign({}, ownProps);

  newProps.visible = storeState.identity.authorizedAt === null;
  newProps.isError = storeState.lastErrorDescription.length > 0;
  newProps.errorDescription = storeState.lastErrorDescription;
  newProps.http = storeState.http;

  return newProps;
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginButton: ({component, http}) => {
      dispatch(isRequesting(true));
      // Request to API / authentications
      http({
        method: 'post',
        url: '/authentications',
        data: {
          sid: 1,
          email: component.state.email,
          password: component.state.password,
        },
      }).then(response => {
        dispatch(updateIdentity(response.data));
        dispatch(setTokenOnHttpClient(response.data));
        http({url: '/me'}).then(({data}) => {
          dispatch(updateMe({me: data}));
          dispatch(isRequesting(false));
          component.props.onLoginDone();
        });
      }).catch(error => {
        // Error occurred
        console.log(error)
        dispatch(raiseError(error));

        dispatch(isRequesting(false));
      });
    },
  };
};

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormComponent);

export default LoginForm;