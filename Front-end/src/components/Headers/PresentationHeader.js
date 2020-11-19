/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core comments

function PresentationHeader() {
  return (
    <>
      <div className="wrapper" >
        <div
          className="page-header section-dark"
          style={{
            backgroundImage:
              "url(" + require("assets/img/Header1.jpg") + ")",
          }}
        >
          <div className="content-center">
            <Container>
            <div style={{paddingLeft: '30rem' , width: '80rem'}}>

     
                <div
                  className="description"
                 
                >
                 
                 

                  <div style={{  textAlign: 'center', color: 'black', fontSize: 60, opacity: '50%'}}>
                    <span style={{ color: 'yellow', textShadow: '2px 2px 4px #000000'  }}>ʻʻ</span>Knowledge Measuring and Improving Test
                    <span style={{ color: 'yellow', textShadow: '2px 2px 4px #000000' }}>ʼʼ</span>
                  </div>
                </div>
            </div>
            </Container>
          </div>
         



        </div>
      </div>
    </>
  );
}

export default PresentationHeader;
