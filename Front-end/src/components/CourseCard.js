import React from 'react';
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
export default function CourseCard(props) {
  const [clicked, setClicked] = React.useState(true);
  const handleCliek = () => {
    if (clicked) {
      return setClicked(false), console.log(clicked);
    }
    if (!clicked) {
      return setClicked(true), console.log(clicked);
    }
    console.log(clicked);
    return props.clicked;
  };
  const sendProps = () => {
    return props.click;
  };

  return (
    <Col>
      <Card data-color="purple" id={props.id}>
        <CardBody className="text-center">
          <Container>
            <Row>
              <Button
                className="btn-round btn-just-icon mr-1"
                color="neutral"
                href="#pablo"
                outline={props.checked}
                id="tooltip275070155"
                onClick={props.click}

                // onClick={() => {
                //   return handleCliek();
                // }}
              >
                <i className="fa fa-check" />
              </Button>
              {/* <UncontrolledTooltip delay={0} target="tooltip275070155">
                {props.title}
              </UncontrolledTooltip> */}
            </Row>
          </Container>
          <h4 className="card-category ">{props.name}</h4>
          <small>{props.code}</small>
          {/* <h5 className="card-category">{props.code}</h5> */}
          <CardTitle tag="h5">
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              "Good Design Is as Little Design as Possible "
            </a>
          </CardTitle>

          <CardFooter className="text-center">
            <Button
              className="btn-neutral btn-round"
              color="default"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              {/* <i className="fa fa-newspaper-o mr-1" /> */}
              Choose Subjects
            </Button>
          </CardFooter>
        </CardBody>
      </Card>
    </Col>
  );
}
