import React from 'react';
// impotr axios
import axios from 'axios';
import sure_logo from '../../assets/img/sure_logo.svg';

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components
import ColorNavbar from 'components/Navbars/ColorNavbar.js';

function RegisterPage() {
  document.documentElement.classList.remove('nav-open');

  const handleForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    axios.post('http://localhost:5000/api/v1/register', { data });
  };

  React.useEffect(() => {
    document.body.classList.add('register-page');
    document.body.classList.add('full-screen');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('register-page');
      document.body.classList.remove('full-screen');
    };
  });

  // React.useEffect(() => {
  //   const postData = async () => {
  //     const res = await axios.post(`http://localhost:5000/api/v1/users`);
  //     console.log(res.data);
  //     setDate(res.data);
  //   };
  //   postData();
  // }, []);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`http://localhost:5000/api/v1/users`);
  //     console.log(res.data);
  //     setDate(res.data);
  //   };
  //   fetchData();
  // }, []);
  return (
    <>
      <ColorNavbar />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              'url(' +
              require('assets/img/sections/pexels-startup-stock-photos-7102.jpg') +
              ')',
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col
                className=""
                lg="6"
                md="6"
                sm="7"
                xs="12"
                style={{ paddingTop: '15%' }}
              >
                <div
                  className="description"
                  style={{
                    textShadow: '2px 2px 4px #000000',
                  }}
                >
                  <h3 style={{ fontFamily: 'Lemonada', textAlign: 'center' }}>
                    سجل دخولك
                  </h3>
                  <br />
                  <p>
                    <h6 style={{ fontFamily: 'Lemonada', textAlign: 'center' }}>
                      <span style={{ color: 'yellow' }}>ʻʻ</span>و طور قدراتك
                      وشارك الاخرين
                      <span style={{ color: 'yellow' }}>ʼʼ</span>
                    </h6>
                  </p>
                </div>
              </Col>
              <Col className="mr-auto" lg="6" md="6" sm="5" xs="12">
                <Card className="card-register">
                  <CardTitle
                    style={{ fontFamily: 'Lemonada' }}
                    className="text-center"
                    tag="h3"
                  >
                    تسجيل دخول
                  </CardTitle>
                  <CardTitle
                    style={{ fontFamily: 'Lemonada' }}
                    className="text-center"
                    tag="P"
                  >
                    أهلا بك من جديد في تَـــيَـقن منصتك المفضله
                  </CardTitle>
                  <div className="division">
                    <div className="line l" />
                    <img src={sure_logo} width="10%" />
                    <div className="line r" />
                  </div>
                  <Form className="register-form" onSubmit={handleForm}>
                    <Input placeholder="الايميل" type="text" name="email" />
                    <Input
                      placeholder="كلمة المرور"
                      type="password"
                      name="password"
                    />

                    <Button
                      style={{ fontFamily: 'Lemonada' }}
                      block
                      className="btn-round"
                      color="success"
                    >
                      تسجيل دخول
                    </Button>
                  </Form>
                  <div className="login">
                    <p style={{ fontFamily: 'Lemonada' }}>
                      ما عندك حساب ؟
                      <a
                        style={{ fontFamily: 'Lemonada' }}
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        {' '}
                        تسجيل{' '}
                      </a>
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
          {/* <div className="demo-footer text-center">
            <h6>
              © {new Date().getFullYear()}, made with{' '}
              <i className="fa fa-heart heart" /> by Creative Tim
            </h6>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
