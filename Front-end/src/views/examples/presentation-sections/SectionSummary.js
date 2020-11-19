import React from "react";
import lamp from '../../../assets/img/lamp.svg';
import rocet from '../../../assets/img/rocet.svg';
import trans from '../../../assets/img/trans.svg';
// 


// reactstrap components
import { Container, Row, Col } from "reactstrap";
// core components

function SectionSummary() {
  return (
    <>
      <div className="section section-dark section-summary">
        <Container className='text-center' style={{color: 'white'}}>
        <h3>PROJECT OBJECTIVES</h3>
          <Row>
            <Col md="4">
              <div className="info">
                <div className="icon icon-danger">
                <img src={lamp} alt="TAYAKN Logo" width="30%" />
                </div>
                <div className="description">
                  <h4 className="info-title">Huge Number of Questions</h4>
                  <p>
                  the project will help everyone who wants to learn computer science courses with high GPA with achieving course learning outcomes in easy ways.

                  </p>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="info">
                <div className="icon icon-danger">
                <img src={rocet} alt="TAYAKN Logo" width="30%" />
                </div>
                <div className="description">
                  <h4 className="info-title">Monitor performance </h4>
                  <p>
                  Provide comfort for students so that they can anywhere and anytime review their knowledge in computer science.

                  </p>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="info">
                <div className="icon icon-danger">
                <img src={trans} alt="TAYAKN Logo" width="30%" />
                </div>
                <div className="description">
                  <h4 className="info-title">Main Objectives</h4>
                  <p>
                  To achieve King Khalid University missions, visions and objectives in Computer Since.

                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionSummary;
