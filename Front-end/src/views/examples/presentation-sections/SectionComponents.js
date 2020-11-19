import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function SectionComponents() {
  return (
    <>
      <div className="section section-components section-dark">
        <Row>
          <Col lg="6" md="12">
            <div className="image-container">

              <img
                alt="..."
                className="table-img"
                src={require("assets/img/test.png")}
              />


              <img
                alt="..."
                className="coloured-card-btn-img"
                src={require("assets/img/dashboard.png")}
              />
              <img
                alt="..."
                className="coloured-card-img"
                src={require("assets/img/profile.png")}
              />




            </div>
          </Col>
          <Col className="ml-auto mr-auto" lg="4" md="10">
            <Container className="basic-container">
              <h3 className="title"></h3>
              <h6 className="category">The core elements of your website</h6>
              <h5 className="description">
              The website entitled “Knowledge Measuring and Improving Test” platform will cover the Department of Computer Science core subjects and current and alumni students at King Khaled University
              </h5>
            </Container>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SectionComponents;
