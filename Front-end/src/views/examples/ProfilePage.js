import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { USER_SERVER } from '../../components/Config';
import { useSelector, useStore } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// reactstrap components
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

// core components
import ColorNavbarFixed from 'components/Navbars/ColorNavbarFixed';
import CourseCard from 'components/CourseCard';
import FooterWhite from 'components/Footers/FooterWhite.js';
import ImageUpload from 'components/CustomUpload/ImageUpload.js';
import { set } from 'mongoose';
import { createKeywordTypeNode } from 'typescript';

function ProfilePage() {
  const user = useSelector((state) => state.user);

  let [selectedCourses, setSelectedCourses] = React.useState([]); // المواد المتاحه من الكورس المختار
  const [successSelect, setSuccessSelect] = React.useState(null); //  التخصص المختار من قائمه التخصصات
  const [selectOptions, setSelectOptions] = React.useState([]); // قائمة التخصصات المتوفره
  const [userdata, setUserData] = React.useState([]); // بيانات الحساب المسجل
  const [coursesData, setCoursesData] = React.useState([]); // بيانات كل الماواد الخاصه باالتخصص المختار
  const [userCoursesCard, setUserCoursesCard] = React.useState([]); // التخصصات المسجله مسبقا للمستخدم
  const [isCardOpen, setisCardOpen] = React.useState(false); // اذا كان true يسمح بعرض قوائم المواد
  const [
    userspecializationCourses,
    setUserspecializationCourses,
  ] = React.useState([]); //

  if (user.userData && userdata.length === 0) {
    setUserData(user.userData);
  }
  // console.log(userdata);

  //هنا يتم طلب التخصصات المتوفره من قاعدة البيانات
  const getOptions = async () => {
    await axios
      .get(`${USER_SERVER}/specialization`)
      .then((response) => {
        if (response.data.success) {
          const data = response.data.data.data;
          let options = data.map((specializations) => ({
            value: specializations._id,
            label: specializations.specName,
            code: specializations.code,
          }));

          setSelectOptions(options);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //بعد اختيار المستخدم التخصص يتم طلب مواد التخصص
  const getCourses = async () => {
    await axios
      .get(`${USER_SERVER}/courses/?specialization=${successSelect.value}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCoursesData(res.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // طلب المواد التخصص على حسب تخصص المستخدم
  // const getUserspecializationCourses = async () => {
  //   if (userspecializationCourses.length < 1 && user.userData) {
  //     const res = await axios.get(
  //       `${USER_SERVER}/courses/?specialization=${userdata.specialization}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setUserspecializationCourses(res.data.data.data);
  //   } else {
  //     return null;
  //   }
  // };

  console.log(userspecializationCourses);

  // عند اختيار المستخدم التخصصات المراده يتم ارسالها لقاعدة البيانات
  const sendCourses = () => {
    axios
      .put(
        `${USER_SERVER}/me`,
        {
          courses: selectedCourses,
          specialization: successSelect.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
    setisCardOpen(false);
  };
  console.log(userspecializationCourses);
  //جلب الكورسات المختاره سابقا
  // const getUserCourses = async () => {
  //   await userspecializationCourses.map((usercourses) => {
  //     if (userdata.courses.includes(usercourses._id)) {
  //       if (userCoursesCard.includes(usercourses)) {
  //         return null;
  //       } else {
  //         setUserCoursesCard([...userCoursesCard, usercourses]);
  //       }
  //     } else {
  //       return null;
  //     }
  //   });
  // };

  React.useEffect(() => {
    getUserspecializationCourses();
    // getUserCourses();
    document.documentElement.classList.remove('nav-open');

    document.body.classList.add('profile-page');
    return function cleanup() {
      document.body.classList.remove('profile-page');
    };
  });
  React.useEffect(() => {
    getOptions();
  }, []);
  console.log(isCardOpen);
  return (
    <>
      <ColorNavbarFixed />
      {/* <ProfilePageHeader /> */}
      <div
        className="profile-content section"
        style={{
          backgroundColor: '#f6f4e6',
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: '#fff',
            paddingTop: '20rem',
            marginBottom: '-10rem',
          }}
        >
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <ImageUpload avatar />
              <FormGroup className="has-success">
                <Input
                  className="form-control-success"
                  // defaultValue="Success"
                  placeholder="Username *"
                  id="inputSuccess"
                  type="text"
                />
              </FormGroup>
              <FormGroup className="has-success">
                <Input
                  className="form-control-success"
                  // defaultValue="Success"
                  placeholder="Bio"
                  id="inputSuccess"
                  type="textarea"
                />
              </FormGroup>
              <h4>YOUR COURSES</h4>
              {userCoursesCard ? console.log(userCoursesCard) : null}

              <hr />
              <FormGroup>
                <Select
                  className="react-select react-select-success"
                  classNamePrefix="react-select"
                  name="successSelect"
                  value={successSelect}
                  onChange={function hendleOnChenga(value) {
                    setSuccessSelect(value);
                    setisCardOpen(true);
                  }}
                  options={selectOptions}
                  // placeholder={
                  //   userdata
                  //     ? userdata.specialization.name
                  //     : 'CHOOSE SPECIALIZATION'
                  // }
                />
              </FormGroup>

              {successSelect ? (
                <Card data-color="purple">
                  <CardBody className="text-center">
                    <h5 className="card-category">{successSelect.label}</h5>
                    <h5 className="card-category">{successSelect.code}</h5>
                    <CardTitle tag="h5">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        "Good Design Is as Little Design as Possible"
                      </a>
                    </CardTitle>
                    <p className="card-description">
                      Design makes an important contribution to the preservation
                      of the environment. It conserves resources and minimises
                      physical and visual pollution throughout the lifecycle of
                      the product....
                    </p>
                    <CardFooter className="text-center">
                      {/* <Button
                        className="btn-round btn-just-icon mr-1"
                        color="neutral"
                        href="#pablo"
                        outline
                        id="tooltip275070155"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-bookmark-o" />
                      </Button>
                      <UncontrolledTooltip delay={0} target="tooltip275070155">
                        Bookmark
                      </UncontrolledTooltip> */}
                      <Button
                        className="btn-neutral btn-round"
                        color="default"
                        href="#pablo"
                        onClick={getCourses}
                      >
                        {/* <i className="fa fa-newspaper-o mr-1" /> */}
                        Choose Subjects
                      </Button>
                    </CardFooter>
                  </CardBody>
                </Card>
              ) : null}
              {coursesData ? <hr style={{ padding: '1rem' }} /> : null}
            </Col>
          </Row>
          <Container>
            <Row>
              {coursesData && isCardOpen
                ? coursesData.map((coursesData) => {
                    {
                      return (
                        <CourseCard
                          key={coursesData._id}
                          // id={coursesData._id}
                          name={coursesData.name}
                          code={coursesData.code}
                          click={() => {
                            if (selectedCourses.includes(coursesData._id)) {
                              selectedCourses = selectedCourses.filter(
                                (item) => {
                                  return item !== coursesData._id;
                                }
                              );
                              setSelectedCourses(selectedCourses);
                            } else {
                              setSelectedCourses([
                                ...selectedCourses,
                                coursesData._id,
                              ]);
                            }
                            // //   setHowsckicked(coursesData.name);
                          }}
                        />
                      );
                    }
                  })
                : null}
            </Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              {selectedCourses.length !== 0 && isCardOpen ? (
                <div>
                  {/* <h3>{selectedCourses}</h3> */}
                  <Button
                    className="btn-round "
                    color="success"
                    outline
                    type="button"
                    onClick={sendCourses}
                  >
                    Done
                  </Button>
                </div>
              ) : null}
            </Col>
          </Container>
          <div style={{ paddingTop: '3rem' }}>
            <FooterWhite />
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePage;
