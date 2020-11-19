import Switch from 'react-bootstrap-switch';
import sure_logo from '../../assets/img/sure_logo.svg';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../_actions/user_actions';
import { useDispatch } from 'react-redux';

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

function RegisterPage(props) {
  const [supervisor, setSupervisor] = useState(false);
  document.documentElement.classList.remove('nav-open');
  const dispatch = useDispatch();

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
  console.log(supervisor);
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
                  <h3 style={{  textAlign: 'center' }}>
                    Create an account on the platform
                  </h3>
                  <br />
                  <p>
                    <h6 style={{  textAlign: 'center' }}>
                      <span style={{ color: 'yellow' }}>ʻʻ</span>A platform dedicated to developing and improving students' performance{' '}
                      <span style={{ color: 'yellow' }}>ʼʼ</span>
                    </h6>
                    <h6></h6>
                  </p>
                </div>
              </Col>
              <Col className="mr-auto" lg="6" md="6" sm="5" xs="12">
                <Card className="card-register">
                  <CardTitle
                    style={{  }}
                    className="text-center"
                    tag="h3"
                  >
                    تسجيل
                  </CardTitle>
                  <CardTitle
                    style={{  }}
                    className="text-center"
                    tag="P"
                  >
                    Welcome to TAYAKAN your favorite platform  
                  </CardTitle>
                  <div className="division">
                    <div className="line l" />
                    <img src={sure_logo} width="10%" />
                    <div className="line r" />
                  </div>
                  <Formik
                    initialValues={{
                      email: '',
                      name: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    validationSchema={Yup.object().shape({
                      name: Yup.string().required('Please enter your first name'),
                      email: Yup.string()
                        .email('email is incorrect')
                        .required('Please enter your email'),
                      password: Yup.string()
                        .min(6, 'Password must be at least 6 characters long')
                        .required('The password is incorrect'),
                      confirmPassword: Yup.string()
                        .oneOf(
                          [Yup.ref('password'), null],
                          'Password does not match'
                        )
                        .required('Please enter a confirmation password'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        let dataToSubmit = {
                          email: values.email,
                          password: values.password,
                          name: values.name,
                        };

                        dispatch(registerUser(dataToSubmit)).then(
                          (response) => {
                            if (response.payload.success) {
                              props.history.push('/login');
                            } else {
                              console.log(response.payload);
                              alert(response.payload.error_msg);
                            }
                          }
                        );

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
                        <div>
                          <Form onSubmit={handleSubmit}>
                            <Input
                              id="name"
                              placeholder="Name"
                              type="text"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.name && touched.name
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />{' '}
                            {errors.name && touched.name && (
                              <div
                                className="input-feedback"
                                style={{
                                  color: 'red',
                                  textAlign: 'center',
                                }}
                              >
                                {errors.name}
                              </div>
                            )}
                            <Input
                              id="email"
                              placeholder="email"
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
                                style={{ color: 'red', textAlign: 'center' }}
                              >
                                {errors.email}
                              </div>
                            )}
                            <Input
                              id="password"
                              placeholder="password"
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
                            {errors.password && touched.password && (
                              <div
                                className="input-feedback"
                                style={{ color: 'red', textAlign: 'center' }}
                              >
                                {errors.password}
                              </div>
                            )}
                            <Input
                              id="confirmPassword"
                              placeholder="confirm password"
                              type="password"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />
                            {errors.confirmPassword && touched.confirmPassword && (
                              <div
                                className="input-feedback"
                                style={{ color: 'red', textAlign: 'center' }}
                              >
                                {errors.confirmPassword}
                              </div>
                            )}
                            <div className="division">

                              <p style={{ fontFamily: 'Rajdhani' }}>
                                Are you Supervisor ?
                              </p>
                              <Switch
                                // defaultValue={false}
                                value={supervisor}
                                onChange={() =>
                                  setSupervisor(supervisor ? false : true)
                                }
                                offColor="success"
                                offText={
                                  <i className="nc-icon nc-simple-remove" />
                                }
                                onColor="success"
                                onText={<i className="nc-icon nc-check-2" />}
                              />
                            </div>
                            <Button
                              onClick={handleSubmit}
                              type="primary"
                              disabled={isSubmitting}
                              style={{  }}
                              block
                              className="btn-round"
                              color="success"
                            >
                              Sign Up                   
                             </Button>
                            <div className="login">
                              <p style={{  }}>
                              Do you have an account ?                              <a
                                  style={{  }}
                                  href="/login"
                                >
                                  {' '}
                                  sign in{' '}
                                </a>
                              </p>
                            </div>
                          </Form>
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

export default RegisterPage;


// import Switch from 'react-bootstrap-switch';
// import sure_logo from '../../assets/img/sure_logo.svg';
// import React, { useState } from 'react';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { registerUser } from '../../_actions/user_actions';
// import { useDispatch } from 'react-redux';

// // reactstrap components
// import {
//   Button,
//   Card,
//   CardTitle,
//   Form,
//   Input,
//   Container,
//   Row,
//   Col,
// } from 'reactstrap';

// // core components
// import ColorNavbar from 'components/Navbars/ColorNavbar.js';

// function RegisterPage(props) {
//   const [supervisor, setSupervisor] = useState(false);
//   document.documentElement.classList.remove('nav-open');
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     document.body.classList.add('register-page');
//     document.body.classList.add('full-screen');
//     window.scrollTo(0, 0);
//     document.body.scrollTop = 0;
//     return function cleanup() {
//       document.body.classList.remove('register-page');
//       document.body.classList.remove('full-screen');
//     };
//   });
//   console.log(supervisor);
//   return (
//     <>
//       <ColorNavbar />

//       <div className="wrapper">
//         <div
//           className="page-header"
//           style={{
//             backgroundImage:
//               'url(' +
//               require('assets/img/sections/pexels-startup-stock-photos-7102.jpg') +
//               ')',
//           }}
//         >
//           <div className="filter" />
//           <Container>
//             <Row>
//               <Col
//                 className=""
//                 lg="6"
//                 md="6"
//                 sm="7"
//                 xs="12"
//                 style={{ paddingTop: '15%' }}
//               >
//                 <div
//                   className="description"
//                   style={{
//                     textShadow: '2px 2px 4px #000000',
//                   }}
//                 >
//                   <h3 style={{  textAlign: 'center' }}>
//                     انشئ حساب في المنصة
//                   </h3>
//                   <br />
//                   <p>
//                     <h6 style={{ fontFamily: 'Lemonada', textAlign: 'center' }}>
//                       <span style={{ color: 'yellow' }}>ʻʻ</span> تَـــيَـقن
//                       منصة مخصصه لتطوير و تحسين اداء الطلاب{' '}
//                       <span style={{ color: 'yellow' }}>ʼʼ</span>
//                     </h6>
//                     <h6></h6>
//                   </p>
//                 </div>
//               </Col>
//               <Col className="mr-auto" lg="6" md="6" sm="5" xs="12">
//                 <Card className="card-register">
//                   <CardTitle
//                     style={{ fontFamily: 'Lemonada' }}
//                     className="text-center"
//                     tag="h3"
//                   >
//                     تسجيل
//                   </CardTitle>
//                   <CardTitle
//                     style={{ fontFamily: 'Lemonada' }}
//                     className="text-center"
//                     tag="P"
//                   >
//                     مرحبا بك في تَـــيَـقن منصتك المفضله
//                   </CardTitle>
//                   <div className="division">
//                     <div className="line l" />
//                     <img src={sure_logo} width="10%" />
//                     <div className="line r" />
//                   </div>
//                   <Formik
//                     initialValues={{
//                       email: '',
//                       name: '',
//                       password: '',
//                       confirmPassword: '',
//                     }}
//                     validationSchema={Yup.object().shape({
//                       name: Yup.string().required('الرجاء إدخال اسم المستخدم'),
//                       email: Yup.string()
//                         .email('الأيميل غير صحيح')
//                         .required('الرجاء أدخال الأيميل'),
//                       password: Yup.string()
//                         .min(6, 'كلمة الرور يجب ان لا تقل عن 6 خانات')
//                         .required('كلمة المرور غير صحيحه'),
//                       confirmPassword: Yup.string()
//                         .oneOf(
//                           [Yup.ref('password'), null],
//                           'كلمة المرور غير مطابقع'
//                         )
//                         .required('الرجاء إدخال تأكيد كلمة المرور'),
//                     })}
//                     onSubmit={(values, { setSubmitting }) => {
//                       setTimeout(() => {
//                         let dataToSubmit = {
//                           email: values.email,
//                           password: values.password,
//                           name: values.name,
//                         };

//                         dispatch(registerUser(dataToSubmit)).then(
//                           (response) => {
//                             if (response.payload.success) {
//                               props.history.push('/login');
//                             } else {
//                               console.log(response.payload);
//                               alert(response.payload.error_msg);
//                             }
//                           }
//                         );

//                         setSubmitting(false);
//                       }, 500);
//                     }}
//                   >
//                     {(props) => {
//                       const {
//                         values,
//                         touched,
//                         errors,
//                         dirty,
//                         isSubmitting,
//                         handleChange,
//                         handleBlur,
//                         handleSubmit,
//                         handleReset,
//                       } = props;
//                       return (
//                         <div>
//                           <Form onSubmit={handleSubmit}>
//                             <Input
//                               id="name"
//                               placeholder="أسم المستخدم"
//                               type="text"
//                               value={values.name}
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               className={
//                                 errors.name && touched.name
//                                   ? 'text-input error'
//                                   : 'text-input'
//                               }
//                             />{' '}
//                             {errors.name && touched.name && (
//                               <div
//                                 className="input-feedback"
//                                 style={{
//                                   color: 'red',
//                                   textAlign: 'center',
//                                 }}
//                               >
//                                 {errors.name}
//                               </div>
//                             )}
//                             <Input
//                               id="email"
//                               placeholder="الأيميل"
//                               type="email"
//                               value={values.email}
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               className={
//                                 errors.email && touched.email
//                                   ? 'text-input error'
//                                   : 'text-input'
//                               }
//                             />
//                             {errors.email && touched.email && (
//                               <div
//                                 className="input-feedback"
//                                 style={{ color: 'red', textAlign: 'center' }}
//                               >
//                                 {errors.email}
//                               </div>
//                             )}
//                             <Input
//                               id="password"
//                               placeholder="كلمة المرور"
//                               type="password"
//                               value={values.password}
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               className={
//                                 errors.password && touched.password
//                                   ? 'text-input error'
//                                   : 'text-input'
//                               }
//                             />
//                             {errors.password && touched.password && (
//                               <div
//                                 className="input-feedback"
//                                 style={{ color: 'red', textAlign: 'center' }}
//                               >
//                                 {errors.password}
//                               </div>
//                             )}
//                             <Input
//                               id="confirmPassword"
//                               placeholder="تأكيد كلمة المرور"
//                               type="password"
//                               value={values.confirmPassword}
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               className={
//                                 errors.confirmPassword &&
//                                 touched.confirmPassword
//                                   ? 'text-input error'
//                                   : 'text-input'
//                               }
//                             />
//                             {errors.confirmPassword && touched.confirmPassword && (
//                               <div
//                                 className="input-feedback"
//                                 style={{ color: 'red', textAlign: 'center' }}
//                               >
//                                 {errors.confirmPassword}
//                               </div>
//                             )}
//                             <div className="division">
//                               <p style={{ fontFamily: 'Lemonada' }}>
//                                 {' '}
//                                 هل انت مشرف ؟
//                               </p>
//                               <p style={{ fontFamily: 'Rajdhani' }}>
//                                 Are you Supervisor ?
//                               </p>
//                               <Switch
//                                 // defaultValue={false}
//                                 value={supervisor}
//                                 onChange={() =>
//                                   setSupervisor(supervisor ? false : true)
//                                 }
//                                 offColor="success"
//                                 offText={
//                                   <i className="nc-icon nc-simple-remove" />
//                                 }
//                                 onColor="success"
//                                 onText={<i className="nc-icon nc-check-2" />}
//                               />
//                             </div>
//                             <Button
//                               onClick={handleSubmit}
//                               type="primary"
//                               disabled={isSubmitting}
//                               style={{ fontFamily: 'Lemonada' }}
//                               block
//                               className="btn-round"
//                               color="success"
//                             >
//                               سجل
//                             </Button>
//                             <div className="login">
//                               <p style={{ fontFamily: 'Lemonada' }}>
//                                 عندك حساب ؟
//                                 <a
//                                   style={{ fontFamily: 'Lemonada' }}
//                                   href="/login"
//                                 >
//                                   {' '}
//                                   تسجيل الدخول{' '}
//                                 </a>
//                               </p>
//                             </div>
//                           </Form>
//                         </div>
//                       );
//                     }}
//                   </Formik>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>
//     </>
//   );
// }

// export default RegisterPage;

