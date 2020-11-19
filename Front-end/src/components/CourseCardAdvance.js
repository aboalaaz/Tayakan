import React from 'react';
import axios from 'axios';
import Style from 'style-it';

import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  UncontrolledTooltip,
  Checkbox,
} from 'reactstrap';
import GridItem from './Grid/GridItem';

export default function CourseCardAdvance(props) {
  // const [hover, setHover] = React.useState(false);

  return (
    <Col>
      <div
        id={props.elmId}
        onClick={props.onClick}
        style={{ cursor: 'pointer' }}
      >
        {props.photo ? (
          <>
            <Card
              data-color="purple"
              style={{
                width: props.width,
                height: props.height,
                backgroundImage: `url(${props.photo})`,
                backgroundSize: '100% 100%',
              }}
            >
              <CardBody
                className="text-center"
                style={{ marginBottom: '5px' }}
              ></CardBody>

              <div>
                <h2
                  style={{
                    fontSize: 10,
                    color: '#000',
                    textAlign: 'center',
                  }}
                >
                  {props.name}
                </h2>
              </div>
            </Card>
          </>
        ) : null}
      </div>
    </Col>
  );
}
