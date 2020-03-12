import React, {Component} from 'react';
import { DropdownMenu, DropdownToggle, Nav, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
import avatar from '../../assets/img/avatars/4.jpg';


class AdminHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
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
              <DropdownItem tag={Link} to="/logout"><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />
      </React.Fragment>
    )
  }
}

export default AdminHeader
