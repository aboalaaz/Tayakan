import React, { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';

// nodejs library that concatenates strings
import classnames from 'classnames';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
import { USER_SERVER } from '../../components/Config';

// reactstrap components
import {
  Badge,
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
  Input,
  Form,
} from 'reactstrap';
// core components

import sure3 from '../../assets/img/sure3.svg';
import sureDark from '../../assets/img/sureDark.svg';

function ColorNavbar(props) {
  const user = useSelector((state) => state.user);

  const [navbarColor, setNavbarColor] = React.useState('');
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [source, setSource] = React.useState(null);

  const [inputstyle, setInputStyle] = useState({
    borderRadius: 0,
    outline: 'none',
    borderWidth: '0 0 2px',
    backgroundColor: 'transparent',
    borderColor: '#52575d',
    borderStyle: 'solid',
    borderRedius: '0',
  });
  const [btncolor, setBtncolor] = useState();

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
  useEffect(() => {
    // if (user.userData) {
    //   axios
    //     .get(
    //       `http://localhost:5000/uploads/photo_${user.userData._id}.JPG`,
    //       {
    //         responseType: 'arraybuffer',
    //       },
    //       { withCredentials: true }
    //     )
    //     .then((response) => {
    //       let blob = new Blob([response.data], {
    //         type: response.headers['content-type'],
    //       });
    //       let image = URL.createObjectURL(blob);
    //       if (source === null) {
    //         setSource(image);
    //       } else {
    //         return null;
    //       }
    //     });
    // }

    // let headroom = new Headroom(document.getElementById('navbar-main'));
    // headroom.init();
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop >= 499 ||
        document.body.scrollTop >= 499
      ) {
        setNavbarColor('');
        setInputStyle({
          borderRadius: 0,
          outline: 'none',
          borderWidth: '0 0 2px',
          backgroundColor: 'transparent',
          borderColor: '#52575d',
          borderStyle: 'solid',
          borderRedius: '0',
        });
        setBtncolor({ color: '#52575d' });
      }
    };
    window.addEventListener('scroll', updateNavbarColor);
    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor);
    };
  });

  if (user.userData && user.userData.isAuth && user.userData.isAdmin) {
    return (
      <>
        {bodyClick ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle('nav-open');
              setBodyClick(false);
              setCollapseOpen(false);
            }}
          />
        ) : null}
        <Navbar
          className={classnames('fixed-top', navbarColor)}
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <div className="navbar-translate">
              <NavbarBrand id="navbar-brand " to="/" tag={Link}>
                <img src={sureDark} alt="TAYAKN Logo" width="30%" />
              </NavbarBrand>
              <button
                className="navbar-toggler"
                id="navigation"
                type="button"
                onClick={() => {
                  document.documentElement.classList.toggle('nav-open');
                  setBodyClick(true);
                  setCollapseOpen(true);
                }}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <Collapse navbar isOpen={collapseOpen}>
              <Nav className="ml-auto" navbar>
                {/* <Form className="form-inline mr">
                  <Input
                    className="mr-sm-2  "
                    placeholder="Search"
                    type="text"
                    style={inputstyle}
                    inputstyle={{ color: 'red' }}
                  />

                  <Button
                    style={{ border: 0 }}
                    className=""
                    outline={true}
                    type="submit"
                  >
                    <i
                      style={btncolor}
                      aria-hidden={true}
                      className="nc-icon nc-zoom-split"
                    />
                  </Button>
                </Form> */}

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="mr-auth" color="default" caret nav>
                    <Badge className="" color="success" pill>
                      ADMIN
                    </Badge>{' '}
                    {user.userData.name}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-danger" right>
                    <DropdownItem to="/profile" tag={Link}>
                      <i className="nc-icon nc-trophy" />
                      profile
                    </DropdownItem>
                    <DropdownItem to="/dashboard" tag={Link}>
                      <i className="nc-icon nc-settings-gear-65" />
                      Dashboard
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      target="_blank"
                      style={{ color: 'red', textAlign: 'center' }}
                      onClick={logoutHandler}
                    >
                       sign out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Avatar image={source} bw={50} bh={50} iw={80} ih={80} />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else if (
    user.userData &&
    user.userData.isAuth &&
    user.userData.role == 'supervisor'
  ) {
    return (
      <>
        {bodyClick ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle('nav-open');
              setBodyClick(false);
              setCollapseOpen(false);
            }}
          />
        ) : null}
        <Navbar
          className={classnames('fixed-top', navbarColor)}
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <div className="navbar-translate">
              <NavbarBrand id="navbar-brand " to="/" tag={Link}>
                <img src={sureDark} alt="TAYAKN Logo" width="30%" />
              </NavbarBrand>
              <button
                className="navbar-toggler"
                id="navigation"
                type="button"
                onClick={() => {
                  document.documentElement.classList.toggle('nav-open');
                  setBodyClick(true);
                  setCollapseOpen(true);
                }}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <Collapse navbar isOpen={collapseOpen}>
              <Nav className="ml-auto" navbar>
                {/* <Form className="form-inline mr">
                  <Input
                    className="mr-sm-2  "
                    placeholder="Search"
                    type="text"
                    style={inputstyle}
                    inputstyle={{ color: 'red' }}
                  />

                  <Button
                    style={{ border: 0 }}
                    className=""
                    outline={true}
                    type="submit"
                  >
                    <i
                      style={btncolor}
                      aria-hidden={true}
                      className="nc-icon nc-zoom-split"
                    />
                  </Button>
                </Form> */}

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="mr-auth" color="default" caret nav>
                    <Badge className="" color="success" pill>
                      Supervisor
                    </Badge>{' '}
                    {user.userData.name}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-danger" right>
                    <DropdownItem to="/profile" tag={Link}>
                      <i className="nc-icon nc-trophy" />
                      profile
                    </DropdownItem>
                    <DropdownItem to="/settings" tag={Link}>
                      <i className="nc-icon nc-chart-bar-32" />
                      Dashboard
                    </DropdownItem>
                    <DropdownItem to="/settings" tag={Link}>
                      <i className="nc-icon nc-circle-10" />
                      Dashboard
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      target="_blank"
                      style={{ color: 'red' }}
                      onClick={logoutHandler}
                    >
                      <i className="nc-icon nc-touch-id" />
                      تسجيل الخروج
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Avatar image={source} bw={50} bh={50} iw={80} ih={80} />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else if (
    user.userData &&
    user.userData.isAuth &&
    user.userData.role == 'user'
  ) {
    return (
      <>
        {bodyClick ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle('nav-open');
              setBodyClick(false);
              setCollapseOpen(false);
            }}
          />
        ) : null}
        <Navbar
          className={classnames('fixed-top', navbarColor)}
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <div className="navbar-translate">
              <NavbarBrand id="navbar-brand " to="/" tag={Link}>
                <img src={sureDark} alt="TAYAKN Logo" width="30%" />
              </NavbarBrand>
              <button
                className="navbar-toggler"
                id="navigation"
                type="button"
                onClick={() => {
                  document.documentElement.classList.toggle('nav-open');
                  setBodyClick(true);
                  setCollapseOpen(true);
                }}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <Collapse navbar isOpen={collapseOpen}>
              <Nav className="ml-auto" navbar>
                {/* <Form className="form-inline mr">
                  <Input
                    className="mr-sm-2  "
                    placeholder="Search"
                    type="text"
                    style={inputstyle}
                    inputstyle={{ color: 'red' }}
                  />

                  <Button
                    style={{ border: 0 }}
                    className=""
                    outline={true}
                    type="submit"
                  >
                    <i
                      style={btncolor}
                      aria-hidden={true}
                      className="nc-icon nc-zoom-split"
                    />
                  </Button>
                </Form> */}

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="mr-auth" color="default" caret nav>
                    <Badge className="" color="success" pill>
                      طالب
                    </Badge>{' '}
                    {user.userData.name}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-danger" right>
                    <DropdownItem to="/profile" tag={Link}>
                      <i className="nc-icon nc-trophy" />
                      ملف الشخصي
                    </DropdownItem>
                    <DropdownItem to="/settings" tag={Link}>
                      <i className="nc-icon nc-trophy" />
                      إنجازك
                    </DropdownItem>
                    <DropdownItem to="/settings" tag={Link}>
                      <i className="nc-icon nc-chart-bar-32" />
                      شارك
                    </DropdownItem>
                    <DropdownItem to="/settings" tag={Link}>
                      <i className="nc-icon nc-circle-10" />
                      الملف الشخصي
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      target="_blank"
                      style={{ color: 'red' }}
                      onClick={logoutHandler}
                    >
                      <i className="nc-icon nc-touch-id" />
                      تسجيل الخروج
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Avatar image={source} bw={50} bh={50} iw={80} ih={80} />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        {bodyClick ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle('nav-open');
              setBodyClick(false);
              setCollapseOpen(false);
            }}
          />
        ) : null}
        <Navbar
          className={classnames('fixed-top', navbarColor)}
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <div className="navbar-translate">
              <NavbarBrand id="navbar-brand " to="/" tag={Link}>
                <img src={sureDark} alt="TAYAKN Logo" width="40%" />
              </NavbarBrand>
              <button
                className="navbar-toggler"
                id="navigation"
                type="button"
                onClick={() => {
                  document.documentElement.classList.toggle('nav-open');
                  setBodyClick(true);
                  setCollapseOpen(true);
                }}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <Collapse navbar isOpen={collapseOpen}>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button
                    className="btn-round"
                    outline
                    color="warning"
                    style={{ fontFamily: 'Lemonada' }}
                    onClick={() => props.history.push('/login')}
                  >
                    سجل
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="btn-round"
                    outline
                    color="warning"
                    style={{ fontFamily: 'Lemonada' }}
                  >
                    تعرف على تَـــيَـقن
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default withRouter(ColorNavbar);
