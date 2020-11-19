import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { USER_SERVER } from '../../components/Config';
import { useSelector, useStore } from 'react-redux';
import defaultImage from 'assets/img/image_placeholder.jpg';
import defaultAvatar from 'assets/img/placeholder.jpg';
import FormData from 'form-data';
import Avatar from '../../components/Avatar/Avatar';
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
  Badge,
} from 'reactstrap';
import GridItem from '../../components/Grid/GridItem';
// core components
import ColorNavbarFixed from 'components/Navbars/ColorNavbarFixed';
import CourseCard from 'components/CourseCard';

function ProfilePage() {
  const user = useSelector((state) => state.user);
  let [photos, setPhotos] = React.useState([]);
  let [regestPhotos, setregestPhotos] = React.useState([]);
  const [btntf, setbtntf] = React.useState(true);
  let [selectedCourses, setSelectedCourses] = React.useState([]); // المواد المتاحه من الكورس المختار
  const [successSelect, setSuccessSelect] = React.useState(null); //  التخصص المختار من قائمه التخصصات
  const [selectOptions, setSelectOptions] = React.useState([]); // قائمة التخصصات المتوفره
  const [userdata, setUserData] = React.useState([]); // بيانات الحساب المسجل
  const [coursesData, setCoursesData] = React.useState([]); // بيانات كل الماواد الخاصه باالتخصص المختار
  let [userCourses, setUserCourses] = React.useState([]); // التخصصات المسجله مسبقا للمستخدم
  let [selectedCoursesName, setselectedCoursesName] = React.useState([]); // التخصصات المسجله مسبقا للمستخدم
  const [file, setFile] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [bio, setBio] = React.useState('');
  const avatar = true;
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    avatar ? defaultAvatar : defaultImage
  );
  const fileInput = React.createRef();
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleClick = () => {
    fileInput.current.click();
    setImagePreviewUrl(imagePreviewUrl);
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
  if (user.userData && userdata.length === 0) {
    setUserData(user.userData);
    setUserCourses(user.userData.courses);
  }

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
  let courseUser = [];
  let newCourses = [];

  if (user.userData) {
    user.userData.courses.map((item) => {
      courseUser = [...courseUser, item._id];
    });
  }
  if (user.userData) {
    coursesData.map((item) => {
      if (courseUser.includes(item._id)) {
        return null;
      } else {
        newCourses = [...newCourses, item];
      }
    });
  }
  // console.log(coursesData);
  // عند اختيار المستخدم التخصصات المراده يتم ارسالها لقاعدة البيانات
  const sendCourses = () => {
    axios
      .put(
        `${USER_SERVER}/me`,
        {
          courses: selectedCourses,
          specialization: successSelect.value,
          username: username,
          bio: bio,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };
// clean
  // const UploadPhoto = () => {
  //   let formData = new FormData();
  //   formData.set('file', file);
  //   axios.put(
  //     `${USER_SERVER}/me/${user.userData._id}/photo`,
  //     formData,

  //     { withCredentials: true }
  //   );
  // };

  const refreshPage = () => {
    // window.location.reload(true);
  };
  // لاظهار التخصص اذا كام موجود في خانه التخصصات
  const nameOfSpecUser = () => {
    if (user.userData && user.userData.specialization) {
      return user.userData.specialization.specName;
    } else {
      return 'CHOOSE SPECIALIZATION';
    }
  };
  React.useEffect(() => {
    document.body.classList.add('profile-page');
    return function cleanup() {
      document.body.classList.remove('profile-page');
    };
  });
  React.useEffect(() => {
    getOptions();
  }, []);
  React.useEffect(() => {
    if (successSelect) {
      getCourses();
    }
  }, [successSelect]);
  const handleUserInfo = (e) => {
    setUsername(e.target.value);
  };
  // const handleUserBio = (e) => {
  //   setBio(e.target.value);
  // };

  return (
    <>
      <ColorNavbarFixed />

      <nav class="navbar fixed-top navbar-light bg-light"></nav>
      <div
        className="profile-content section"
        style={{
          backgroundColor: '#fff',
          // backgroundColor: '#f6f4e6',
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: '#fff',
            paddingTop: '10rem',
            marginBottom: '-10rem',
          }}
        >
          
            <Col className="ml-auto mr-auto text-center" md="6">
              <div style={{ paddingBottom: '2rem' }}>
                <div className="fileinput text-center">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    ref={fileInput}
                  />

                  {/* <Avatar
                    image={imagePreviewUrl}
                    bw={180}
                    bh={180}
                    iw={240}
                    ih={240}
                  />

                  <div style={{ marginTop: '2rem' }}>
                    {file === null ? (
                      <Button
                        className="btn-round"
                        color="default"
                        outline
                        onClick={handleClick}
                      >
                        {avatar ? 'Add Photo' : 'Select image'}
                      </Button>
                    ) : (
                      <span>
                        <Button
                          className="btn-round"
                          outline
                          color="default"
                          onClick={handleClick}
                        >
                          Change
                        </Button>
                        {avatar ? <br /> : null}
                        <Button
                          color="danger"
                          className="btn-round btn-link"
                          onClick={handleRemove}
                        >
                          <i className="fa fa-times" />
                          Remove
                        </Button>
                        <Button
                          onClick={async () => {
                            await UploadPhoto();
                            refreshPage();
                          }}
                        >
                          UPLOAD
                        </Button>
                      </span>
                    )}
                  </div> */}
                </div>
              </div>
              <FormGroup className="has-success">
                <Input
                  className="form-control-success"
                  defaultValue={userdata.name}
                  placeholder="Name *"
                  id="inputSuccess"
                  type="text"
                  onChange={handleUserInfo}
                />
              </FormGroup>
              <FormGroup className="has-success">
                <Input
                  className="form-control-success"
                  defaultValue={userdata.username}
                  placeholder="Last name"
                  id="inputSuccess"
                  type="text"
                  onChange={handleUserInfo}
                />
              </FormGroup>

              <FormGroup className="has-success">
                <Input
                  className="form-control-success"
                  defaultValue={userdata.email}
                  placeholder="Email *"
                  id="inputSuccess"
                  type="email"
                  onChange={handleUserInfo}
                />
              </FormGroup>

              <h4 style={{ paddingBottom: '0.5rem' }}>YOUR COURSES</h4>
            
              <GridItem
              container
              direction="row-reverse"
              justify="center"
              alignItems="center"
            >

            

           
                  {user.userData && user.userData.courses.length !== 0 ? (
                    userCourses.map((item, i) => {
                      axios
                        .get(
                          `http://localhost:5000/uploads/${item.photo}`,
                          {
                            responseType: 'arraybuffer',
                          },
                          { withCredentials: true }
                        )
                        .then((response) => {
                          let blob = new Blob([response.data], {
                            type: response.headers['content-type'],
                          });
                          let img = URL.createObjectURL(blob);
                          if (regestPhotos.length == i) {
                            setregestPhotos([...regestPhotos, img]);
                          }
                        });
                      
                      return (
                        

                        <GridItem direction="row-reverse" >


                        <CourseCard
                          btnTrue={true}
                          key={item._id}
                          name={item.name}
                          code={item.code}
                          photo={regestPhotos[i]}
                          width={300}
                          height={229}
                          click={() => {
                            let NC = [];
                            userCourses.map((course) => {
                              if (course._id !== item._id) {
                                NC = [...NC, course];
                              } else {
                                return null;
                              }
                            });

                            setUserCourses(NC);
                            axios
                              .put(
                                `${USER_SERVER}/me`,
                                {
                                  courses: NC,
                                },
                                {
                                  withCredentials: true,
                                }
                              )
                              .then((response) => response.data)
                              .catch(function (error) {
                                console.log(error);
                              });
                            window.location.reload();
                          }}
                        />
                       
                       </GridItem>
                       
                    
                      );
                    })
                  ) : (
                    <Container style={{ padding: '2rem' }}>
                      NO COURSES
                    </Container>
                  )}
                  
            
                   </GridItem>
              

              <hr />
              <FormGroup>
                <Select
                  className="react-select react-select-success"
                  classNamePrefix="react-select"
                  name="successSelect"
                  value={successSelect}
                  onChange={function hendleOnChenga(value) {
                    setSuccessSelect(value);
                  }}
                  options={selectOptions}
                  placeholder={nameOfSpecUser()}
                />
              </FormGroup>

              {/* {newCourses ? <hr style={{ padding: '1rem' }} /> : null} */}
            </Col>
          
          <Container>
          <GridItem
              container
              direction="row-reverse"
              justify="center"
              alignItems="center"
            >
              {newCourses
                ? newCourses.map((newCourses, i) => {
                    axios
                      .get(
                        `http://localhost:5000/uploads/${newCourses.photo}`,
                        {
                          responseType: 'arraybuffer',
                        },
                        { withCredentials: true }
                      )
                      .then((response) => {
                        let blob = new Blob([response.data], {
                          type: response.headers['content-type'],
                        });
                        let img = URL.createObjectURL(blob);
                        if (photos.length == i) {
                          setPhotos([...photos, img]);
                        }
                      });
                    console.log(photos);

                    return (
                      <CourseCard
                        key={newCourses._id}
                        btnTrue={btntf}
                        name={newCourses.name}
                        code={newCourses.code}
                        photo={photos[i]}
                        width={300}
                        height={229}
                        click={() => {
                          if (selectedCourses.includes(newCourses._id)) {
                            selectedCourses = selectedCourses.filter((item) => {
                              return item !== newCourses._id;
                            });

                            setSelectedCourses(selectedCourses);
                          } else {
                            setSelectedCourses([
                              ...selectedCourses,
                              newCourses._id,
                            ]);
                          }
                          if (selectedCoursesName.includes(newCourses.name)) {
                            selectedCoursesName = selectedCoursesName.filter(
                              (item) => {
                                return item !== newCourses.name;
                              }
                            );
                            setbtntf(true);
                            setselectedCoursesName(selectedCoursesName);
                          } else {
                            setbtntf(false);
                            setselectedCoursesName([
                              ...selectedCoursesName,
                              newCourses.name,
                            ]);
                          }
                        }}
                      />
                    );
                  })
                : null}
                  </GridItem> 
           

            <Col className="ml-auto mr-auto text-center" md="6">
              <div style={{ paddingBottom: '1rem' }}>
                {selectedCoursesName.map((course) => {
                  return (
                    <Badge className="" color="success" pill>
                      <small>{course} </small>{' '}
                    </Badge>
                  );
                })}
              </div>
              {selectedCourses.length !== 0 ? (
                <div>
                  {/* <h3>{selectedCourses}</h3> */}
                  <Button
                    className="btn-round "
                    color="success"
                    outline
                    type="button"
                    onClick={() => {
                      sendCourses();
                      refreshPage();
                      window.location.reload();
                    }}
                  >
                    Done
                  </Button>
                </div>
              ) : null}
            </Col>
          </Container>
          <div style={{ paddingTop: '3rem' }}>
            
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePage;
