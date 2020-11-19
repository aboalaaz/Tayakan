import React, { Component, useState, useEffect } from 'react';
import Majors from '../../components/Dashboard/Majors';
import Courses from '../../components/Dashboard/Courses';
import ColorNavbarFixed from '../../components/Navbars/ColorNavbarFixed';
import QuestionsCreate from '../../components/Questions/QuestionsCreate';

import {
  Button,
  ButtonGroup,
  Label,
  FormGroup,
  Input,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Card,
} from 'reactstrap';
function Admin_Dashboard() {
  return (
    <>
      <ColorNavbarFixed />

      <div style={{ paddingTop: '4rem', height: 1000,            backgroundColor: '#eeeeee'
 }}>

        <Container>
<div style={{marginTop: '5rem'}}>


        <QuestionsCreate />

          <hr style={{ borderColor: 'black', opacity: '10%', width: '30rem' }} />

          <Row>
            <Col xs="6">
              <Majors />
            </Col>
            <Col xs="6">
              <Courses />
            </Col>
          </Row>
</div>
        </Container>
      </div>
    </>
  );
}

export default Admin_Dashboard;
