import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../components/Config';
import { useSelector, useStore } from 'react-redux';
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
import Style from 'style-it';
import ColorNavbarFixed from 'components/Navbars/ColorNavbarFixed';
import QuestionsCreate from '../../components/Questions/QuestionsCreate';
import QuestionsCard from '../../components/Questions/QuestionsCard';
import Dropdown_Menu from '../../components/Dropdown/Dropdown_Menu';

function Test() {
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <Style>{`html, body {
  margin:0px;
  height:100%;
  background:#eeeeee;
}

.box {
  height:100%;
  margin: 8rem 0 0 0;
  
}`}</Style>
      <div>
        <ColorNavbarFixed />
      </div>
      <div className="box">
        <QuestionsCard />
      </div>
    </Container>
  );
}

export default Test;
