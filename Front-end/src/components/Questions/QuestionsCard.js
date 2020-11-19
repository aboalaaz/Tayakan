import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { USER_SERVER } from '../Config';
import axios from 'axios';
import Switch from 'react-bootstrap-switch';
import CourseCardAdvance from '../CourseCardAdvance';
import closeLock from '../../assets/img/newCLock.png';
import newOpenLock from '../../assets/img/newOpenLock.png';
import Dropdown_Menu from '../../components/Dropdown/Dropdown_Menu';
import '../../components/Dropdown/index.css';
import Style from 'style-it';
import trophy from '../../assets/img/trophy.png';
import sure_logo from '../../assets/img/sure_logo.svg';
import CountUp from 'react-countup';

import Select from 'react-select';
import {
  FormGroup,
  Label,
  Badge,
  Modal,
  Container,
  Input,
  Row,
  Col,
  CardFooter,
  Alert,
  Button,
  UncontrolledTooltip,
} from 'reactstrap';
import GridItem from '../Grid/GridItem';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { useSelector } from 'react-redux';
import Card from '../Card/Card.js';
import CardHeader from '../Card/CardHeader.js';
import GridContainer from '../Grid/GridContainer.js';
import Grid from '@material-ui/core/Grid';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import CourseCard from 'components/CourseCard';

const useStyles = makeStyles(styles);
function QuestionsCard() {
  const user = useSelector((state) => state.user);
  const [smallAlert, setSmallAlert] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertDanger, setAlertDanger] = React.useState(false);
  let [userCourses, setUserCourses] = React.useState([]);
  let [regestPhotos, setregestPhotos] = React.useState([]);
  const [userdata, setUserData] = React.useState([]); // بيانات الحساب المسجل
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [optionsChapter, setOptionsChapter] = React.useState([]);
  const [successSelectChapter, setSuccessSelectChapter] = React.useState(null);
  const [start, setStart] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [chaptermenu, setChpterMenu] = React.useState(true);
  const [position, setPosition] = React.useState(null);
  const [chpaterPosition, setChpaterPosition] = React.useState(null);
  const [Newposition, setNewPosition] = React.useState('');
  const [NewchpaterPosition, setNewChpaterPosition] = React.useState('');
  const [questions, setQuestions] = React.useState();
  const [numberofallQ, setnumberofallQ] = React.useState([]);
  const [result, setResult] = React.useState();
  const [question, setQuestion] = React.useState();

  // let question;
  let allOptions = [];

  if (user.userData && userdata.length === 0) {
    setUserData(user.userData);
    setUserCourses(user.userData.courses);
  }

  const positionUpdata = () => {
    setTimeout(() => {
      setNewPosition((position * 100) / window.innerWidth);
    }, 400);
  };
  const positionChpaterUpdata = () => {
    setTimeout(() => {
      setNewChpaterPosition((chpaterPosition * 100) / window.innerWidth);
    }, 400);
  };

  const getChaptersOptions = async () => {
    if (selectedCourse) {
      await axios
        .get(
          `http://localhost:5000/api/v1/chapter?course=${selectedCourse[0]}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data) {
            const data = response.data.data.data;
            let options = data.map((chapter) => ({
              value: chapter._id,
              label: chapter.name,
            }));

            setOptionsChapter(options);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const Mstyle = {
    top: 'calc(100% + 25px)',
    visibility: 'visible',
    opacity: 1,
  };

  const Cmstyle = {
    top: 'calc(0% + 0px)',
    visibility: 'hidden',
    opacity: 0,
  };
  const MstyleChpater = {
    top: 'calc(100% + 25px)',
    visibility: 'visible',
    opacity: 1,
    // paddingRight: ' 0px',
    // paddingLeft: '0px',
    // paddingTop: '10px',
    // borderTopWidth: '15px',
    // paddingBottom: '15px',
  };

  const CmstyleChapter = {
    top: 'calc(0% + 0px)',
    visibility: 'hidden',
    opacity: 0,
    // paddingRight: ' 0px',
    // paddingLeft: '0px',
    // paddingTop: '10px',
    // borderTopWidth: '15px',
    // paddingBottom: '15px',
  };
  const nonAnswered = async () => {
    if (successSelectChapter) {
      await axios
        .get(
          `http://localhost:5000/api/v1/question/nonAnswered?chapter=${successSelectChapter.value}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data) {
            const data = response.data.data;
            setQuestion(data[Math.floor(Math.random() * data.length)]);

            setQuestions(data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  React.useEffect(() => {
    // console.log(questions.length);

    if (questions && questions.length == 0 && successSelectChapter) {
      axios
        .post(
          `http://localhost:5000/api/v1/me/result`,
          {
            chapter: successSelectChapter.value,
          },

          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res.data.data);
          setResult(res.data.data);
        });
    }
  }, [successSelectChapter, questions]);
  const getQuestions = () => {
    if (selectedCourse) {
      axios
        .get(
          `${USER_SERVER}/question?course
        =${selectedCourse[0]}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setnumberofallQ(res.data.data.length);
          ///عدد جميع الاساله
        });
    }
  };
  // if (selectedCourse) {
  console.log(selectedCourse);
  // }
  React.useEffect(() => {
    getQuestions();
    getChaptersOptions();
    positionUpdata();
  }, [selectedCourse]);

  React.useEffect(() => {
    nonAnswered();
    positionChpaterUpdata();
  }, [successSelectChapter]);

  const getCreatedBy = () => {
    if (question) {
      axios.get(`${USER_SERVER}/users/${question.CreatedBy}`).then((res) => {
        console.log(res);
      });
    }
  };

  const OCmenu = () => {
    setMenu(false);
    setTimeout(() => {
      setMenu(true);
    }, 400);
  };
  const OCchpterMenu = () => {
    setChpterMenu(false);
    setTimeout(() => {
      setChpterMenu(true);
    }, 400);
  };

  if (question && question.Type !== 'TRUE OR FALSE') {
    allOptions = [];
    allOptions = [...allOptions, question.Answer];
    question.incurrectAnswerArray.map((item) => {
      allOptions = [...allOptions, item];
    });
  }
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  React.useEffect(() => {
    if (
      user.userData &&
      user.userData.courses.length !== 0 &&
      selectedCourse == null
    ) {
      setSelectedCourse([
        user.userData.courses[0]._id,
        user.userData.courses[0].name,
      ]);
      setMenu(true);
    }
  });
  getCreatedBy();
  React.useEffect(() => {
    shuffle(allOptions);
  }, [question]);

  return (
    <div style={{ marginTop: '8rem' }}>
      <Modal size="sm" isOpen={smallAlert} toggle={() => setSmallAlert(false)}>
        <div className="modal-header no-border-header">
          <button
            className="close"
            type="button"
            onClick={() => setSmallAlert(false)}
          >
            ×
          </button>
        </div>
        <div className="modal-body text-center">
          <h5>
            Are you sure you want to try again all resutl of this chapter will
            be deleted?
          </h5>
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="success"
              type="button"
              onClick={() => setSmallAlert(false)}
            >
              Never mind
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button
              className="btn-link"
              color="danger"
              type="button"
              onClick={async () => {
                await axios
                  .put(
                    `${USER_SERVER}/me/reset`,
                    {
                      chapter: successSelectChapter.value,
                    },
                    { withCredentials: true }
                  )
                  .then((res) => {
                    if (res.data.success == true) {
                      setSmallAlert(false);
                      nonAnswered();
                    }
                  });
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
      <Container>
        <div className="dropdown">
          <label className="dropdown__face" for="dropdown">
            <div className="dropdown__text">
              {user.userData && user.userData.courses.length !== 0 ? (
                <div style={{}}>
                  <Grid container justify="center">
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
                            <GridItem direction="row-reverse">
                              <div
                                id={item._id}
                                onClick={() => {
                                  const carCoord = document.getElementById(
                                    item._id
                                  );
                                  const results = carCoord.getBoundingClientRect();
                                  setPosition(results.x);
                                }}
                              >
                                <CourseCardAdvance
                                  btnTrue={true}
                                  key={item._id}
                                  id={item._id}
                                  name={item.name}
                                  code={item.code}
                                  photo={regestPhotos[i]}
                                  width={75}
                                  height={72}
                                  onClick={() => {
                                    // setStart(false);
                                    setSelectedCourse([item._id, item.name]);
                                    OCmenu();
                                    setnumberofallQ(0);
                                  }}
                                />
                              </div>
                            </GridItem>
                          );
                        })
                      ) : (
                        <Container style={{ padding: '2rem' }}>
                          NO COURSES
                          <small>Go to your profile and ADD Courses</small>
                        </Container>
                      )}
                    </GridItem>
                  </Grid>
                </div>
              ) : (
                <Container className="text-center" style={{ padding: '2rem' }}>
                  <GridItem>NO COURSES</GridItem>
                  <GridItem>
                    <small>Go to your profile and ADD Courses</small>
                  </GridItem>
                </Container>
              )}
            </div>
          </label>
          <Style>{`.dropdown__items::before{
              left: ${position ? Newposition : 50}%;

          }`}</Style>
          <ul className="dropdown__items" style={menu ? Mstyle : Cmstyle}>
            {user.userData && user.userData.courses.length !== 0 ? (
              <Container>
                {selectedCourse ? (
                  <div>
                    <Row>
                      <Col>
                        <h3
                          className="text-center"
                          // style={{ marginBottom: '2rem' }}
                        >
                          {selectedCourse[1]}
                        </h3>
                        <h5 className="text-center">
                          <CountUp start={0} end={numberofallQ} duration={3} />{' '}
                          QUESTIONS
                        </h5>
                        <hr width="40%" />
                      </Col>
                    </Row>

                    <GridItem
                      container
                      direction="row-reverse"
                      justify="center"
                      alignItems="center"
                    >
                      {optionsChapter.map((item, i) => {
                        return (
                          <div
                            id={item.value}
                            onClick={() => {
                              const carCoord = document.getElementById(
                                item.value
                              );
                              const results = carCoord.getBoundingClientRect();
                              setChpaterPosition(results.x);
                            }}
                          >
                            <GridItem
                              container
                              direction="row-reverse"
                              justify="center"
                              alignItems="center"
                            >
                              {i == 0 ? (
                                <Badge
                                  className="mr-1"
                                  style={{ color: '#fddb3a' }}
                                >
                                  <i className="fa fa-unlock-alt" />
                                </Badge>
                              ) : (
                                <Badge
                                  className="mr-1"
                                  style={{ color: '#fddb3a', opacity: '50%' }}
                                >
                                  <i className="fa fa-lock" />
                                </Badge>
                              )}
                            </GridItem>

                            <GridItem container justify="center">
                              <Button
                                className="btn-link mr-1"
                                style={{
                                  color: '#fddb3a',
                                }}
                                href="#pablo"
                                onClick={() => {
                                  setSuccessSelectChapter(item);
                                  OCchpterMenu();
                                  setStart(false);
                                }}
                              >
                                <h6 style={{ textShadow: '2px 2px 5px  #fff' }}>
                                  {item.label}
                                </h6>
                              </Button>
                            </GridItem>
                          </div>
                        );
                      })}
                    </GridItem>
                  </div>
                ) : null}
              </Container>
            ) : (
              <Container className="text-center" style={{ padding: '2rem' }}>
                NO COURSES
              </Container>
            )}

            <div className="dropdown1">
              <input type="checkbox" id="dropdown1" defaultChecked={true} />

              <Style>{`.dropdown__items1::before{
              left: ${chpaterPosition ? NewchpaterPosition : 20}%;

                }`}</Style>
              <label className="dropdown__face" for="dropdown1"></label>
              <ul
                className="dropdown__items1"
                style={chaptermenu ? MstyleChpater : CmstyleChapter}
              >
                <GridItem
                  container
                  direction="row-reverse"
                  justify="center"
                  alignItems="center"
                  ////////////////////////////////
                >
                  {start && successSelectChapter && questions.length !== 0 ? (
                    <div
                      style={{
                        backgroundColor: '#6bd098',
                        width: '100%',
                        padding: '5px 5px',
                        borderRadius: '10px',
                      }}
                    >
                      <GridItem
                        container
                        // justify="center"
                        // alignItems="center"
                        // direction="row-reverse"
                      >
                        <Button
                          className="btn-round btn-just-icon mr-1"
                          color="neutral"
                          href="#pablo"
                          outline
                          id="tooltip275070155"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fa fa-bookmark-o" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip275070155"
                        >
                          Bookmark
                        </UncontrolledTooltip>
                        <GridItem>
                          <GridItem
                            container
                            justify="center"
                            alignItems="center"
                            direction="row-reverse"
                          >
                            <GridItem>
                              <small>{successSelectChapter.label}</small>
                            </GridItem>
                            <GridItem>
                              <small>{questions.length} Questions</small>
                            </GridItem>
                          </GridItem>
                        </GridItem>
                      </GridItem>
                    </div>
                  ) : null}

                  <div>
                    {questions && questions.length > 0 ? (
                      start ? (
                        <div>
                          <Container>
                            {question ? (
                              <div>
                                <GridItem
                                  container
                                  direction="row-reverse"
                                  justify="center"
                                  alignItems="center"
                                ></GridItem>
                                <h4 style={{ padding: '1rem 1rem' }}>
                                  {question.question}
                                </h4>
                                <hr style={{ width: '25rem' }} />

                                <div style={{ padding: ' 1rem ' }}>
                                  <GridItem
                                    container
                                    direction="row-reverse"
                                    justify="center"
                                    alignItems="center"
                                  >
                                    {question.Type !== 'TRUE OR FALSE' ? (
                                      allOptions.map((ins, i) => {
                                        //////////////////////////////////////////
                                        return (
                                          <GridItem>
                                            <Button
                                              className="btn-link mr-1"
                                              color="success"
                                              href="#pablo"
                                              onClick={(e) => {
                                                if (ins == question.Answer) {
                                                  if (question) {
                                                    axios.put(
                                                      `http://localhost:5000/api/v1/me/answerd`,
                                                      {
                                                        successAnswer: `${question._id}`,
                                                      },
                                                      {
                                                        withCredentials: true,
                                                      }
                                                    );
                                                    // .then((res) => {
                                                    //   console.log(res);
                                                    // });
                                                  }
                                                  // nonAnswered();
                                                } else {
                                                  if (question) {
                                                    axios
                                                      .put(
                                                        `http://localhost:5000/api/v1/me/answerd`,
                                                        {
                                                          wrongAnswer: `${question._id}`,
                                                        },
                                                        {
                                                          withCredentials: true,
                                                        }
                                                      )
                                                      .then((res) => {
                                                        // console.log(res);
                                                      });
                                                  }
                                                }
                                                nonAnswered();
                                              }}
                                            >
                                              <h4>{ins}</h4>
                                            </Button>
                                          </GridItem>
                                        );
                                      })
                                    ) : (
                                      <GridItem
                                        container
                                        direction="row-reverse"
                                        justify="center"
                                        alignItems="center"
                                      >
                                        <Button
                                          style={{ width: '79.42' }}
                                          className="btn-link mr-1"
                                          color="danger"
                                          outline
                                          type="button"
                                          onClick={() => {
                                            if (question.Answer == false) {
                                              if (question) {
                                                axios
                                                  .put(
                                                    `http://localhost:5000/api/v1/me/answerd`,
                                                    {
                                                      successAnswer: `${question._id}`,
                                                    },
                                                    { withCredentials: true }
                                                  )
                                                  .then((res) => {
                                                    console.log(res);
                                                  });
                                              }
                                            } else {
                                              if (question) {
                                                axios
                                                  .put(
                                                    `http://localhost:5000/api/v1/me/answerd`,
                                                    {
                                                      wrongAnswer: `${question._id}`,
                                                    },
                                                    {
                                                      withCredentials: true,
                                                    }
                                                  )
                                                  .then((res) => {
                                                    console.log(res);
                                                  });
                                              }
                                            }
                                            nonAnswered();
                                          }}
                                        >
                                          false
                                        </Button>

                                        <Button
                                          style={{ width: '79.42' }}
                                          className="btn-link mr-1"
                                          color="success"
                                          outline
                                          type="button"
                                          onClick={() => {
                                            console.log(question.Answer);
                                            if (question.Answer == true) {
                                              if (question) {
                                                axios
                                                  .put(
                                                    `http://localhost:5000/api/v1/me/answerd`,
                                                    {
                                                      successAnswer: `${question._id}`,
                                                    },
                                                    { withCredentials: true }
                                                  )
                                                  .then((res) => {
                                                    console.log(res);
                                                  });
                                              }
                                            } else {
                                              if (question) {
                                                axios
                                                  .put(
                                                    `http://localhost:5000/api/v1/me/answerd`,
                                                    {
                                                      wrongAnswer: `${question._id}`,
                                                    },
                                                    {
                                                      withCredentials: true,
                                                    }
                                                  )
                                                  .then((res) => {
                                                    console.log(res);
                                                  });
                                              }
                                            }
                                            nonAnswered();
                                          }}
                                        >
                                          true
                                        </Button>
                                      </GridItem>
                                    )}
                                  </GridItem>
                                </div>
                              </div>
                            ) : null}
                          </Container>
                        </div>
                      ) : selectedCourse ? (
                        <Container>
                          <div className="text-center">
                            <h3 style={{ fontWeight: 'bold' }}>
                              <h3
                                className="text-success"
                                style={{ fontWeight: 'bold' }}
                              >
                                {' '}
                                Start{' '}
                              </h3>
                              {selectedCourse[1]}{' '}
                            </h3>
                            {successSelectChapter ? (
                              <div className="icon icon-primary">
                                <i
                                  className="nc-icon nc-user-run"
                                  style={{
                                    fontSize: '50px',
                                    marginTop: '2rem',
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="icon icon-success">
                                <i
                                  className="nc-icon nc-planet "
                                  style={{
                                    fontSize: '50px',
                                    marginTop: '2rem',
                                  }}
                                />{' '}
                              </div>
                            )}

                            <div>
                              {successSelectChapter ? (
                                <>
                                  <h6
                                    className="info-title"
                                    style={{ marginTop: '1rem' }}
                                  >
                                    {successSelectChapter.label}{' '}
                                  </h6>
                                  <h6 className="text-success">
                                    Questions in This Chapter{' '}
                                    {/* {numberofallQ ? numberofallQ : null} */}
                                    {questions ? questions.length : null}
                                  </h6>{' '}
                                </>
                              ) : (
                                <h5
                                  className="text-danger"
                                  style={{ marginTop: '6rem' }}
                                >
                                  Select Chapter First
                                </h5>
                              )}
                            </div>

                            {successSelectChapter && start == false ? (
                              <Button
                                style={{ marginTop: '2rem' }}
                                className="btn-round mr-1"
                                color="success"
                                type="button"
                                onClick={() => {
                                  setStart(true);
                                }}
                              >
                                START{}
                              </Button>
                            ) : null}
                          </div>
                        </Container>
                      ) : null
                    ) : selectedCourse ? (
                      <div className="text-center">
                        {successSelectChapter ? (
                          result ? (
                            result.score == 'A' ||
                            result.score == 'B' ||
                            result.score == 'C' ||
                            result.score == 'D' ? (
                              <>
                                <h3 style={{ fontWeight: 'bold' }}>
                                  {selectedCourse[1]}{' '}
                                  <h3 className="text-success"> Wow! </h3>
                                  <small className="text-success">
                                    YOU HAVE COMPLETED ALL THE QUESTIONS IN{' '}
                                    {successSelectChapter.label}
                                  </small>
                                </h3>
                                <div
                                  style={{
                                    backgroundColor: '#6bd098',
                                    borderRadius: 25,
                                  }}
                                >
                                  <h3
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'white',
                                    }}
                                  >
                                    {result.score}
                                  </h3>

                                  <h3
                                    style={{
                                      marginTop: '-3px',
                                      color: 'white',
                                    }}
                                  >
                                    <CountUp
                                      start={0}
                                      end={result.success}
                                      duration={2.75}
                                      separator=" "
                                    />
                                    /
                                    <CountUp
                                      start={0}
                                      end={result.total}
                                      duration={2.75}
                                      separator=" "
                                    />
                                  </h3>
                                </div>

                                <img
                                  src={trophy}
                                  width="15%"
                                  style={{ marginTop: '1rem' }}
                                />
                              </>
                            ) : (
                              <>
                                <h3 style={{ fontWeight: 'bold' }}>
                                  {selectedCourse[1]}{' '}
                                  <h3 className="text-danger"> Oops! </h3>
                                  <small className="text-danger">
                                    TRY AGAIN {successSelectChapter.label}
                                  </small>
                                </h3>
                                <div
                                  style={{
                                    backgroundColor: '#f05454',
                                    borderRadius: 25,
                                  }}
                                >
                                  <h3
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'white',
                                    }}
                                  >
                                    {result.score}
                                  </h3>

                                  <h3
                                    style={{
                                      marginTop: '-3px',
                                      color: 'white',
                                    }}
                                  >
                                    <CountUp
                                      start={0}
                                      end={result.success}
                                      duration={2.75}
                                      separator=" "
                                    />
                                    /
                                    <CountUp
                                      start={0}
                                      end={result.total}
                                      duration={2.75}
                                      separator=" "
                                    />
                                  </h3>
                                </div>
                              </>
                            )
                          ) : null
                        ) : (
                          <>
                            <h3 style={{ fontWeight: 'bold' }}>
                              <h3 className="text-danger"> Select CHAPTER </h3>
                            </h3>
                            <div className="icon icon-success">
                              <i
                                className="nc-icon nc-planet "
                                style={{
                                  fontSize: '50px',
                                  marginTop: '2rem',
                                }}
                              />{' '}
                              {/* <h4>Total namber of questions {questions}</h4> */}
                            </div>
                          </>
                        )}

                        <div>
                          {successSelectChapter ? (
                            <>
                              <h6
                                className="info-title"
                                style={{ marginTop: '1rem' }}
                              >
                                {successSelectChapter.label}{' '}
                              </h6>
                            </>
                          ) : (
                            <h5
                              className="text-success"
                              style={{ marginTop: '6rem' }}
                            >
                              Select Chapter First
                            </h5>
                          )}
                        </div>

                        {successSelectChapter && start == false ? (
                          questions && questions.length > 0 ? (
                            <Button
                              style={{ marginTop: '2rem' }}
                              className="btn-round mr-1"
                              color="success"
                              type="button"
                              onClick={() => {
                                setStart(true);
                              }}
                            >
                              START{}
                            </Button>
                          ) : (
                            <Button
                              style={{ marginTop: '2rem' }}
                              className="btn-round mr-1"
                              color="warning"
                              type="button"
                              onClick={() => {
                                setSmallAlert(true);
                                // setStart(true);
                              }}
                            >
                              Again{}
                            </Button>
                          )
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </GridItem>
              </ul>
              <svg>
                <filter id="goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </svg>
            </div>
          </ul>
        </div>

        <svg>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </svg>
      </Container>
    </div>
  );
}

export default QuestionsCard;
