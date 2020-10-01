import React, { useState } from 'react';
import sure_logo from '../../assets/img/sure_logo.svg';
import { loginUser } from '../../_actions/user_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components
import ColorNavbar from 'components/Navbars/ColorNavbar.js';

function LoginPage(props) {
  const dispatch = useDispatch();

  document.documentElement.classList.remove('nav-open');

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

  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

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

                  <div style={{ fontFamily: 'Lemonada', textAlign: 'center' }}>
                    <span style={{ color: 'yellow' }}>ʻʻ</span>و طور قدراتك
                    وشارك الاخرين
                    <span style={{ color: 'yellow' }}>ʼʼ</span>
                  </div>
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
                  <Formik
                    initialValues={{
                      email: initialEmail,
                      password: '',
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email('الايميل غير صحيح')
                        .required('الرجاء إدخال الأيميل'),
                      password: Yup.string()
                        .min(6, 'يجب ان لا تقل خانات كلمة المرور عن 6')
                        .required('الرجاء ادخال كلمة المرور'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        let dataToSubmit = {
                          username: values.email,
                          password: values.password,
                        };

                        dispatch(loginUser(dataToSubmit))
                          .then((response) => {
                            if (response.payload.loginSuccess) {
                              console.log(response.payload.loginSuccess);
                              if (rememberMe === true) {
                                window.localStorage.setItem(
                                  'rememberMe',
                                  values.id
                                );
                              } else {
                                localStorage.removeItem('rememberMe');
                              }
                              props.history.push('/');
                              console.log('2');
                            } else {
                              setFormErrorMessage(
                                'Check out your Account or Password again'
                              );
                              console.log(response.payload);
                            }
                          })
                          .catch((err) => {
                            setFormErrorMessage(
                              'Check out your Account or Password again'
                            );
                            console.log('4');

                            setTimeout(() => {
                              setFormErrorMessage('');
                            }, 3000);
                          });
                        setSubmitting(false);
                      }, 500);
                    }}
                  >
                    {(props) => {
                      const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                      } = props;
                      return (
                        <div className="app">
                          <form onSubmit={handleSubmit}>
                            <Input
                              id="email"
                              placeholder="الأيميل"
                              type="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.email && touched.email
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />
                            {errors.email && touched.email && (
                              <div
                                className="input-feedback"
                                style={{
                                  color: 'red',
                                  textAlign: 'center',
                                }}
                              >
                                {errors.email}
                              </div>
                            )}

                            <Input
                              id="password"
                              placeholder="ادخل كلمة المرور"
                              type="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.password && touched.password
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />
                            <div>
                              {errors.password && touched.password && (
                                <div
                                  className="input-feedback"
                                  style={{
                                    color: 'red',
                                    textAlign: 'center',
                                  }}
                                >
                                  {errors.password}
                                </div>
                              )}
                            </div>
                            {formErrorMessage && (
                              <label>
                                <p
                                  style={{
                                    color: '#ff0000bf',
                                    fontSize: '0.7rem',
                                    border: '1px solid',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                  }}
                                >
                                  {formErrorMessage}
                                </p>
                              </label>
                            )}
                            <Checkbox
                              id="rememberMe"
                              onChange={handleRememberMe}
                              checked={rememberMe}
                              style={{ color: 'black' }}
                            >
                              {'   '}
                              تدكرني
                            </Checkbox>
                            <a
                              className="login-form-forgot"
                              href="/reset_user"
                              style={{ float: 'right' }}
                            >
                              نسيت كلمة المرور
                            </a>
                            <div>
                              <Button
                                type="primary"
                                className="btn-round"
                                style={{ fontFamily: 'Lemonada' }}
                                disabled={isSubmitting}
                                onSubmit={handleSubmit}
                                block
                                color="success"
                              >
                                تسجيل دخول
                              </Button>
                            </div>
                            <div className="login">
                              <p style={{ fontFamily: 'Lemonada' }}>
                                ما عندك حساب ؟
                                <a
                                  style={{ fontFamily: 'Lemonada' }}
                                  href="/register"
                                >
                                  {' '}
                                  تسجيل{' '}
                                </a>
                              </p>
                            </div>
                          </form>
                        </div>
                      );
                    }}
                  </Formik>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
