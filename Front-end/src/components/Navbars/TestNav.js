import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { USER_SERVER } from '../../components/Config';
import sureDark from '../../assets/img/sureDark.svg';

// reactstrap components
import {
  Badge,
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from 'reactstrap';

// core components

function TestNav(props) {
  const user = useSelector((state) => state.user);
  const [bodyClick, setBodyClick] = React.useState(false);

  const logoutHandler = () => {
    axios
      .get(`${USER_SERVER}/auth/logout`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          props.history.push('/login');
        } else {
          alert('Log Out Failed');
        }
      });
  };

  if (user.userData && user.userData.isAuth && user.userData.isAdmin) {
    return (
      <>
        {bodyClick ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle('nav-open');
              setBodyClick(false);
            }}
          />
        ) : null}
        <div style={{ position: 'fixed', top: 0, zIndex: 100, width: '100%' }}>
          <div id="navbar-full">
            <div className="navigation-example">
              <Navbar style={{ background: '#fff' }} expand="lg">
                <Container>
                  <NavbarBrand href="/" onClick={(e) => e.preventDefault()}>
                    <img src={sureDark} alt="TAYAKN Logo" width="30%" />
                  </NavbarBrand>
                  <button
                    className="navbar-toggler navbar-toggler-right"
                    id="navbarSupportedContent4"
                    type="button"
                    onClick={() => {
                      document.documentElement.classList.toggle('nav-open');
                      setBodyClick(true);
                    }}
                  >
                    <span className="navbar-toggler-bar" />
                    <span className="navbar-toggler-bar" />
                    <span className="navbar-toggler-bar" />
                  </button>
                  <UncontrolledCollapse
                    navbar
                    toggler="#navbarSupportedContent4"
                  >
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Discover
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {user.userData.name}
                        </NavLink>
                      </NavItem>
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle
                          className="btn-just-icon"
                          color="warning"
                          data-toggle="dropdown"
                        >
                          <i className="nc-icon nc-sound-wave" />
                        </DropdownToggle>
                        <DropdownMenu
                          className="dropdown-notification"
                          tag="ul"
                          right
                        >
                          <li className="no-notification">You're all clear!</li>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle
                          className="btn-just-icon"
                          color="danger"
                          data-toggle="dropdown"
                        >
                          <i className="nc-icon nc-email-85" />
                        </DropdownToggle>
                        <DropdownMenu
                          className="dropdown-wide dropdown-notification"
                          tag="ul"
                          right
                        >
                          <DropdownItem header>
                            You have 7 unread notifications
                          </DropdownItem>
                          <li>
                            <ul className="dropdown-notification-list scroll-area">
                              <a
                                className="notification-item"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <div className="notification-text">
                                  <Badge color="success" pill>
                                    <i className="nc-icon nc-chat-33" />
                                  </Badge>
                                  <span className="message">
                                    <b>Patrick</b>
                                    mentioned you in a comment.
                                  </span>
                                  <br />
                                  <span className="time">20min ago</span>
                                  <Button
                                    className="btn-just-icon read-notification btn-round"
                                    color="default"
                                  >
                                    <i className="nc-icon nc-check-2" />
                                  </Button>
                                </div>
                              </a>
                              <a
                                className="notification-item"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <div className="notification-text">
                                  <Badge color="info" pill>
                                    <i className="nc-icon nc-alert-circle-i" />
                                  </Badge>
                                  <span className="message">
                                    Our privacy policy changed!
                                  </span>
                                  <br />
                                  <span className="time">1day ago</span>
                                </div>
                              </a>
                              <a
                                className="notification-item"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <div className="notification-text">
                                  <Badge color="warning" pill>
                                    <i className="nc-icon nc-ambulance" />
                                  </Badge>
                                  <span className="message">
                                    Please confirm your email address.
                                  </span>
                                  <br />
                                  <span className="time">2days ago</span>
                                </div>
                              </a>
                              <a
                                className="notification-item"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <div className="notification-text">
                                  <Badge color="primary" pill>
                                    <i className="nc-icon nc-paper" />
                                  </Badge>
                                  <span className="message">
                                    Have you thought about marketing?
                                  </span>
                                  <br />
                                  <span className="time">3days ago</span>
                                </div>
                              </a>
                            </ul>
                          </li>
                          {/* end scroll area */}
                          <li className="dropdown-footer">
                            <ul className="dropdown-footer-menu">
                              <li>
                                <a
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Mark all as read
                                </a>
                              </li>
                            </ul>
                          </li>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle
                          data-toggle="dropdown"
                          height="30"
                          width="30"
                          tag={NavLink}
                        >
                          <div className="profile-photo-small">
                            <img
                              alt="..."
                              className="img-circle img-responsive img-no-padding"
                              src={require('assets/img/faces/erik-lucatero-2.jpg')}
                            />
                          </div>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-danger" right>
                          <DropdownItem header>Dropdown header</DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Separated link
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another separated link
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                  </UncontrolledCollapse>
                </Container>
              </Navbar>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TestNav;
