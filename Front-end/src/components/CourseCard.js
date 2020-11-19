import React from 'react';
import axios from 'axios';
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
  // const [photo, setPhoto] = React.useState();

  // React.useEffect(() => {
  //   if (!photo) {
  //     axios
  //       .get(
  //         `http://localhost:5000/uploads/photo_5f881cc6bbfa5069586708b7.jpg`,
  //         {
  //           responseType: 'arraybuffer',
  //         },
  //         { withCredentials: true }
  //       )
  //       .then((response) => {
  //         let blob = new Blob([response.data], {
  //           type: response.headers['content-type'],
  //         });
  //         let image = URL.createObjectURL(blob);

  //         setPhoto(image);
  //       });
  //   }
  //   // console.log(photo);s
  // }, [photo]);
  // console.log(photo);

  return (
    <Col>
      {props.photo ? (
        <Card
          data-color="purple"
          id={props.id}
          style={{
            width: props.width,
            height: props.height,
            backgroundImage: `url(${props.photo})`,
            backgroundSize: '100% 100%',
          }}
        >
          <CardBody className="text-center">
            <Container>
              <Row>
                <div>
                  {props.btnTrue ? (
                    <Button
                      className="btn-round btn-just-icon mr-1"
                      color="neutral"
                      href="#pablo"
                      outline
                      id="tooltip275070155"
                      onClick={props.click}
                    >
                      <i className="fa fa-check" />
                    </Button>
                  ) : (
                    <Button
                      className="btn-round btn-just-icon mr-1"
                      color="neutral"
                      href="#pablo"
                      outline
                      id="tooltip275070155"
                      onClick={props.click}
                    >
                      <i className="fa fa-remove" />
                    </Button>
                  )}
                </div>
              </Row>
            </Container>
            <h4 className="card-category ">{props.name}</h4>
            <small>{props.code}</small>
            {/* <h5 className="card-category">{props.code}</h5> */}
            <CardTitle tag="h5"></CardTitle>

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
      ) : null}
    </Col>
  );
}
