import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { onChangeLanguage } from '../../lib/redux/actions'
import { DropdownMenu, DropdownToggle, Nav, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
import avatar from '../../assets/img/avatars/4.jpg';


class AdminHeader extends Component {
  constructor(props) {
    super(props);

    this.handleLanguage = this.handleLanguage.bind(this);
  }

  handleLanguage = (locale) => {
    this.props.onChangeLanguage(locale);
  }

  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'Scuti asia' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Scuti asia' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown>
            <DropdownToggle id="dropdown-basic">
              <FormattedMessage id={this.props.locale} />
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem
                onClick={() => this.handleLanguage('vi')}
                key="vi"
                active={this.props.locale === 'vi' && true}
              >
                <FormattedMessage id="Vietnameses" />
              </DropdownItem>
              <DropdownItem
                onClick={() => this.handleLanguage('en')}
                key="en"
                active={this.props.locale === 'en' && true}
              >
                <FormattedMessage id="English" />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img
                src={avatar}
                className="img-avatar"
                alt='avatar'
              />
            </DropdownToggle>
            <DropdownMenu
              right
              style={{
                right: 'auto',
                height: 'auto',
                position: 'absolute',
                willChange: 'transform',
                top: '0px',
                left: '0px',
                transform: 'translate3d(-132px, 35px, 0px)'
              }}
            >
              <DropdownItem tag={Link} to="/logout"><i className="fa fa-lock"></i>
                <FormattedMessage id="Logout" />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newProps = Object.assign({}, ownProps);

  newProps.locale = storeState.locale;

  return newProps;
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeLanguage: (locale) => dispatch(onChangeLanguage(locale))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader)
